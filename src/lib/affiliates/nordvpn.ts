/**
 * NordVPN affiliate links.
 *
 * Same programme family as Saily (Nord Security, TUNE/HasOffers), so the same
 * rule applies: a direct link to nordvpn.com earns nothing, every outbound VPN
 * link must be built here. Note the affiliate id differs from the Saily one —
 * they are two separate accounts on two separate tracking domains.
 *
 * No `url_id` on purpose. The one we were emailed (1172) pins every reader to
 * the French page, which is wrong on seven of our eight locales, and the rest
 * of the dashboard list is other publishers' coupon pages — not ours to use.
 * The default URL localises itself, so the only reporting we get is the sub ids.
 */

const TRACKING_BASE = "https://go.nordvpn.net/aff_c";

const OFFER_ID = "15";
// Read off the dashboard's own tracking link. The affiliate manager's email
// gave 15541, one digit short, which 404s — check this against the dashboard,
// never against the email, if links ever stop redirecting.
const AFFILIATE_ID = "154541";

export type NordvpnLinkParams = {
  /** Destination slug — reported as sub id 2 so we can rank pages by revenue. */
  destinationSlug: string;
  /** Where the link sits, e.g. "destination-guide". Reported as sub id 1. */
  placement: string;
};

/** Build the tracking URL for a destination. */
export function buildNordvpnUrl({
  destinationSlug,
  placement,
}: NordvpnLinkParams): string {
  const params = new URLSearchParams({
    offer_id: OFFER_ID,
    aff_id: AFFILIATE_ID,
  });

  // Sub ids are our own reporting dimensions in the NordVPN performance report.
  // Never put anything user-identifying in them.
  params.set("aff_sub", placement);
  params.set("aff_sub2", destinationSlug);

  return `${TRACKING_BASE}?${params.toString()}`;
}
