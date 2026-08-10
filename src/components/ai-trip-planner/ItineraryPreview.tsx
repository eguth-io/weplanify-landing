import { getTranslations } from "next-intl/server";

type PreviewDay = {
  label: string;
  title: string;
  items: { time: string; title: string }[];
};

/**
 * Worked example of what the planner returns, shown next to the hero copy.
 *
 * The page sells "describe the trip, get a day-by-day itinerary" — without a
 * concrete itinerary on screen the reader has only our word for it. This is a
 * rendered example rather than a screenshot so it translates into all eight
 * locales, stays crisp on every viewport, and is readable by crawlers.
 *
 * It is labelled as an example on purpose: it illustrates the shape of the
 * output, it is not a live generation and must never be dressed up as one.
 */
export default async function ItineraryPreview() {
  const t = await getTranslations("aiTripPlanner.preview");
  const days = t.raw("days") as PreviewDay[];

  return (
    <figure className="m-0">
      {/* The brief — the "one sentence" the copy promises is all you need. */}
      <div className="mb-3 lg:mb-4">
        <span className="block font-karla text-[#001E13]/50 text-xs uppercase tracking-wide mb-2">
          {t("promptLabel")}
        </span>
        <p className="font-karla text-[#001E13]/80 text-sm lg:text-base bg-white border border-[#001E13]/10 rounded-2xl rounded-bl-sm px-4 py-3 leading-relaxed">
          {t("prompt")}
        </p>
      </div>

      <div className="rounded-3xl border border-[#001E13]/10 bg-white overflow-hidden shadow-sm">
        <header className="bg-[#001E13] px-5 lg:px-6 py-4">
          <span className="inline-block bg-[#EEF899] text-[#001E13] px-3 py-0.5 rounded-full text-[11px] font-karla font-bold mb-2">
            {t("label")}
          </span>
          <p className="font-londrina-solid text-[#FFFBF5] text-2xl lg:text-3xl leading-none">
            {t("trip.title")}
          </p>
          <p className="font-karla text-[#FFFBF5]/70 text-sm mt-1">
            {t("trip.meta")}
          </p>
        </header>

        <ol className="divide-y divide-[#001E13]/10">
          {days.map((day) => (
            <li key={day.label} className="px-5 lg:px-6 py-4">
              <div className="flex items-baseline gap-3 mb-2.5">
                <span className="font-karla font-bold text-[#F6391A] text-xs uppercase tracking-wide whitespace-nowrap">
                  {day.label}
                </span>
                <h3 className="font-karla font-bold text-[#001E13] text-base">
                  {day.title}
                </h3>
              </div>
              <ul className="space-y-1.5">
                {day.items.map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-3 font-karla text-[#001E13]/80 text-sm"
                  >
                    <span className="text-[#001E13]/45 tabular-nums w-11 shrink-0">
                      {item.time}
                    </span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* What makes it a group plan rather than a block of text. */}
        <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#001E13]/10 bg-[#FFFBF5] px-5 lg:px-6 py-3.5 font-karla text-sm text-[#001E13]/70">
          <span className="font-bold text-[#001E13]">{t("footer.votes")}</span>
          <span>{t("footer.vote")}</span>
          <span>{t("footer.edit")}</span>
        </footer>
      </div>

      <figcaption className="font-karla text-[#001E13]/50 text-xs leading-relaxed mt-3">
        {t("caption")}
      </figcaption>
    </figure>
  );
}
