import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import StackingCards from "@/components/StackingCards";
import TravelSteps from "@/components/TravelSteps";
import FAQSupport from "@/components/FAQSupport";
import ReadyBanner from "@/components/ReadyBanner";
import Testimonial from "@/components/Testimonial";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import CTABanner from "@/components/CTABanner";
import FeatureImageSection from "@/components/FeatureImageSection";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import {
  landingPageQuery,
  navigationQuery,
  footerQuery,
} from "@/sanity/lib/query";
import { LandingPage, Navigation, Footer as FooterDataType } from "@/sanity/lib/type";
import { setRequestLocale } from 'next-intl/server';
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
  // Fetch all data from Sanity with locale filter
  const [landingPageData, navigationData, footerData] = await Promise.all([
    client.fetch<LandingPage>(landingPageQuery, { locale }),
    client.fetch<Navigation>(navigationQuery, { locale }),
    client.fetch<FooterDataType>(footerQuery, { locale }),
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

  const { hero, testimonialStats, worldSection, banner, features, travelSteps, testimonials, featureImageSection, ctaBanner, readyBanner, faq } = landingPageData;

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

      {/* Hero Section */}
      <div id="hero" className="pt-[100px] lg:pt-[120px] px-4 lg:px-8 pb-4 lg:pb-6">
        <div className="max-w-[1536px] mx-auto">
          <section className="relative overflow-hidden rounded-[24px] lg:rounded-[40px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={hero?.backgroundImage || "/header-bg.webp"}
                alt={hero?.title || "Hero Background"}
                fill
                className="object-cover"
                priority
                fetchPriority="high"
              />
              {/* Subtle Dark Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 lg:px-12 xl:px-16 py-16 lg:py-36 xl:py-44 flex flex-col items-center text-center lg:items-start lg:text-left min-h-[500px] justify-between">
              <div className="max-w-2xl w-full">
                {hero?.affiliateTag && (
                  <span className="text-orange bg-[#FFFBF5] px-4 py-1 rounded-full text-sm lg:text-lg inline-block mb-4 lg:mb-6 font-nanum-pen">
                    {hero.affiliateTag}
                  </span>
                )}

                <h1 className="text-[#FFFBF5] text-2xl lg:text-4xl xl:text-[48px] font-londrina-solid leading-tight mb-4 lg:mb-6 whitespace-pre-line">
                  {hero?.title || ""}
                </h1>

                {hero?.description && (
                  <p className="text-[#FFFBF5] text-sm lg:text-base font-karla font-semibold leading-relaxed mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0 whitespace-pre-line">
                    {hero.description}
                  </p>
                )}
              </div>

              {hero?.ctaText && (
                <div className="flex flex-col gap-2 items-center lg:items-start">
                  <Link href={hero.ctaUrl || "https://app.weplanify.com/register"}>
                    <PulsatingButton className="font-karla font-bold">
                      {hero.ctaText}
                    </PulsatingButton>
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Testimonial & Stats Section */}
      <div id="reviews" className="px-4 lg:px-8 pb-8 lg:pb-12">
        <div className="max-w-[1536px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Left Block - Testimonial Carousel */}
            {testimonialStats?.featuredTestimonials && testimonialStats.featuredTestimonials.length > 0 && (
              <TestimonialCarousel testimonials={testimonialStats.featuredTestimonials} />
            )}

            {/* Right Block - Stats */}
            {testimonialStats?.stats && (
              <div className="bg-[#EEF899] rounded-[24px] lg:rounded-[32px] p-8 lg:p-12">
                {testimonialStats.statsTitle && (
                  <h2 className="text-[#001E13] text-base lg:text-lg font-semibold mb-8 lg:mb-10">
                    {testimonialStats.statsTitle}
                  </h2>
                )}
                <div className="grid grid-cols-2 gap-6 lg:gap-8">
                  {testimonialStats.stats.map((stat, index) => (
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
                      <p className="text-[#001E13] text-xs lg:text-sm font-nanum-pen">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
          className="py-4 lg:py-6 overflow-hidden"
          style={{
            backgroundColor: banner.backgroundColor || "#61DBD5",
            color: banner.textColor || "#001E13",
          }}
        >
          <div className="flex whitespace-nowrap animate-scroll">
            <div className="flex items-center gap-8 lg:gap-12">
              {banner.items.map((item, index) => (
                <>
                  <span key={`item-${index}`} className="text-xl lg:text-3xl font-londrina-solid">
                    {item}
                  </span>
                  <span key={`dot-${index}`} className="text-xl lg:text-3xl">
                    •
                  </span>
                </>
              ))}
            </div>
            <div className="flex items-center gap-8 lg:gap-12 ml-8 lg:ml-12">
              {banner.items.map((item, index) => (
                <>
                  <span key={`item2-${index}`} className="text-xl lg:text-3xl font-londrina-solid">
                    {item}
                  </span>
                  <span key={`dot2-${index}`} className="text-xl lg:text-3xl">
                    •
                  </span>
                </>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stacking Cards Section */}
      {features && (
        <FadeIn>
        <div id="features">
          <StackingCards data={features} />
        </div>
        </FadeIn>
      )}

      

      {/* Travel Steps */}
      {travelSteps && (
        <FadeIn>
        <div id="how-it-works">
          <TravelSteps data={travelSteps} />
        </div>
        </FadeIn>
      )}

      {/* Testimonials */}
      {testimonials && <FadeIn><Testimonial data={testimonials} /></FadeIn>}

      {/* Feature Image Section */}
      {featureImageSection && <FadeIn><FeatureImageSection data={featureImageSection} /></FadeIn>}

      {/* CTA Banner */}
      {ctaBanner && <FadeIn><CTABanner data={ctaBanner} /></FadeIn>}

      {/* FAQ Support */}
      {faq && (
        <FadeIn>
        <div id="faq">
          <FAQSupport data={faq} />
        </div>
        </FadeIn>
      )}

      {/* Ready Banner */}
      {readyBanner && <FadeIn><ReadyBanner data={readyBanner} /></FadeIn>}

      {/* Footer */}
      <Footer footerData={footerData} />

      {/* Sticky mobile CTA — appears when hero scrolls out of view */}
      <StickyMobileCTA text={hero?.ctaText || "Get started"} href={hero?.ctaUrl || "https://app.weplanify.com/register"} />
    </main>
  );
}
