/**
 * First-touch attribution.
 *
 * A visitor who arrives from an external campaign (e.g. an Instagram bio link
 * `weplanify.com/?utm_source=instagram`) must keep that source all the way to
 * `app.weplanify.com/register`, even after clicking internal CTAs that would
 * otherwise overwrite it with `utm_source=landing`.
 *
 * Two facts drive the design:
 *  1. localStorage is origin-scoped — the landing (`weplanify.com`) and the app
 *     (`app.weplanify.com`) do NOT share it. So the landing persists the
 *     original source locally for the duration of the visit, and forwards it to
 *     the app via the register URL querystring (the only cross-origin channel).
 *  2. Attribution is "first-touch": once captured, the original source is never
 *     overwritten by a later visit or an internal click.
 *
 * Source resolution, in priority order, captured once on the first page view:
 *  1. Explicit `utm_*` params on the URL (paid/tagged campaigns) — they win.
 *  2. Otherwise the visitor's `document.referrer`, classified into a known
 *     channel (instagram / google / chatgpt / …) so untagged organic & social
 *     traffic stops collapsing into the generic `landing` bucket.
 *  3. Otherwise `direct` (no referrer / same-origin).
 *
 * Model:
 *  - `utm_*`         = the acquisition origin (instagram / google / direct / …).
 *  - `signup_source` = the internal placement where the user converted
 *                      (e.g. `landing:world-cup-2026:hero`), always set.
 */

export type Attribution = {
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	/** Page the visitor entered on, as `origin + pathname`. */
	landing_page?: string;
	/** Raw referrer, kept alongside the channel classified from it. */
	referrer?: string;
};

const STORAGE_KEY = 'wp_first_touch';
/**
 * Cookie twin of the localStorage entry, scoped to the parent domain so the app
 * on `app.weplanify.com` can read it. localStorage is origin-scoped and cannot
 * cross that hop; the register querystring can, but only for links that point
 * at `/register` — several CTAs (the home's, and both on
 * `/alternatives/best-group-trip-planner-apps`) point at the bare app domain
 * and carry no query string at all. The cookie is the only channel that covers
 * them.
 */
const COOKIE_KEY = 'wp_ft';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const MAX = 128;
/** URLs need more room than a channel name, and match the API column width. */
const URL_MAX = 512;

const clean = (value: string | null | undefined): string | undefined => {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed === '' ? undefined : trimmed.slice(0, MAX);
};

const hasWindow = (): boolean => typeof window !== 'undefined';

const cleanUrl = (value: string | null | undefined): string | undefined => {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed === '' ? undefined : trimmed.slice(0, URL_MAX);
};

/**
 * The entry page, without query string or hash. Keeping the raw URL would
 * explode the cardinality of the reporting `GROUP BY` and make "signups per
 * entry page" unreadable — every UTM permutation would be its own row.
 */
const normalizeLandingPage = (): string | undefined => {
	if (!hasWindow()) return undefined;
	return cleanUrl(`${window.location.origin}${window.location.pathname}`);
};

/**
 * Mirror the first-touch to a cookie on the parent domain. Not `httpOnly`: the
 * app reads it from JS to build the register payload. The `domain` attribute is
 * production-only — locally the landing (:3000) and the app (:3009) already
 * share `localhost`, and `domain=localhost` is rejected by some browsers.
 */
const writeCookie = (attribution: Attribution): void => {
	if (!hasWindow()) return;
	const isProd = window.location.hostname.endsWith('weplanify.com');
	const parts = [
		`${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(attribution))}`,
		'path=/',
		`max-age=${COOKIE_MAX_AGE}`,
		'samesite=lax',
	];
	if (isProd) parts.push('domain=.weplanify.com', 'secure');
	try {
		document.cookie = parts.join('; ');
	} catch {
		// ignore
	}
};

/**
 * Canonicalize common source shorthands to a single bucket so the value tagged
 * on a link (e.g. the `?utm_source=ig` Instagram bio link) matches the value
 * the referrer classifier emits (`instagram`). Without this, one channel splits
 * across two buckets. Unknown sources pass through unchanged.
 */
const SOURCE_ALIASES: Readonly<Record<string, string>> = {
	ig: 'instagram',
	insta: 'instagram',
	fb: 'facebook',
	yt: 'youtube',
	tt: 'tiktok',
	li: 'linkedin',
	x: 'twitter',
};

const normalizeSource = (source: string | undefined): string | undefined => {
	if (!source) return source;
	return SOURCE_ALIASES[source.toLowerCase()] ?? source;
};

/**
 * Known referrer hosts → [source, medium]. Checked in order, matching the
 * referrer hostname by exact value or as a subdomain (`*.host`). More specific
 * entries (e.g. an AI assistant hosted on a search-engine domain) come first.
 */
const REFERRER_CHANNELS: ReadonlyArray<readonly [RegExp, string, string]> = [
	// AI assistants (some live on a search-engine domain — match before search).
	[/(^|\.)gemini\.google\.com$/, 'gemini', 'ai-assistant'],
	[/(^|\.)chatgpt\.com$/, 'chatgpt', 'ai-assistant'],
	[/(^|\.)chat\.openai\.com$/, 'chatgpt', 'ai-assistant'],
	[/(^|\.)claude\.ai$/, 'claude', 'ai-assistant'],
	[/(^|\.)perplexity\.ai$/, 'perplexity', 'ai-assistant'],
	[/(^|\.)copilot\.microsoft\.com$/, 'copilot', 'ai-assistant'],
	// Social.
	[/(^|\.)instagram\.com$/, 'instagram', 'social'],
	[/(^|\.)facebook\.com$/, 'facebook', 'social'],
	[/(^|\.)fb\.(com|me)$/, 'facebook', 'social'],
	[/(^|\.)tiktok\.com$/, 'tiktok', 'social'],
	[/(^|\.)(twitter\.com|x\.com|t\.co)$/, 'twitter', 'social'],
	[/(^|\.)(linkedin\.com|lnkd\.in)$/, 'linkedin', 'social'],
	[/(^|\.)pinterest\.[a-z.]+$/, 'pinterest', 'social'],
	[/(^|\.)reddit\.com$/, 'reddit', 'social'],
	[/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube', 'social'],
	[/(^|\.)snapchat\.com$/, 'snapchat', 'social'],
	[/(^|\.)(whatsapp\.com|wa\.me)$/, 'whatsapp', 'social'],
	[/(^|\.)t\.me$/, 'telegram', 'social'],
	// Search engines.
	[/(^|\.)google\.[a-z.]+$/, 'google', 'organic'],
	[/(^|\.)bing\.com$/, 'bing', 'organic'],
	[/(^|\.)duckduckgo\.com$/, 'duckduckgo', 'organic'],
	[/(^|\.)(yahoo\.com|search\.yahoo\.com)$/, 'yahoo', 'organic'],
	[/(^|\.)ecosia\.org$/, 'ecosia', 'organic'],
	[/(^|\.)qwant\.com$/, 'qwant', 'organic'],
	[/(^|\.)brave\.com$/, 'brave', 'organic'],
];

/**
 * Classify a `document.referrer` into a first-touch source. Returns `direct`
 * for an empty or same-origin referrer, a known channel when the host matches,
 * or the bare hostname with `referral` medium for any other external site.
 */
export const classifyReferrer = (referrer: string, currentHost: string): Attribution => {
	if (!referrer) return { utm_source: 'direct' };

	let host: string;
	try {
		host = new URL(referrer).hostname.toLowerCase();
	} catch {
		return { utm_source: 'direct' };
	}

	// Same site (incl. the app subdomain) — not an external acquisition source.
	const root = currentHost.replace(/^www\./, '').replace(/^app\./, '');
	if (host === currentHost || host === root || host.endsWith(`.${root}`)) {
		return { utm_source: 'direct' };
	}

	for (const [pattern, source, medium] of REFERRER_CHANNELS) {
		if (pattern.test(host)) return { utm_source: source, utm_medium: medium };
	}

	return { utm_source: clean(host.replace(/^www\./, '')) ?? 'direct', utm_medium: 'referral' };
};

/** Read the persisted first-touch attribution (client-only; {} on the server). */
export const readFirstTouch = (): Attribution => {
	if (!hasWindow()) return {};
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Attribution) : {};
	} catch {
		return {};
	}
};

/**
 * Persist the acquisition source the FIRST time we see the visitor. Explicit
 * URL `utm_*` win; otherwise we fall back to the classified `document.referrer`
 * (down to `direct`). Subsequent visits or internal clicks are ignored, so the
 * original source wins.
 */
export const captureFirstTouch = (params: URLSearchParams | null): void => {
	if (!hasWindow()) return;
	if (readFirstTouch().utm_source) return; // first-touch already set — keep it

	const fromUrl = clean(params?.get('utm_source'));
	const stored: Attribution = fromUrl
		? {
				utm_source: fromUrl,
				utm_medium: clean(params?.get('utm_medium')),
				utm_campaign: clean(params?.get('utm_campaign')),
			}
		: classifyReferrer(document.referrer, window.location.hostname);

	const out: Attribution = { utm_source: normalizeSource(stored.utm_source) };
	if (stored.utm_medium) out.utm_medium = stored.utm_medium;
	if (stored.utm_campaign) out.utm_campaign = stored.utm_campaign;

	// Which page brought the visitor in — the whole point of the capture. The
	// classified channel above answers "where from"; this answers "onto what",
	// and no UTM can stand in for it on an organic click.
	const landingPage = normalizeLandingPage();
	if (landingPage) out.landing_page = landingPage;
	const referrer = cleanUrl(document.referrer);
	if (referrer) out.referrer = referrer;

	writeCookie(out);

	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
	} catch {
		// ignore quota / private-mode errors
	}
};

export type RegisterHrefOptions = {
	locale: string;
	/** Product param: pre-seed a trip template at signup. Not attribution. */
	template?: string;
	/** Internal placement context — feeds signup_source, and utm_* as fallback. */
	campaign?: string;
	medium?: string;
	placement?: string;
};

const APP_REGISTER = 'https://app.weplanify.com';

/**
 * Build the register URL on the app subdomain, injecting first-touch
 * attribution. The captured origin wins on `utm_source`; the page's own
 * medium/campaign fill in only where first-touch has nothing. `signup_source`
 * always carries the internal placement context.
 */
export const buildRegisterHref = (
	opts: RegisterHrefOptions,
	/**
	 * The first-touch to inject. Defaults to the persisted one. Callers that
	 * render on both the server and the client pass `{}` for the first render,
	 * so both sides agree before the effect swaps in the stored value — see
	 * `useRegisterHref`.
	 */
	ft: Attribution = readFirstTouch()
): string => {
	const { locale, template, campaign, medium, placement } = opts;

	const query = new URLSearchParams();

	// Acquisition origin: captured first-touch source, or `direct` as a safe
	// default (server render / no JS / pre-capture). Never `landing` — that
	// placement detail belongs in signup_source below.
	query.set('utm_source', ft.utm_source ?? 'direct');
	const utmMedium = ft.utm_medium ?? medium;
	const utmCampaign = ft.utm_campaign ?? campaign;
	if (utmMedium) query.set('utm_medium', utmMedium);
	if (utmCampaign) query.set('utm_campaign', utmCampaign);

	// Internal placement, regardless of external source.
	const contextParts = ['landing', campaign ?? medium, placement].filter(Boolean);
	query.set('signup_source', contextParts.join(':'));

	// Fallback channel for the entry page: the cookie above is the primary one,
	// these params only matter when cookies are unavailable.
	if (ft.landing_page) query.set('landing_page', ft.landing_page);
	if (ft.referrer) query.set('referrer', ft.referrer);

	if (template) query.set('template', template);

	return `${APP_REGISTER}/${locale}/register?${query.toString()}`;
};
