import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import HeroPitchWall from "@/components/HeroPitchWall";

// Lazy-load below-the-fold components to reduce initial JS bundle
const StackingCards = dynamic(() => import("@/components/StackingCards"));
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
import {
  landingPageQuery,
  navigationQuery,
  footerQuery,
} from "@/sanity/lib/query";
import { LandingPage, Navigation, Footer as FooterDataType } from "@/sanity/lib/type";
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
  // Fetch all data from Sanity with locale filter
  const [landingPageData, navigationData, footerData, instagramPosts] = await Promise.all([
    client.fetch<LandingPage>(landingPageQuery, { locale }),
    client.fetch<Navigation>(navigationQuery, { locale }),
    client.fetch<FooterDataType>(footerQuery, { locale }),
    getInstagramPosts(),
  ]);

  // Fallback if data is not yet filled in Sanity
  if (!landingPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">
          Please fill in the data in Sanity Studio (/studio)
        </p>
      </div>
    );
  }

  const { hero, worldSection, banner } = landingPageData;

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
          affiliateTag: hero?.affiliateTag ?? null,
          title: hero?.title ?? null,
          description: hero?.description ?? null,
          backgroundImage: hero?.backgroundImage ?? null,
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
      {worldSection && (
      <FadeIn>
        <div className="bg-[#001E13]">
          <div className="overflow-hidden">
            <div className="flex flex-col-reverse lg:flex-row max-w-[1400px] mx-auto">
              {/* Left side - Images */}
              <div className="relative h-auto lg:h-[550px] p-0 lg:py-0 lg:px-8 lg:w-1/2 overflow-hidden">
                <div className="relative w-full h-full hidden lg:grid lg:grid-cols-2 gap-4 items-start">
                  {/* Left column - 2 cards */}
                  <div className="flex flex-col gap-4 -mt-12">
                    {worldSection.images?.[0] && (
                      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden transform -rotate-3 shadow-2xl">
                        <Image
                          src={worldSection.images[0].url}
                          alt={worldSection.images[0].alt || "Destination"}
                          width={480}
                          height={640}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    {worldSection.images?.[1] && (
                      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden transform rotate-2 shadow-2xl mt-8">
                        <Image
                          src={worldSection.images[1].url}
                          alt={worldSection.images[1].alt || "Destination"}
                          width={480}
                          height={640}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right column - 2 cards */}
                  <div className="flex flex-col gap-4 mt-8">
                    {worldSection.images?.[2] && (
                      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden transform rotate-3 shadow-2xl">
                        <Image
                          src={worldSection.images[2].url}
                          alt={worldSection.images[2].alt || "Destination"}
                          width={480}
                          height={640}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    {worldSection.images?.[3] && (
                      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden transform -rotate-2 shadow-2xl mt-6">
                        <Image
                          src={worldSection.images[3].url}
                          alt={worldSection.images[3].alt || "Destination"}
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
                  {worldSection.title}
                </h2>
                <p className="text-[#FFFBF5] text-sm lg:text-base font-karla leading-relaxed mb-8 lg:mb-10 whitespace-pre-line">
                  {worldSection.description}
                </p>
                {worldSection.ctaText && (
                  <div>
                    <Link href={worldSection.ctaUrl || "#"}>
                      <button className="relative flex cursor-pointer items-center justify-center px-6 py-2 text-center text-[#001E13] bg-[#EEF899] rounded-full font-karla font-bold text-sm lg:text-base ring-4 ring-[#EEF899] ring-opacity-15">
                        <span className="relative z-10 bg-[#EEF899] text-[#001E13] font-bold">
                          {worldSection.ctaText}
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
      )}

      {/* Scrolling Banner Section */}
      {banner?.items && banner.items.length > 0 && (
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
                <>
                  <span key={`item-${index}`} className="text-base lg:text-xl font-londrina-solid">
                    {item}
                  </span>
                  <span key={`dot-${index}`} className="text-base lg:text-xl">
                    •
                  </span>
                </>
              ))}
            </div>
            <div className="flex items-center gap-8 lg:gap-12 ml-8 lg:ml-12">
              {banner.items.map((item, index) => (
                <>
                  <span key={`item2-${index}`} className="text-base lg:text-xl font-londrina-solid">
                    {item}
                  </span>
                  <span key={`dot2-${index}`} className="text-base lg:text-xl">
                    •
                  </span>
                </>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stacking Cards Section */}
      <FadeIn>
        <div id="features">
          <StackingCards locale={locale} />
        </div>
      </FadeIn>

      

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
