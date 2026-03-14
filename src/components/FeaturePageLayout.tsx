"use client";

import Link from "next/link";
import Image from "next/image";
import { Safari } from "@/components/magicui/safari";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface FeaturePageProps {
  title: string;
  subtitle: string;
  animation: React.ReactNode;
  steps: Step[];
  screenshotUrl?: string;
  benefits: Benefit[];
  testimonial?: Testimonial;
}

export default function FeaturePageLayout({
  title,
  subtitle,
  animation,
  steps,
  screenshotUrl,
  benefits,
  testimonial,
}: FeaturePageProps) {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Hero Section */}
      <section className="relative px-4 lg:px-8 pt-16 lg:pt-24 pb-16 lg:pb-20">
        <div className="max-w-[1536px] mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Gradient Title */}
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid leading-tight mb-6">
              <span className="bg-gradient-to-r from-[#F6391A] via-[#61DBD5] to-[#EEF899] bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#001E13] text-lg lg:text-xl font-karla max-w-2xl mb-8 lg:mb-12 leading-relaxed">
              {subtitle}
            </p>

            {/* Animation Placeholder */}
            <div className="w-full max-w-4xl mb-8 lg:mb-12">
              {animation}
            </div>

            {/* CTA Button */}
            <Link href="/signup">
              <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                Commencer gratuitement
              </PulsatingButton>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 lg:px-8 py-16 lg:py-24 bg-[#001E13]">
        <div className="max-w-[1536px] mx-auto">
          <h2 className="text-[#FFFBF5] text-3xl lg:text-5xl font-londrina-solid text-center mb-12 lg:mb-16">
            Comment ca marche
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                {/* Step Number */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#F6391A] flex items-center justify-center mb-6">
                  <span className="text-[#FFFBF5] text-2xl lg:text-3xl font-unbounded font-bold">
                    {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-4xl lg:text-5xl mb-4">{step.icon}</div>

                {/* Step Title */}
                <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[#FFFBF5]/70 text-base font-karla leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshot Section */}
      {screenshotUrl && (
        <section className="px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative">
              <Safari
                url="app.weplanify.com"
                imageSrc={screenshotUrl}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="px-4 lg:px-8 py-16 lg:py-24 bg-[#61DBD5]/10">
        <div className="max-w-[1536px] mx-auto">
          <h2 className="text-[#001E13] text-3xl lg:text-5xl font-londrina-solid text-center mb-12 lg:mb-16">
            Les avantages
          </h2>

          <div className={`grid grid-cols-1 md:grid-cols-2 ${benefits.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 lg:gap-8`}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-[24px] p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="text-4xl lg:text-5xl mb-4">{benefit.icon}</div>

                {/* Benefit Title */}
                <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-3">
                  {benefit.title}
                </h3>

                {/* Benefit Description */}
                <p className="text-[#001E13]/70 text-base font-karla leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {testimonial && (
        <section className="px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-[1536px] mx-auto">
            <div className="bg-white rounded-[24px] lg:rounded-[40px] p-8 lg:p-12 xl:p-16 shadow-sm max-w-4xl mx-auto">
              {/* Quote */}
              <blockquote className="text-[#001E13] text-xl lg:text-2xl leading-relaxed text-center mb-8 italic font-karla">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center">
                {testimonial.avatar && (
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden mb-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">
                  {testimonial.author}
                </p>
                <p className="text-[#001E13]/60 text-base lg:text-lg font-karla">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="px-4 lg:px-8 py-8 lg:py-12">
        <div className="max-w-[1536px] mx-auto">
          <div className="bg-[#001E13] rounded-[24px] lg:rounded-[40px] p-8 lg:p-12 xl:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* CTA Text */}
              <div className="text-center lg:text-left">
                <h2 className="text-[#FFFBF5] text-2xl lg:text-4xl xl:text-5xl font-londrina-solid mb-4">
                  <span className="text-[#FFFBF5]">Pret a </span>
                  <span className="text-[#61DBD5]">planifier </span>
                  <span className="text-[#EEF899]">votre voyage?</span>
                </h2>
                <p className="text-[#FFFBF5]/80 text-base lg:text-lg font-karla max-w-xl">
                  Rejoignez des milliers de voyageurs qui utilisent Weplanify pour organiser leurs aventures.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Link href="/signup">
                  <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                    Commencer gratuitement
                  </PulsatingButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
