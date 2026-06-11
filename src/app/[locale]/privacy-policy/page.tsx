import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/Breadcrumb";
import { hreflangLanguages } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://www.weplanify.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });
  const currentUrl = `${SITE_URL}/${locale}/privacy-policy`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: currentUrl,
      languages: hreflangLanguages(SITE_URL, "/privacy-policy"),
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacyPolicy");

  const sections = t.raw("sections") as {
    title: string;
    body: string;
    list?: string[];
    footer?: string;
  }[];

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: `/${locale}` },
    { label: t("title") },
  ];

  return (
    <>
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen bg-[#FFFBF5] pt-[100px]">
        <section className="py-12 lg:py-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />

            <h1 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mt-6 mb-2">
              {t("title")}
            </h1>
            <p className="font-karla text-sm text-[#001E13]/50 mb-10">{t("lastUpdated")}</p>

            <div className="space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-[#001E13] text-xl font-londrina-solid mb-3">
                    {section.title}
                  </h2>
                  <p className="font-karla text-[#001E13]/75 text-base leading-relaxed">
                    {section.body}
                  </p>
                  {section.list && (
                    <ul className="mt-3 space-y-2 pl-5">
                      {section.list.map((item, j) => (
                        <li
                          key={j}
                          className="font-karla text-[#001E13]/70 text-sm leading-relaxed list-disc"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.footer && (
                    <p className="font-karla text-[#001E13]/75 text-sm mt-3">{section.footer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer footerData={footerData} />
    </>
  );
}
