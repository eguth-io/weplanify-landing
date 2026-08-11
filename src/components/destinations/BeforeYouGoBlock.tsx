import { getTranslations } from "next-intl/server";

import AffiliateLink from "@/components/destinations/AffiliateLink";
import { buildNordvpnUrl } from "@/lib/affiliates/nordvpn";
import { buildSailyUrl, hasSailyCountryPage } from "@/lib/affiliates/saily";

type Props = {
  city: string;
  country: string | null;
  countryAlpha2: string | null;
  destinationSlug: string;
};

const PLACEMENT = "destination-guide";

/**
 * The two connectivity affiliate offers, as one practical checklist.
 *
 * Shipped first as two stacked full-width cards, which read as an ad break in
 * the middle of the guide. One card with two rows keeps a single interruption,
 * and the checklist framing ("before you go") matches what the reader is doing
 * on this page. Links are inline rather than big buttons so the only button in
 * this part of the page stays "Start my trip".
 */
export default async function BeforeYouGoBlock({
  city,
  country,
  countryAlpha2,
  destinationSlug,
}: Props) {
  const t = await getTranslations("destinationGuide");

  const esimHref = buildSailyUrl({
    countryAlpha2,
    destinationSlug,
    placement: PLACEMENT,
  });
  const vpnHref = buildNordvpnUrl({
    destinationSlug,
    placement: PLACEMENT,
  });

  // Name the country only when we can send the reader to its dedicated page,
  // otherwise stay generic rather than promise a plan we didn't link to.
  const targeted = Boolean(country) && hasSailyCountryPage(countryAlpha2);

  const rows = [
    {
      key: "esim",
      icon: "📶",
      title: targeted
        ? t("esim.headingCountry", { country: country as string })
        : t("esim.heading"),
      body: t("esim.body", { city }),
      cta: targeted
        ? t("esim.ctaCountry", { country: country as string })
        : t("esim.cta"),
      href: esimHref,
      partner: "saily",
    },
    {
      key: "vpn",
      icon: "🔒",
      title: t("vpn.heading"),
      body: t("vpn.body", { city }),
      cta: t("vpn.cta"),
      href: vpnHref,
      partner: "nordvpn",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#001E13]/10 overflow-hidden">
      <div className="flex items-baseline justify-between gap-4 px-6 lg:px-8 pt-6 pb-4">
        <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13]">
          {t("beforeYouGo.heading")}
        </h3>
        <span className="text-xs font-karla text-[#001E13]/50 flex-shrink-0">
          {t("beforeYouGo.disclosure")}
        </span>
      </div>

      <ul className="divide-y divide-[#001E13]/10 border-t border-[#001E13]/10">
        {rows.map((row) => (
          <li
            key={row.key}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-6 lg:px-8 py-5"
          >
            <span
              aria-hidden="true"
              className="text-2xl leading-none flex-shrink-0"
            >
              {row.icon}
            </span>
            <div className="flex-1">
              <p className="font-karla font-bold text-[#001E13] text-base mb-0.5">
                {row.title}
              </p>
              <p className="font-karla text-[#001E13]/70 text-sm leading-relaxed">
                {row.body}
              </p>
            </div>
            <AffiliateLink
              href={row.href}
              partner={row.partner}
              placement={PLACEMENT}
              destination={destinationSlug}
              country={countryAlpha2}
              className="inline-flex items-center gap-1.5 flex-shrink-0 font-karla font-bold text-sm text-[#F6391A] hover:gap-2.5 transition-all"
            >
              {row.cta}
              <span aria-hidden="true">→</span>
            </AffiliateLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
