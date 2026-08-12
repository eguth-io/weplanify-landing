/**
 * Saily eSIM affiliate links.
 *
 * Saily (Nord Security) runs its affiliate programme on TUNE/HasOffers.
 * Conversions are only attributed when the visitor goes through the tracking
 * domain below with our offer and affiliate ids — a direct link to saily.com
 * earns nothing, so every outbound eSIM link must be built here.
 *
 * The programme exposes one landing page per country, addressed by `url_id`.
 * Sending a reader to the page for their own destination converts noticeably
 * better than dropping them on the generic homepage, hence the map below.
 */

const TRACKING_BASE = "https://go.saily.site/aff_c";

const OFFER_ID = "101";
const AFFILIATE_ID = "15958";

/**
 * ISO 3166-1 alpha-2 → Saily landing page id (`url_id`).
 *
 * Ids were read off the affiliate dashboard: the `<select>` option values there
 * are positional indexes, *not* url_ids, so they can only be recovered from the
 * generated tracking link. Countries absent from this map have no dedicated
 * Saily landing page and fall back to the generic one.
 *
 * Only generic per-country pages belong here — the dashboard list also contains
 * other publishers' coupon pages, which are not ours to use.
 *
 * Saily also publishes regional pages (Europe 2826, Latin America 5678,
 * Caribbean Islands 9186, Asia and Oceania 5675) which would cover most of the
 * countries missing here. They are deliberately left out until we can confirm
 * with Saily exactly which countries each regional plan includes — pointing a
 * reader at a plan that doesn't cover their destination is worse than sending
 * them to the generic page and letting them pick.
 */
const COUNTRY_LANDING_PAGES: Record<string, number> = {
  AE: 631,
  AL: 660,
  AU: 645,
  BR: 644,
  CA: 638,
  CH: 650,
  CO: 652,
  CR: 2199,
  CZ: 653,
  DE: 647,
  DK: 673,
  EG: 659,
  ES: 639,
  FR: 634,
  GB: 636,
  GR: 3799,
  HK: 642,
  HR: 3800,
  ID: 657,
  IE: 654,
  IN: 635,
  IT: 637,
  JO: 2834,
  JP: 633,
  KE: 1274,
  KH: 2833,
  KR: 640,
  LK: 2831,
  LT: 646,
  MA: 662,
  MV: 9731,
  MX: 641,
  MY: 630,
  NL: 648,
  NO: 8098,
  NZ: 962,
  PE: 1927,
  PL: 655,
  PT: 649,
  SC: 5648,
  SE: 643,
  SG: 2829,
  TH: 629,
  TN: 661,
  TR: 627,
  US: 628,
  VN: 2835,
  ZA: 651,
};

/**
 * Discount Saily gave us for our audience. Shown next to the link so the block
 * offers a reason to click rather than a bare outbound link.
 */
export const SAILY_COUPON = "WEPLANIFY";

export type SailyLinkParams = {
  /** ISO alpha-2 of the destination country, as returned by the public API. */
  countryAlpha2: string | null;
  /** Destination slug — reported as sub id 2 so we can rank pages by revenue. */
  destinationSlug: string;
  /** Where the link sits, e.g. "destination-guide". Reported as sub id 1. */
  placement: string;
};

/**
 * Build the tracking URL for a destination.
 *
 * Falls back to the generic landing page when the country has no dedicated one,
 * so the link always works and always earns.
 */
export function buildSailyUrl({
  countryAlpha2,
  destinationSlug,
  placement,
}: SailyLinkParams): string {
  const params = new URLSearchParams({
    offer_id: OFFER_ID,
    aff_id: AFFILIATE_ID,
  });

  const landingPageId = countryAlpha2
    ? COUNTRY_LANDING_PAGES[countryAlpha2.toUpperCase()]
    : undefined;
  if (landingPageId !== undefined) {
    params.set("url_id", String(landingPageId));
  }

  // Sub ids are our own reporting dimensions in the Saily performance report.
  // Never put anything user-identifying in them.
  params.set("aff_sub", placement);
  params.set("aff_sub2", destinationSlug);

  return `${TRACKING_BASE}?${params.toString()}`;
}

/** Whether we can send the reader straight to their country's page. */
export function hasSailyCountryPage(countryAlpha2: string | null): boolean {
  if (!countryAlpha2) return false;
  return countryAlpha2.toUpperCase() in COUNTRY_LANDING_PAGES;
}
