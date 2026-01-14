// ============================================
// SEO Types
// ============================================

export interface SectionSEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface SeoSettings {
  // General SEO
  siteName: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
  language: string;

  // Open Graph / Social
  ogImage: string;
  ogType: "website" | "article";
  twitterCard: "summary" | "summary_large_image" | "app";
  twitterHandle?: string;
  facebookAppId?: string;

  // Structured Data
  organizationName: string;
  organizationLogo: string;
  organizationUrl: string;
  organizationSocialLinks: Array<{
    platform: string;
    url: string;
  }>;
  contactEmail?: string;
  contactPhone?: string;

  // Technical SEO
  siteUrl: string;
  robotsSettings: {
    allowIndexing: boolean;
    customRobotsTxt?: string;
  };
  favicon?: string;
  appleTouchIcon?: string;
  manifest?: {
    themeColor: string;
    backgroundColor: string;
  };

  // Analytics & Tracking
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  hotjarId?: string;
  microsoftClarityId?: string;
}

// ============================================
// Navigation Types
// ============================================

export interface Navigation {
  logo: string;
  navigationLinks: Array<{
    label: string;
    linkType: "page" | "anchor";
    url?: string;
    anchorId?: string;
    isExternal?: boolean;
    openInNewTab?: boolean;
  }>;
  ctaButton: {
    text: string;
    url: string;
    style: "primary" | "secondary" | "light";
    icon: boolean;
  };
  mobileMenuLabel: string;
  headerSchema?: {
    enableSchema: boolean;
  };
}

// Type simplifié pour le composant Nav
export interface NavType {
  logo: string;
  logoMobile?: string;
  connexionLink?: string;
  ctaButton: string;
  ctaLink: string;
}

// ============================================
// Footer Types
// ============================================

export interface Footer {
  logo?: string;
  tagline?: string;
  companyDescription?: string;
  footerColumns: Array<{
    title: string;
    links: Array<{
      label: string;
      url: string;
      isExternal: boolean;
    }>;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
    ariaLabel: string;
  }>;
  ctaSection?: {
    showCta: boolean;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  copyrightText: string;
  legalLinks: Array<{
    label: string;
    url: string;
  }>;
  additionalLegalText?: string;
}

// ============================================
// Landing Page Types
// ============================================

export interface LandingPage {
  // Hero Section
  hero: {
    affiliateTag: string;
    title: string;
    description: string;
    ctaText: string;
    ctaUrl: string;
    backgroundImage: string;
    seo?: SectionSEO;
  };

  // Testimonial & Stats
  testimonialStats: {
    featuredTestimonials: Array<{
      quote: string;
      author: string;
      authorRole?: string;
    }>;
    statsTitle: string;
    stats: Array<{
      value: string;
      label: string;
      showStar: boolean;
    }>;
    seo?: SectionSEO;
  };

  // World Section
  worldSection: {
    title: string;
    description: string;
    ctaText: string;
    ctaUrl: string;
    images: Array<{
      url: string;
      alt?: string;
      caption?: string;
    }>;
    seo?: SectionSEO;
  };

  // Scrolling Banner
  banner: {
    items: string[];
    backgroundColor?: string;
    textColor?: string;
  };

  // Features
  features: {
    stackingCardsTitle: string;
    stackingCards: Array<{
      imagePosition: "left" | "right";
      title: string;
      description: string;
      image: string;
      imageAlt?: string;
      backgroundColor: string;
      ctaLabel?: string;
      ctaUrl?: string;
      ctaTextColor?: string;
      ctaBackgroundColor?: string;
      stats?: Array<{
        value: string;
        label: string;
      }>;
    }>;
    seo?: SectionSEO;
  };

  // Travel Steps (3 Cards Section)
  travelSteps: {
    title: string;
    description: string;
    badge: string;
    card1: {
      title: string;
      description: string;
      durationValue: string;
      durationLabel: string;
    };
    card2: {
      image: string;
    };
    card3: {
      title: string;
      description: string;
      statValue: string;
      statLabel: string;
    };
    seo?: SectionSEO;
  };

  // Testimonials
  testimonials: {
    list: Array<{
      quote: string;
      author: string;
      role: string;
      image: string;
    }>;
    seo?: SectionSEO;
  };

  // Feature Image Section
  featureImageSection: {
    title: string;
    image: string;
    seo?: SectionSEO;
  };

  // CTA Banner
  ctaBanner: {
    titlePart1?: string;
    titlePart2?: string;
    titlePart3?: string;
    titlePart4?: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    backgroundImage: string;
  };

  // Ready Banner
  readyBanner: {
    title: string;
    description?: string;
    badges?: Array<{
      emoji: string;
      text: string;
      backgroundColor: string;
      textColor: string;
      position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    }>;
    buttonText: string;
    buttonUrl: string;
  };

  // FAQ
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
    seo?: SectionSEO;
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  readTime: string;
  content: string;
  heroImage: string;
  publishedAt: string;
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  relatedArticles?: BlogPostPreview[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface BlogPostPreview {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  readTime: string;
  heroImage: string;
  publishedAt: string;
  author?: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

// Type aliases for backward compatibility
export type FooterType = Footer;
export type CtaType = LandingPage["ctaBanner"];
export type FAQType = LandingPage["faq"];
export type Home = LandingPage;

// IA type - placeholder for AI section
export interface IA {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  placeholder?: string;
  button?: string;
}

// Features and Logiciel types
export type Features = LandingPage["features"];
export interface Logiciel {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

// Organization type
export interface Organization {
  name?: string;
  logo?: string;
  logoAlt?: string;
  title?: unknown;
  description?: unknown;
  featuresList?: unknown;
  clientImage?: string;
  clientText?: string;
  ctaButton?: string;
  ctaLink?: string;
}
