import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import FadeIn from "@/components/FadeIn";
import Breadcrumb from "@/components/Breadcrumb";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import EsimBlock from "@/components/destinations/EsimBlock";

import type {
  DestinationGuide,
  DestinationListItem,
} from "@/lib/destinations/api";

type Props = {
  guide: DestinationGuide;
  locale: string;
  related?: DestinationListItem[];
};

/**
 * Full destination guide page section (everything between <Nav/> and <Footer/>).
 * Renders an API-driven DestinationGuide in the WePlanify design language.
 * Every section guards against empty/null data so partial guides render cleanly.
 */
export default async function DestinationGuideView({
  guide,
  locale,
  related = [],
}: Props) {
  const t = await getTranslations("destinationGuide");

  const signupHref = `https://app.weplanify.com/${locale}/register?utm_source=landing&utm_medium=destination&utm_campaign=${guide.id}`;

  // Chips shown in the hero: the badge label first, then tag labels.
  const heroChips = [
    ...(guide.badge_label ? [guide.badge_label] : []),
    ...(guide.tag_labels ?? []),
  ];

  // Practical facts as a labelled key/value list, skipping empty values.
  const factRows: Array<{ label: string; value: string }> = [];
  const facts = guide.facts;
  if (facts) {
    if (facts.currency_code || facts.currency_symbol) {
      factRows.push({
        label: t("facts.currency"),
        value: [facts.currency_code, facts.currency_symbol]
          .filter(Boolean)
          .join(" "),
      });
    }
    if (facts.languages && facts.languages.length > 0) {
      factRows.push({
        label: t("facts.languages"),
        value: facts.languages.join(", "),
      });
    }
    if (facts.plug_types && facts.plug_types.length > 0) {
      factRows.push({
        label: t("facts.plugs"),
        value: facts.plug_types.join(", "),
      });
    }
    if (facts.voltage) {
      factRows.push({ label: t("facts.voltage"), value: facts.voltage });
    }
    if (facts.driving_side) {
      factRows.push({
        label: t("facts.drivingSide"),
        value: facts.driving_side,
      });
    }
    if (facts.emergency_number) {
      factRows.push({
        label: t("facts.emergency"),
        value: facts.emergency_number,
      });
    }
  }

  const hasPractical =
    Boolean(guide.best_time) ||
    Boolean(guide.getting_around) ||
    factRows.length > 0;

  // AI-estimated per-person, per-day budget in three tiers. Only shown when the
  // backend has generated it (per_day amounts > 0).
  const budget = guide.estimated_budget;
  const hasBudget = Boolean(budget && budget.per_day.budget > 0);
  const budgetSymbol = budget?.currency_symbol ?? budget?.currency ?? "";
  const formatAmount = (amount: number) =>
    `${budgetSymbol}${amount.toLocaleString(locale)}`;
  const budgetTiers = budget
    ? [
        { key: "budget", label: t("budget.budget"), amount: budget.per_day.budget },
        { key: "mid", label: t("budget.mid"), amount: budget.per_day.mid },
        { key: "comfort", label: t("budget.comfort"), amount: budget.per_day.comfort },
      ]
    : [];

  return (
    <main className="min-h-screen bg-[#FFFBF5]">
      {/* Hero */}
      <section className="relative pt-[120px] lg:pt-[160px] pb-16 lg:pb-20 px-4 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="hidden lg:block mb-6">
            <Breadcrumb
              items={[
                { label: t("home"), href: `/${locale}` },
                { label: t("destinations"), href: `/${locale}/destinations` },
                { label: guide.city },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-5">
                {guide.flag ? `${guide.flag} ` : ""}
                {guide.country ?? t("tripPlanner")}
              </span>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-[1.05] mb-5">
                {guide.city}
              </h1>
              {guide.tagline && (
                <p className="text-base lg:text-lg font-karla text-[#001E13]/75 leading-relaxed mb-6 max-w-xl">
                  {guide.tagline}
                </p>
              )}

              {heroChips.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {heroChips.map((chip) => (
                    <span
                      key={chip}
                      className="bg-white border border-[#001E13]/10 text-[#001E13] px-4 py-1.5 rounded-full text-sm font-karla"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}

              <Link href={signupHref}>
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                  {t("forkTrip")}
                </PulsatingButton>
              </Link>
              <p className="text-xs font-karla text-[#001E13]/50 mt-3">
                {t("forkSubtext")}
              </p>
            </div>

            {guide.cover && (
              <div>
                <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={guide.cover.url}
                    alt={guide.city}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {guide.cover.attribution?.name && (
                  <p className="text-xs font-karla text-[#001E13]/40 mt-2 text-right">
                    {t("photoCredit", { name: guide.cover.attribution.name })}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      {guide.description && (
        <FadeIn>
          <section className="py-12 lg:py-16 px-4 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-5">
              {guide.description
                .split(/\n{2,}/)
                .map((p) => p.trim())
                .filter(Boolean)
                .map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Itinerary */}
      {guide.itinerary.length > 0 && (
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-3">
                  {t("itinerary")}
                </h2>
              </div>

              <div className="space-y-6">
                {guide.itinerary.map((day) => (
                  <article
                    key={day.day}
                    className="bg-[#FFFBF5]/5 backdrop-blur-sm border border-[#FFFBF5]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8"
                  >
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-londrina-solid text-3xl lg:text-4xl text-[#EEF899] whitespace-nowrap">
                        {t("dayLabel", { day: day.day })}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5]">
                        {day.title}
                      </h3>
                    </div>
                    <p className="text-[#FFFBF5]/80 font-karla text-sm lg:text-base leading-relaxed">
                      {day.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Highlights */}
      {guide.highlights.length > 0 && (
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {t("highlights")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guide.highlights.map((h, i) => (
                  <article
                    key={i}
                    className="bg-white rounded-3xl overflow-hidden border border-[#001E13]/10 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    {h.image && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={h.image.url}
                          alt={h.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      {(h.emoji || h.category_label) && (
                        <span className="inline-flex items-center gap-1.5 self-start bg-[#EEF899] text-[#001E13] px-3 py-1 rounded-full text-xs font-karla font-bold mb-3">
                          {h.emoji && <span>{h.emoji}</span>}
                          {h.category_label && <span>{h.category_label}</span>}
                        </span>
                      )}
                      <h3 className="text-xl font-londrina-solid text-[#001E13] mb-2">
                        {h.title}
                      </h3>
                      <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Neighbourhoods */}
      {guide.neighbourhoods.length > 0 && (
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {t("neighbourhoods")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guide.neighbourhoods.map((n, i) => (
                  <article
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-[#001E13]/10"
                  >
                    <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                      {n.title}
                    </h3>
                    <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed">
                      {n.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Food */}
      {guide.food.length > 0 && (
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {t("food")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guide.food.map((f, i) => (
                  <article
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-[#001E13]/10"
                  >
                    <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                      {f.title}
                    </h3>
                    <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed">
                      {f.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Practical (best time, getting around, facts) */}
      {hasPractical && (
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {t("goodToKnow")}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {guide.best_time && (
                  <div className="bg-[#EEF899] rounded-3xl p-8 border border-[#001E13]/10">
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-4">
                      {t("bestTime")}
                    </h3>
                    <p className="font-karla text-[#001E13]/85 text-base leading-relaxed">
                      {guide.best_time}
                    </p>
                  </div>
                )}

                {guide.getting_around && (
                  <div className="bg-white rounded-3xl p-8 border border-[#001E13]/10">
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-4">
                      {t("gettingAround")}
                    </h3>
                    <p className="font-karla text-[#001E13]/85 text-base leading-relaxed">
                      {guide.getting_around}
                    </p>
                  </div>
                )}

                {factRows.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 border border-[#001E13]/10 lg:col-span-2">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {factRows.map((row) => (
                        <div
                          key={row.label}
                          className="flex justify-between items-baseline gap-4 border-b border-[#001E13]/10 pb-3"
                        >
                          <dt className="font-karla font-bold text-[#001E13]/60 text-sm uppercase tracking-wide">
                            {row.label}
                          </dt>
                          <dd className="font-karla text-[#001E13] text-sm lg:text-base text-right">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* eSIM (Saily affiliate) — sits with the practical section on purpose */}
      <FadeIn>
        <EsimBlock
          city={guide.city}
          country={guide.country}
          countryAlpha2={guide.country_alpha2}
          destinationSlug={guide.id}
        />
      </FadeIn>

      {/* Budget (AI-estimated, per person per day, three tiers) */}
      {hasBudget && (
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {t("budget.heading", { city: guide.city })}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {t("budget.subheading")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {budgetTiers.map((tier) => (
                  <div
                    key={tier.key}
                    className="bg-white rounded-3xl p-6 lg:p-8 border border-[#001E13]/10 text-center"
                  >
                    <span className="block font-karla font-bold text-[#001E13]/60 text-xs uppercase tracking-wide mb-3">
                      {tier.label}
                    </span>
                    <span className="block font-londrina-solid text-3xl lg:text-4xl text-[#F6391A] mb-1">
                      {formatAmount(tier.amount)}
                    </span>
                    <span className="block font-karla text-[#001E13]/50 text-sm">
                      {t("budget.perPersonPerDay")}
                    </span>
                  </div>
                ))}
              </div>

              {budget?.note && (
                <p className="text-xs lg:text-sm font-karla text-[#001E13]/60 leading-relaxed text-center mt-6 max-w-2xl mx-auto">
                  {budget.note}
                </p>
              )}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Local tips */}
      {guide.local_tips.length > 0 && (
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {t("localTips")}
                </h2>
              </div>

              <ul className="space-y-4">
                {guide.local_tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-karla text-[#001E13]/80 text-base lg:text-lg"
                  >
                    <span className="text-[#F6391A] flex-shrink-0 mt-1">✓</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Related destinations — internal linking to sibling guides */}
      {related.length > 0 && (
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
                {t("related.heading")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/${locale}/destinations/${r.id}`}
                    className="group"
                  >
                    <article className="bg-white border border-[#001E13]/10 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      {r.cover && (
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={r.cover.url}
                            alt={r.city}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-londrina-solid text-[#001E13] mb-2">
                          {r.flag ? `${r.flag} ` : ""}
                          {r.city}
                        </h3>
                        {r.tagline && (
                          <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4 flex-1">
                            {r.tagline}
                          </p>
                        )}
                        <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-auto">
                          {t("related.viewGuide")}
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Final CTA */}
      <section className="py-16 lg:py-24 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#F6391A] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
              {t("cta.heading", { city: guide.city })}
            </h2>
            <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              {t("cta.body")}
            </p>
            <div className="flex justify-center">
              <Link href={signupHref}>
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                  {t("cta.button")}
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
