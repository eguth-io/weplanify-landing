import Image from "next/image";

type Lang = "en" | "fr";

const CONTENT: Record<Lang, { title: string }> = {
  fr: {
    title: "Pensée par des voyageurs,\nfaite pour les groupes.",
  },
  en: {
    title: "A group travel planner,\nbuilt by travelers, for travelers.",
  },
};

const IMAGE_URL =
  "https://cdn.sanity.io/images/pkczubdf/production/7f13a098b8d93b0a7ca447104b7a18f446fa72be-2128x1658.webp";

interface FeatureImageSectionProps {
  locale?: string;
}

export default function FeatureImageSection({ locale = "en" }: FeatureImageSectionProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const { title } = CONTENT[lang];

  return (
    <div className="px-4 lg:px-8 pt-8 lg:pt-12">
      <div className="max-w-[1536px] mx-auto">
        <h2 className="text-[#001E13] text-3xl lg:text-5xl xl:text-6xl font-londrina-solid leading-tight mb-8 lg:mb-12 text-center max-w-[800px] mx-auto whitespace-pre-line">
          {title}
        </h2>
        <div className="relative w-full max-w-[864px] mx-auto">
          <Image
            src={IMAGE_URL}
            alt={title}
            width={864}
            height={450}
            style={{ width: "auto", height: "auto" }}
            className="rounded-[24px] lg:rounded-[32px]"
          />
        </div>
      </div>
    </div>
  );
}
