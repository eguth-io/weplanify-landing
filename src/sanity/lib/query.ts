import { groq } from "next-sanity";

// ============================================
// SEO Settings Query
// ============================================
export const seoSettingsQuery = groq`
  *[_type == "seoSettings"][0] {
    siteName,
    defaultTitle,
    titleTemplate,
    defaultDescription,
    keywords,
    language,
    "ogImage": ogImage.asset->url,
    ogType,
    twitterCard,
    twitterHandle,
    facebookAppId,
    organizationName,
    "organizationLogo": organizationLogo.asset->url,
    organizationUrl,
    organizationSocialLinks[] {
      platform,
      url
    },
    contactEmail,
    contactPhone,
    siteUrl,
    robotsSettings {
      allowIndexing,
      customRobotsTxt
    },
    "favicon": favicon.asset->url,
    "appleTouchIcon": appleTouchIcon.asset->url,
    manifest {
      themeColor,
      backgroundColor
    },
    googleAnalyticsId,
    googleTagManagerId,
    facebookPixelId,
    hotjarId,
    microsoftClarityId
  }
`;

// ============================================
// Navigation Query
// ============================================
export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    "logo": logo.asset->url,
    "logoAlt": logo.alt,
    navigationLinks[] {
      label,
      url,
      isExternal,
      openInNewTab
    },
    ctaButton {
      text,
      url,
      style,
      icon
    },
    mobileMenuLabel,
    headerSchema {
      enableSchema
    }
  }
`;

// Alias for backward compatibility
export const navQuery = navigationQuery;

// ============================================
// Footer Query
// ============================================
export const footerQuery = groq`
  *[_type == "footer"][0] {
    "logo": logo.asset->url,
    "logoAlt": logo.alt,
    tagline,
    companyDescription,
    footerColumns[] {
      title,
      links[] {
        label,
        url,
        isExternal
      }
    },
    socialLinks[] {
      platform,
      url,
      ariaLabel
    },
    ctaSection {
      showCta,
      title,
      description,
      buttonText,
      buttonUrl
    },
    copyrightText,
    legalLinks[] {
      label,
      url
    },
    additionalLegalText
  }
`;

// ============================================
// Landing Page Query
// ============================================
export const landingPageQuery = groq`
  *[_type == "landingPage"][0] {
    // Hero Section
    hero {
      affiliateTag,
      title,
      description,
      ctaText,
      ctaUrl,
      "backgroundImage": backgroundImage.asset->url,
      "backgroundImageAlt": backgroundImage.alt,
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    },

    // Testimonial & Stats
    testimonialStats {
      featuredTestimonials[] {
        quote,
        author,
        authorRole
      },
      statsTitle,
      stats[] {
        value,
        label,
        showStar
      },
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    },

    // World Section
    worldSection {
      title,
      description,
      ctaText,
      ctaUrl,
      "images": images[] {
        "url": asset->url,
        alt,
        caption
      },
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    },

    // Scrolling Banner
    banner {
      items,
      backgroundColor,
      textColor
    },

    // Features
    features {
      stackingCardsTitle,
      stackingCards[] {
        imagePosition,
        title,
        description,
        "image": image.asset->url,
        "imageAlt": image.alt,
        backgroundColor,
        ctaLabel,
        ctaTextColor,
        ctaBackgroundColor,
        stats[] {
          value,
          label
        }
      },
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    },

    // Travel Steps
    travelSteps {
      title,
      description,
      badge,
      card1 {
        title,
        description,
        durationValue,
        durationLabel
      },
      card2 {
        "image": image.asset->url,
        "imageAlt": image.alt
      },
      card3 {
        title,
        description,
        statValue,
        statLabel
      },
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    },

    // Testimonials
    testimonials {
      list[] {
        quote,
        author,
        role,
        "image": image.asset->url,
        "imageAlt": image.alt
      },
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    },

    // Feature Image Section
    featureImageSection {
      title,
      "image": image.asset->url,
      "imageAlt": image.alt,
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    },

    // CTA Banner
    ctaBanner {
      titlePart1,
      titlePart2,
      titlePart3,
      titlePart4,
      description,
      buttonText,
      buttonUrl,
      "backgroundImage": backgroundImage.asset->url,
      "backgroundImageAlt": backgroundImage.alt
    },

    // Ready Banner
    readyBanner {
      title,
      description,
      badges[] {
        emoji,
        text,
        backgroundColor,
        textColor,
        position
      },
      buttonText,
      buttonUrl
    },

    // FAQ
    faq {
      title,
      items[] {
        question,
        answer
      },
      seo {
        title,
        description,
        keywords,
        "ogImage": ogImage.asset->url
      }
    }
  }
`;

// ============================================
// Blog Post Query (Single)
// ============================================
export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readTime,
    content,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    publishedAt,
    author->{
      name,
      "image": image.asset->url,
      "imageAlt": image.alt,
      bio
    },
    relatedArticles[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      readTime,
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      publishedAt
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

// ============================================
// Blog Posts Query (List)
// ============================================
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readTime,
    "heroImage": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    publishedAt,
    author->{
      name,
      "image": image.asset->url
    }
  }
`;

// ============================================
// FAQ Query
// ============================================
export const faqQuery = groq`
  *[_type == "landingPage"][0] {
    faq {
      title,
      items[] {
        question,
        answer
      }
    }
  }
`;

// ============================================
// CTA Query
// ============================================
export const ctaQuery = groq`
  *[_type == "landingPage"][0] {
    ctaBanner {
      titlePart1,
      titlePart2,
      titlePart3,
      titlePart4,
      description,
      buttonText,
      buttonUrl,
      "backgroundImage": backgroundImage.asset->url,
      "backgroundImageAlt": backgroundImage.alt
    }
  }
`;
