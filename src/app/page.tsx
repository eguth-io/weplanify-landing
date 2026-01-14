import Nav from "@/components/Nav";
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
import { client } from "@/sanity/lib/client";
import {
  landingPageQuery,
  navigationQuery,
  footerQuery,
} from "@/sanity/lib/query";
import { LandingPage, Navigation, Footer } from "@/sanity/lib/type";

export default async function HomePage() {
  // Fetch all data from Sanity
  const [landingPageData, navigationData, footerData] = await Promise.all([
    client.fetch<LandingPage>(landingPageQuery),
    client.fetch<Navigation>(navigationQuery),
    client.fetch<Footer>(footerQuery),
  ]);

  // Fallback si les données ne sont pas encore remplies dans Sanity
  if (!landingPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">
          Veuillez remplir les données dans Sanity Studio (/studio)
        </p>
      </div>
    );
  }

  const { hero, testimonialStats, worldSection, banner, features, travelSteps, testimonials, featureImageSection, ctaBanner, readyBanner, faq } = landingPageData;

  return (
    <div className="landing-page">
      {/* Navigation */}
      <Nav
        navData={{
          logo: navigationData?.logo || "/logo.webp",
          logoMobile: navigationData?.logo || "/logo.webp",
          connexionLink: navigationData?.ctaButton?.url || "#",
          ctaButton: navigationData?.ctaButton?.text || "Connexion",
          ctaLink: navigationData?.ctaButton?.url || "#",
        }}
      />

      {/* Hero Section */}
      <div className="pt-[100px] lg:pt-[120px] px-4 lg:px-8 pb-4 lg:pb-6">
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
              />
              {/* Subtle Dark Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 lg:px-12 xl:px-16 py-16 lg:py-36 xl:py-44 flex flex-col items-center text-center lg:items-start lg:text-left min-h-[500px] justify-between">
              <div className="max-w-2xl w-full">
                {hero?.affiliateTag && (
                  <h2 className="text-orange bg-[#FFFBF5] px-4 py-1 rounded-full text-sm lg:text-lg inline-block mb-4 lg:mb-6 font-nanum-pen">
                    {hero.affiliateTag}
                  </h2>
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
                <div className="flex gap-4 items-center">
                  <PulsatingButton className="font-karla font-bold">
                    {hero.ctaText}
                  </PulsatingButton>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Testimonial & Stats Section */}
      <div className="px-4 lg:px-8 pb-8 lg:pb-12">
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
                  <h3 className="text-[#001E13] text-base lg:text-lg font-semibold mb-8 lg:mb-10">
                    {testimonialStats.statsTitle}
                  </h3>
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
                    <button className="relative flex cursor-pointer items-center justify-center px-6 py-2 text-center text-[#001E13] bg-[#EEF899] rounded-full font-karla font-bold text-sm lg:text-base ring-4 ring-[#EEF899] ring-opacity-15">
                      <span className="relative z-10 bg-[#EEF899] text-[#001E13] font-bold">
                        {worldSection.ctaText}
                      </span>
                      <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#EEF899] opacity-75" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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
      {features && <StackingCards data={features} />}

      

      {/* Travel Steps */}
      {travelSteps && <TravelSteps data={travelSteps} />}

      {/* Testimonials */}
      {testimonials && <Testimonial data={testimonials} />}

      {/* Feature Image Section */}
      {featureImageSection && <FeatureImageSection data={featureImageSection} />}

      {/* CTA Banner */}
      {ctaBanner && <CTABanner data={ctaBanner} />}

      {/* FAQ Support */}
      {faq && <FAQSupport data={faq} />}

      {/* Ready Banner */}
      {readyBanner && <ReadyBanner data={readyBanner} />}

      {/* Footer */}
      {footerData && (
        <footer className="px-4 lg:px-8 py-12 lg:py-16 bg-white -mt-8 lg:-mt-12">
          <div className="max-w-[1536px] mx-auto">
            {/* Footer Logo */}
            {footerData.logo && (
              <div className="mb-8 lg:mb-10">
                <Image
                  src={footerData.logo}
                  alt={footerData.tagline || "Logo"}
                  width={155}
                  height={66}
                />
              </div>
            )}

            {/* Footer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 lg:mb-20">
              {/* Footer Columns */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
                {footerData.footerColumns?.map((column, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="text-[#001E13] text-base font-karla font-bold mb-6">
                      {column.title}
                    </h3>
                    {column.links?.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        className="text-[#001E13] text-base font-karla mb-4 hover:text-[#F6391A] transition-colors"
                        target={link.isExternal ? "_blank" : undefined}
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer CTA Section */}
              {footerData.ctaSection?.showCta && (
                <div className="flex flex-col lg:border-l border-[#001E13]/10 pl-0 lg:pl-12">
                  <h3 className="text-[#001E13] text-base font-karla font-bold mb-6">
                    {footerData.ctaSection.title}
                  </h3>
                  {footerData.ctaSection.description && (
                    <p className="text-[#001E13] text-base font-karla mb-6 leading-relaxed">
                      {footerData.ctaSection.description}
                    </p>
                  )}
                  {footerData.ctaSection.buttonText && (
                    <button className="bg-[#F6391A] text-white px-6 py-2.5 rounded-full font-karla font-bold text-base hover:bg-[#F6391A]/90 transition-colors w-fit">
                      {footerData.ctaSection.buttonText}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 lg:pt-10 border-t border-[#001E13]/10">
              {/* Social Links */}
              {footerData.socialLinks && footerData.socialLinks.length > 0 && (
                <div className="flex gap-4 items-center order-2 md:order-1">
                  {footerData.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="hover:opacity-70 transition-opacity"
                      aria-label={social.ariaLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/instagram.svg"
                        alt={social.platform}
                        width={24}
                        height={24}
                      />
                    </a>
                  ))}
                </div>
              )}

              {/* Legal Links */}
              {footerData.legalLinks && footerData.legalLinks.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 order-1 md:order-2">
                  {footerData.legalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="text-[#001E13] text-sm font-karla hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Copyright */}
            {footerData.copyrightText && (
              <div className="text-center mt-8">
                <p className="text-[#001E13]/60 text-sm font-karla">
                  {footerData.copyrightText}
                </p>
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
