/**
 * Site chrome and SEO defaults, formerly served by Sanity (WP-140).
 *
 * The CMS held 23 documents but the code only ever read four things from it:
 * the nav logo, four footer fields, the SEO settings, and an FAQ document type
 * that never existed. Everything else — the menu, the footer columns, the home
 * and feature copy — is hardcoded or comes from the i18n catalogue, so the
 * `landingPage` (2), `featurePage` (16) and `footerColumns` payloads were
 * fetched and never rendered.
 *
 * Values below are the Sanity content verbatim, with two deliberate fixes:
 * the dataset only had `en` and `fr`, so the six other locales silently fell
 * back to null (no footer logo, no CTA, English copyright). They now get real
 * copy, and the logo is served from `public/` instead of the Sanity CDN.
 */

export type SocialPlatform = "tiktok" | "twitter" | "youtube";

export type FooterContent = {
  logo: string;
  logoAlt: string;
  copyrightText: string;
  ctaSection: {
    showCta: boolean;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
};

const LOGO = "/logo-wordmark.svg";
const APP_URL = "https://app.weplanify.com/";

/** The nav only ever read `logo` off the CMS document; the menu is i18n-driven. */
export const NAV_CONTENT = { logo: LOGO, logoAlt: "WePlanify" } as const;

const FOOTER_BY_LOCALE: Record<string, Omit<FooterContent, "logo" | "logoAlt">> = {
  en: {
    copyrightText: "© 2026 WePlanify. All rights reserved.",
    ctaSection: {
      showCta: true,
      title: "Join the adventure!",
      description: "Help us build the best way to travel together.",
      buttonText: "Start my trip",
      buttonUrl: APP_URL,
    },
  },
  fr: {
    copyrightText: "© 2026 WePlanify. Tous droits réservés.",
    ctaSection: {
      showCta: true,
      title: "Rejoignez l'aventure !",
      description: "Aidez-nous à construire la meilleure façon de voyager ensemble.",
      buttonText: "Démarrer mon voyage",
      buttonUrl: APP_URL,
    },
  },
  es: {
    copyrightText: "© 2026 WePlanify. Todos los derechos reservados.",
    ctaSection: {
      showCta: true,
      title: "¡Únete a la aventura!",
      description: "Ayúdanos a construir la mejor forma de viajar juntos.",
      buttonText: "Empezar mi viaje",
      buttonUrl: APP_URL,
    },
  },
  it: {
    copyrightText: "© 2026 WePlanify. Tutti i diritti riservati.",
    ctaSection: {
      showCta: true,
      title: "Unisciti all'avventura!",
      description: "Aiutaci a costruire il modo migliore di viaggiare insieme.",
      buttonText: "Inizia il mio viaggio",
      buttonUrl: APP_URL,
    },
  },
  de: {
    copyrightText: "© 2026 WePlanify. Alle Rechte vorbehalten.",
    ctaSection: {
      showCta: true,
      title: "Mach mit beim Abenteuer!",
      description: "Hilf uns, den besten Weg zu bauen, gemeinsam zu reisen.",
      buttonText: "Meine Reise starten",
      buttonUrl: APP_URL,
    },
  },
  pt: {
    copyrightText: "© 2026 WePlanify. Todos os direitos reservados.",
    ctaSection: {
      showCta: true,
      title: "Junte-se à aventura!",
      description: "Ajude-nos a construir a melhor forma de viajar em conjunto.",
      buttonText: "Começar a minha viagem",
      buttonUrl: APP_URL,
    },
  },
  pl: {
    copyrightText: "© 2026 WePlanify. Wszelkie prawa zastrzeżone.",
    ctaSection: {
      showCta: true,
      title: "Dołącz do przygody!",
      description: "Pomóż nam zbudować najlepszy sposób na wspólne podróżowanie.",
      buttonText: "Zacznij moją podróż",
      buttonUrl: APP_URL,
    },
  },
  zh: {
    copyrightText: "© 2026 WePlanify. 保留所有权利。",
    ctaSection: {
      showCta: true,
      title: "加入这场冒险！",
      description: "和我们一起打造更好的结伴旅行方式。",
      buttonText: "开始我的旅行",
      buttonUrl: APP_URL,
    },
  },
};

export function getFooterContent(locale: string): FooterContent {
  const base = FOOTER_BY_LOCALE[locale] ?? FOOTER_BY_LOCALE.en;
  return { logo: LOGO, logoAlt: "WePlanify", ...base };
}

/**
 * Formerly the `seoSettings` singleton. Only the fields the code actually read
 * are kept; the CMS document also carried analytics ids, a favicon and an OG
 * image that were all null.
 */
export const SEO_SETTINGS = {
  siteName: "WePlanify",
  defaultTitle: "WePlanify — Free Group Trip Planner",
  defaultDescription:
    "Plan group trips together with WePlanify. Collaborative itinerary builder, shared budget tracker, group polls and packing lists. Free group travel planning app.",
  siteUrl: "https://www.weplanify.com",
  organizationName: "WePlanify",
  organizationUrl: "https://www.weplanify.com",
  organizationLogo: "https://www.weplanify.com/logo.webp",
  ogType: "website",
  ogImage: "",
  twitterCard: "summary_large_image",
  /** Never set in the CMS either; kept so callers can stay unchanged. */
  twitterHandle: undefined as string | undefined,
  organizationSocialLinks: [] as { platform: string; url: string }[],
  contactEmail: "support@weplanify.com",
  contactPhone: undefined as string | undefined,
  keywords: [
    "group trip planner",
    "plan trip with friends",
    "collaborative travel app",
    "group travel itinerary",
    "travel planning app",
    "group vacation planner",
    "shared trip planner",
    "trip planner for groups",
  ],
  language: "en",
  robotsSettings: { allowIndexing: true },
  manifest: { themeColor: "#f6391a", backgroundColor: "#ffffff" },
} as const;
