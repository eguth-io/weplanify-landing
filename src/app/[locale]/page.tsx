// Fragment n'est utilisé que par le bandeau défilant (Scrolling Banner), actuellement
// commenté plus bas. Réimporter `{ Fragment }` depuis "react" pour le réactiver.
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import HeroPitchWall from "@/components/HeroPitchWall";

// Lazy-load below-the-fold components to reduce initial JS bundle
const BigFeaturesSection = dynamic(() => import("@/components/BigFeaturesSection"));
const FAQSupport = dynamic(() => import("@/components/FAQSupport"));
const TestimonialCarousel = dynamic(() => import("@/components/TestimonialCarousel"));
const StatsBlock = dynamic(() => import("@/components/StatsBlock"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));
const FeatureImageSection = dynamic(() => import("@/components/FeatureImageSection"));
const InstagramSlider = dynamic(() => import("@/components/InstagramSlider"));
import Image from "next/image";
import { getInstagramPosts } from "@/lib/instagram";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { navigationQuery, footerQuery } from "@/sanity/lib/query";
import { Navigation, Footer as FooterDataType } from "@/sanity/lib/type";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homePage");
  // Homepage copy (hero, world section, and every section component) now comes
  // from next-intl message files. Only nav/footer config is still sourced from
  // Sanity, with an en fallback for locales not authored there.
  const [navRaw, footerRaw, instagramPosts] = await Promise.all([
    client.fetch<Navigation>(navigationQuery, { locale }),
    client.fetch<FooterDataType>(footerQuery, { locale }),
    getInstagramPosts(),
  ]);
  const [navigationData, footerData] =
    locale === "en"
      ? [navRaw, footerRaw]
      : await Promise.all([
          navRaw ?? client.fetch<Navigation>(navigationQuery, { locale: "en" }),
          footerRaw ?? client.fetch<FooterDataType>(footerQuery, { locale: "en" }),
        ]);

  // Images are served from the CDN; only the copy is localized via messages.
  const HERO_BG =
    "https://cdn.sanity.io/images/pkczubdf/production/dead4cd1121015e8d63c0f347ee08005b5d835ee-1379x751.png";
  const WORLD_CTA_URL = "https://app.weplanify.com/";
  const WORLD_IMAGES = [
    "https://cdn.sanity.io/images/pkczubdf/production/91d610ed547e46f33608d6de1617202522cf85cd-1024x1536.heif",
    "https://cdn.sanity.io/images/pkczubdf/production/5d3652d63dd35237cf7710904f13fb295a091892-1024x1536.heif",
    "https://cdn.sanity.io/images/pkczubdf/production/5da7a2e647b07fc2b2bb9100bb5d93d84142f1fa-1024x1536.heif",
    "https://cdn.sanity.io/images/pkczubdf/production/3ad15779ae62ac56c662c8dd4b384a188bbd767c-1024x1536.heif",
  ];

  return (
    <main className="landing-page" id="main-content">
      {/* Navigation */}
      <Nav
        navData={{
          logo: navigationData?.logo || "/logo.webp",
          logoMobile: navigationData?.logo || "/logo.webp",
          connexionLink: navigationData?.connectionButton?.url || "/connexion",
          ctaButton: navigationData?.ctaButton?.text || "Get started",
          ctaLink: navigationData?.ctaButton?.url || "/contact",
        }}
        navigationData={navigationData}
      />

      <HeroPitchWall
        locale={locale}
        hero={{
          affiliateTag: t("hero.affiliateTag"),
          title: t("hero.title"),
          description: t("hero.description"),
          backgroundImage: HERO_BG,
        }}
      />

      {/* Testimonial & Stats Section */}
      <section id="reviews" className="px-4 lg:px-8 pb-8 lg:pb-12">
        <div className="max-w-[1536px] mx-auto">
          <h2 className="text-[#001E13] text-2xl lg:text-4xl font-londrina-solid mb-4 lg:mb-6">
            {t("reviews.heading")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Left Block - Testimonial Carousel */}
            <TestimonialCarousel />

            {/* Right Block - Stats */}
            <StatsBlock />
          </div>
        </div>
      </section>

      {/* World Section */}
      <FadeIn>
        <div className="bg-[#001E13]">
          <div className="overflow-hidden">
            <div className="flex flex-col-reverse lg:flex-row max-w-[1400px] mx-auto">
              {/* Left side - Images */}
              <div className="relative h-auto lg:h-[550px] p-0 lg:py-0 lg:px-8 lg:w-1/2 overflow-hidden">
                <div className="relative w-full h-full hidden lg:grid lg:grid-cols-2 gap-4 items-start">
                  {/* Left column - 2 cards */}
                  <div className="flex flex-col gap-4 -mt-12">
                    {WORLD_IMAGES[0] && (
                      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden transform -rotate-3 shadow-2xl">
                        <Image
                          src={WORLD_IMAGES[0]}
                          alt="Destination"
                          width={480}
                          height={640}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    {WORLD_IMAGES[1] && (
                      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden transform rotate-2 shadow-2xl mt-8">
                        <Image
                          src={WORLD_IMAGES[1]}
                          alt="Destination"
                          width={480}
                          height={640}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right column - 2 cards */}
                  <div className="flex flex-col gap-4 mt-8">
                    {WORLD_IMAGES[2] && (
                      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden transform rotate-3 shadow-2xl">
                        <Image
                          src={WORLD_IMAGES[2]}
                          alt="Destination"
                          width={480}
                          height={640}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    {WORLD_IMAGES[3] && (
                      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden transform -rotate-2 shadow-2xl mt-6">
                        <Image
                          src={WORLD_IMAGES[3]}
                          alt="Destination"
                          width={480}
                          height={640}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center lg:w-1/2">
                <h2 className="text-[#FFFBF5] text-4xl lg:text-5xl xl:text-6xl font-londrina-solid leading-tight mb-6 lg:mb-8 whitespace-pre-line">
                  {t("worldSection.title")}
                </h2>
                <p className="text-[#FFFBF5] text-sm lg:text-base font-karla leading-relaxed mb-8 lg:mb-10 whitespace-pre-line">
                  {t("worldSection.description")}
                </p>
                {(
                  <div>
                    <Link href={WORLD_CTA_URL}>
                      <button className="relative flex cursor-pointer items-center justify-center px-6 py-2 text-center text-[#001E13] bg-[#EEF899] rounded-full font-karla font-bold text-sm lg:text-base ring-4 ring-[#EEF899] ring-opacity-15">
                        <span className="relative z-10 bg-[#EEF899] text-[#001E13] font-bold">
                          {t("worldSection.ctaText")}
                        </span>
                        <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#EEF899] opacity-75" />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Scrolling Banner Section — temporairement masqué (desktop + mobile).
          Décommenter le bloc ci-dessous pour le réafficher ; les données viennent
          toujours de Sanity (banner.items / backgroundColor / textColor). */}
      {/* {banner?.items && banner.items.length > 0 && (
        <div
          className="py-2 lg:py-3 overflow-hidden"
          style={{
            backgroundColor: banner.backgroundColor || "#61DBD5",
            color: banner.textColor || "#001E13",
          }}
        >
          <div className="flex whitespace-nowrap animate-scroll">
            <div className="flex items-center gap-8 lg:gap-12">
              {banner.items.map((item, index) => (
                <Fragment key={`item-${index}`}>
                  <span className="text-base lg:text-xl font-londrina-solid">
                    {item}
                  </span>
                  <span className="text-base lg:text-xl">
                    •
                  </span>
                </Fragment>
              ))}
            </div>
            <div className="flex items-center gap-8 lg:gap-12 ml-8 lg:ml-12">
              {banner.items.map((item, index) => (
                <Fragment key={`item2-${index}`}>
                  <span className="text-base lg:text-xl font-londrina-solid">
                    {item}
                  </span>
                  <span className="text-base lg:text-xl">
                    •
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* Big Features Section — full-screen image that shrinks into a horizontal slider */}
      <div id="features">
        <BigFeaturesSection locale={locale} />
      </div>

      

      {/* Feature Image Section */}
      <FadeIn><FeatureImageSection locale={locale} /></FadeIn>

      {/* CTA Banner */}
      <FadeIn><CTABanner locale={locale} /></FadeIn>

      {/* FAQ Support */}
      <FadeIn>
        <div id="faq">
          <FAQSupport />
        </div>
      </FadeIn>

      {/* Instagram feed */}
      <FadeIn>
        <InstagramSlider posts={instagramPosts} locale={locale} />
      </FadeIn>

      {/* Footer */}
      <Footer footerData={footerData} />

    </main>
  );
}
