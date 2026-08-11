/**
 * NordVPN affiliate links.
 *
 * Same programme family as Saily (Nord Security, TUNE/HasOffers), so the same
 * rule applies: a direct link to nordvpn.com earns nothing, every outbound VPN
 * link must be built here. Note the affiliate id differs from the Saily one —
 * they are two separate accounts on two separate tracking domains.
 *
 * Unlike Saily there is no per-country landing page to pick from: NordVPN gave
 * us a single url_id, so the only reporting we get is through the sub ids.
 */

const TRACKING_BASE = "https://go.nordvpn.net/aff_c";

const OFFER_ID = "15";
const AFFILIATE_ID = "15541";
const LANDING_PAGE_ID = "1172";

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
    url_id: LANDING_PAGE_ID,
  });

  // Sub ids are our own reporting dimensions in the NordVPN performance report.
  // Never put anything user-identifying in them.
  params.set("aff_sub", placement);
  params.set("aff_sub2", destinationSlug);

  return `${TRACKING_BASE}?${params.toString()}`;
}
