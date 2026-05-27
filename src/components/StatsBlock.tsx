type Lang = "en" | "fr";

type Stat = {
  value: string;
  label: string;
  showStar?: boolean;
};

type StatsContent = {
  title: string;
  items: Stat[];
};

const STATS: Record<Lang, StatsContent> = {
  fr: {
    title: "Chaque voyage mérite de commencer sereinement",
    items: [
      { value: "+190", label: "pays couverts" },
      { value: "4,8", label: "Satisfaction des voyageurs", showStar: true },
    ],
  },
  en: {
    title: "Trusted by groups who travel smarter",
    items: [
      { value: "190+", label: "countries covered" },
      { value: "4.8", label: "Traveler satisfaction", showStar: true },
    ],
  },
};

interface StatsBlockProps {
  locale?: string;
}

export default function StatsBlock({ locale = "en" }: StatsBlockProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const { title, items } = STATS[lang];

  return (
    <div className="bg-[#EEF899] rounded-[24px] lg:rounded-[32px] p-8 lg:p-12">
      <h2 className="text-[#001E13] text-base lg:text-lg font-semibold mb-8 lg:mb-10">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-6 lg:gap-8">
        {items.map((stat, index) => (
          <div key={index}>
            <div className="flex items-center gap-1 mb-2">
              <p className="text-[#001E13] text-4xl lg:text-5xl xl:text-6xl font-londrina-solid">
                {stat.value}
              </p>
              {stat.showStar && (
                <svg
                  className="w-8 h-8 lg:w-10 lg:h-10"
                  viewBox="0 0 24 24"
                  fill="#001E13"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              )}
            </div>
            <p className="text-[#001E13] text-base lg:text-lg font-nanum-pen">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
