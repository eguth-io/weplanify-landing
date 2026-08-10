"use client";

import { trackEvent } from "@/lib/tracking";

type Props = {
  href: string;
  partner: string;
  placement: string;
  destination: string;
  country: string | null;
  className?: string;
  children: React.ReactNode;
};

/**
 * Outbound affiliate link with click tracking.
 *
 * Kept as the only client island of an otherwise server-rendered block so the
 * surrounding copy never enters the client i18n payload. `sponsored` is what
 * Google expects on paid links; without it the guides risk a manual action.
 *
 * The click is reported twice on purpose: to GTM/GA4 for the marketing funnel,
 * and to Vision via a same-origin beacon so it lands in the same event stream
 * (and under the same `wp_vid` visitor) as the rest of the landing analytics.
 */
export default function AffiliateLink({
  href,
  partner,
  placement,
  destination,
  country,
  className,
  children,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={className}
      onClick={() => {
        trackEvent("affiliate_click", {
          partner,
          placement,
          destination,
          country,
        });
        navigator.sendBeacon?.(
          "/api/track-affiliate",
          new Blob([JSON.stringify({ partner, placement, destination, country })], {
            type: "application/json",
          })
        );
      }}
    >
      {children}
    </a>
  );
}
