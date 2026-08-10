import { getTranslations } from "next-intl/server";

import AffiliateLink from "@/components/destinations/AffiliateLink";
import { buildSailyUrl, hasSailyCountryPage } from "@/lib/affiliates/saily";

type Props = {
  city: string;
  country: string | null;
  countryAlpha2: string | null;
  destinationSlug: string;
};

const PLACEMENT = "destination-guide";

/**
 * Affiliate eSIM block shown on destination guides, right after "Good to know".
 *
 * Sits where the reader is already looking at plugs and voltage, so staying
 * connected on arrival reads as part of the practical section rather than an ad.
 * The affiliate nature is disclosed inline.
 */
export default async function EsimBlock({
  city,
  country,
  countryAlpha2,
  destinationSlug,
}: Props) {
  const t = await getTranslations("destinationGuide.esim");

  const href = buildSailyUrl({
    countryAlpha2,
    destinationSlug,
    placement: PLACEMENT,
  });

  // Name the country when we can send the reader to its dedicated page,
  // otherwise stay generic rather than promise a plan we didn't link to.
  const targeted = Boolean(country) && hasSailyCountryPage(countryAlpha2);
  const heading = targeted
    ? t("headingCountry", { country: country as string })
    : t("heading");
  const cta = targeted
    ? t("ctaCountry", { country: country as string })
    : t("cta");

  return (
    <section className="py-12 lg:py-16 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#001E13]/10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 bg-[#EEF899] text-[#001E13] px-3 py-1 rounded-full text-xs font-karla font-bold mb-3">
                <span aria-hidden="true">📶</span>
                {t("badge")}
              </span>
              <h2 className="text-2xl lg:text-3xl font-londrina-solid text-[#001E13] mb-3">
                {heading}
              </h2>
              <p className="font-karla text-[#001E13]/75 text-sm lg:text-base leading-relaxed">
                {t("body", { city })}
              </p>
            </div>

            <div className="lg:w-64 lg:flex-shrink-0">
              <AffiliateLink
                href={href}
                partner="saily"
                placement={PLACEMENT}
                destination={destinationSlug}
                country={countryAlpha2}
                className="block w-full text-center bg-[#F6391A] text-[#FFFBF5] font-karla font-bold text-base px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                {cta}
              </AffiliateLink>
              <p className="text-xs font-karla text-[#001E13]/50 mt-3 text-center leading-relaxed">
                {t("disclosure")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
