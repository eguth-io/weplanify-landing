import type { Metadata } from "next";
import { Raleway, Unbounded } from "next/font/google";
import "./globals.css";
import StructuredData from "./structured-data";

const ralewayFont = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const UnboundedFont = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weplanify - Planifiez, partagez, partez : une seule appli pour tout gérer",
  description: "Weplanify est l'application de planification de voyage qui simplifie l'organisation de vos séjours. Planifiez, partagez et partez en toute simplicité avec une interface intuitive et collaborative.",
  keywords: [
    "planification voyage",
    "organisation séjour",
    "application voyage",
    "planificateur voyage",
    "voyage collaboratif",
    "itinéraire voyage",
    "gestion voyage",
    "planification vacances",
    "organisation vacances",
    "voyage en groupe"
  ],
  authors: [{ name: "Weplanify" }],
  creator: "Weplanify",
  publisher: "Weplanify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://weplanify.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://weplanify.com',
    title: 'Weplanify - Planifiez, partagez, partez : une seule appli pour tout gérer',
    description: 'Weplanify est l\'application de planification de voyage qui simplifie l\'organisation de vos séjours. Planifiez, partagez et partez en toute simplicité.',
    siteName: 'Weplanify',
    images: [
      {
        url: '/logo.png',
        width: 155,
        height: 66,
        alt: 'Logo Weplanify',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weplanify - Planifiez, partagez, partez : une seule appli pour tout gérer',
    description: 'Weplanify est l\'application de planification de voyage qui simplifie l\'organisation de vos séjours.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // À remplacer par votre code de vérification Google
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F6391A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Weplanify" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Weplanify" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <StructuredData />
      </head>
      <body className={`${ralewayFont.variable} ${UnboundedFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
