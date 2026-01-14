// Force dynamic rendering pour éviter le bug de static generation avec Next.js 15 + React 18
// Les pages seront rendues côté serveur mais mises en cache par CDN (Vercel/Cloudflare)
export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Raleway, Unbounded, Londrina_Solid, Karla, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";

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
  weight: ["100", "300", "400", "900"], // Light, Regular, Black (all available weights for Londrina Solid)
});

const karlaFont = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // ExtraLight to ExtraBold
});

const nanumPenFont = Nanum_Pen_Script({
  variable: "--font-nanum-pen",
  subsets: ["latin"],
  weight: ["400"], // Nanum Pen Script only has one weight available
});

// Génère les metadata dynamiquement depuis Sanity
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataFromSanity();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${ralewayFont.variable} ${UnboundedFont.variable} ${londrinaSolidFont.variable} ${karlaFont.variable} ${nanumPenFont.variable}`}>
        {/* Structured Data (Organization & Website Schema) */}
        <StructuredData />

        {children}

        {/* Analytics Scripts (GA4, GTM, etc.) */}
        <Analytics />
      </body>
    </html>
  );
}
