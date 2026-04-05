import type { Metadata } from "next";
import { Raleway, Unbounded, Londrina_Solid, Karla, Nanum_Pen_Script } from "next/font/google";
import "../globals.css";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { Analytics } from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import StickyCTA from "@/components/StickyCTA";
import { StructuredData } from "@/components/StructuredData";
import SoftwareApplicationSchema from "@/app/structured-data";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const ralewayFont = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const UnboundedFont = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const londrinaSolidFont = Londrina_Solid({
  variable: "--font-londrina-solid",
  subsets: ["latin"],
  weight: ["100", "300", "400", "900"],
});

const karlaFont = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const nanumPenFont = Nanum_Pen_Script({
  variable: "--font-nanum-pen",
  subsets: ["latin"],
  weight: ["400"],
});

// Generate metadata dynamically from Sanity with hreflang
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateMetadataFromSanity(locale, "");
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className={`${ralewayFont.variable} ${UnboundedFont.variable} ${londrinaSolidFont.variable} ${karlaFont.variable} ${nanumPenFont.variable}`}>
        {/* Structured Data (Organization & Website Schema) */}
        <StructuredData />
        {/* Structured Data (SoftwareApplication Schema) */}
        <SoftwareApplicationSchema />

        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        {/* Sticky CTA — appears on scroll, all pages */}
        <StickyCTA text={locale === "fr" ? "Rejoindre la beta" : "Join the beta"} locale={locale} />

        {/* Cookie Consent Banner */}
        <CookieConsent />
        {/* Analytics Scripts — only loads after consent */}
        <Analytics />
      </body>
    </html>
  );
}
