import Link from "next/link";

type AuthorBioProps = {
  locale: string;
  publishedDate?: string;
  modifiedDate?: string;
};

const author = {
  en: {
    name: "Alex Martin",
    role: "Travel Editor, WePlanify",
    bio: "Alex has organized 50+ group trips across 30 countries and writes about collaborative travel planning, group dynamics, and the tools that make group travel easier.",
    readMore: "More from Alex",
  },
  fr: {
    name: "Alex Martin",
    role: "Rédacteur Voyage, WePlanify",
    bio: "Alex a organisé plus de 50 voyages de groupe dans 30 pays et écrit sur la planification collaborative, la dynamique de groupe et les outils qui facilitent les voyages entre amis.",
    readMore: "Plus d'articles",
  },
};

export function AuthorBio({ locale, publishedDate, modifiedDate }: AuthorBioProps) {
  const t = locale === "fr" ? author.fr : author.en;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-start gap-4 py-6 border-t border-b border-[#001E13]/10">
      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#001E13] rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-[#FFFBF5] text-lg lg:text-xl font-londrina-solid">
          AM
        </span>
      </div>
      <div className="min-w-0">
        <p className="font-karla font-bold text-[#001E13] text-sm lg:text-base">
          {t.name}
        </p>
        <p className="font-karla text-[#001E13]/60 text-xs lg:text-sm">
          {t.role}
        </p>
        <p className="font-karla text-[#001E13]/70 text-xs lg:text-sm mt-1 leading-relaxed">
          {t.bio}
        </p>
        {(publishedDate || modifiedDate) && (
          <p className="font-karla text-[#001E13]/50 text-xs mt-2">
            {publishedDate && (
              <span>
                {locale === "fr" ? "Publié le " : "Published "}
                <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
              </span>
            )}
            {publishedDate && modifiedDate && <span> · </span>}
            {modifiedDate && (
              <span>
                {locale === "fr" ? "Mis à jour le " : "Updated "}
                <time dateTime={modifiedDate}>{formatDate(modifiedDate)}</time>
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export function AuthorJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alex Martin",
    jobTitle: "Travel Editor",
    worksFor: {
      "@type": "Organization",
      name: "WePlanify",
      url: "https://www.weplanify.com",
    },
    description:
      "Travel editor specializing in group trip planning and collaborative travel tools.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
