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
 *     original UTMs locally for the duration of the visit, and forwards them to
 *     the app via the register URL querystring (the only cross-origin channel).
 *  2. Attribution is "first-touch": once captured, the external source is never
 *     overwritten by a later visit or an internal click.
 *
 * Model (option B):
 *  - `utm_*`        = the external acquisition source (instagram / tiktok / …),
 *                     or `landing` as a fallback for direct/organic visits.
 *  - `signup_source` = the internal placement where the user converted
 *                     (e.g. `landing:world-cup-2026:hero`), always set.
 */

export type Attribution = {
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
};

const STORAGE_KEY = 'wp_first_touch';
const MAX = 128;

const clean = (value: string | null | undefined): string | undefined => {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed === '' ? undefined : trimmed.slice(0, MAX);
};

const hasWindow = (): boolean => typeof window !== 'undefined';

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
 * Persist the UTMs from the current URL — but only the FIRST time we see any.
 * Subsequent visits (even with different UTMs) are ignored, so the original
 * source wins. A visit with no UTM at all stores nothing.
 */
export const captureFirstTouch = (params: URLSearchParams | null): void => {
	if (!hasWindow() || !params) return;

	const incoming: Attribution = {
		utm_source: clean(params.get('utm_source')),
		utm_medium: clean(params.get('utm_medium')),
		utm_campaign: clean(params.get('utm_campaign')),
	};

	if (!incoming.utm_source) return; // nothing meaningful to capture
	if (readFirstTouch().utm_source) return; // first-touch already set — keep it

	try {
		const stored: Attribution = {};
		if (incoming.utm_source) stored.utm_source = incoming.utm_source;
		if (incoming.utm_medium) stored.utm_medium = incoming.utm_medium;
		if (incoming.utm_campaign) stored.utm_campaign = incoming.utm_campaign;
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
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
 * attribution. If an external source was captured it wins on `utm_*`; otherwise
 * we fall back to `utm_source=landing` plus the page's own medium/campaign.
 * `signup_source` always carries the internal placement context.
 */
export const buildRegisterHref = (opts: RegisterHrefOptions): string => {
	const { locale, template, campaign, medium, placement } = opts;
	const ft = readFirstTouch();

	const query = new URLSearchParams();

	if (ft.utm_source) {
		// External first-touch source wins.
		query.set('utm_source', ft.utm_source);
		if (ft.utm_medium) query.set('utm_medium', ft.utm_medium);
		if (ft.utm_campaign) query.set('utm_campaign', ft.utm_campaign);
	} else {
		// Direct / organic landing visit.
		query.set('utm_source', 'landing');
		if (medium) query.set('utm_medium', medium);
		if (campaign) query.set('utm_campaign', campaign);
	}

	// Internal placement, regardless of external source.
	const contextParts = ['landing', campaign ?? medium, placement].filter(Boolean);
	query.set('signup_source', contextParts.join(':'));

	if (template) query.set('template', template);

	return `${APP_REGISTER}/${locale}/register?${query.toString()}`;
};
