import { PortableTextBlock } from "@portabletext/types";

interface ContentBlock {
  tooltip: string;
  image: string;
  text: PortableTextBlock[];
  link: string;
}

export interface Home {
  subtitle: string;
  subtitleMobile: string;
  title: PortableTextBlock[];
  titleMobile: PortableTextBlock[];
  title2: PortableTextBlock[];
  description: PortableTextBlock[];
  buttonDemo: string;
  blocks: ContentBlock[];
}

export type NavType = {
  logo: string;
  logoMobile: string;
  connexionLink: string;
  ctaButton: string;
  ctaLink: string;
};

export type CtaType = {
  ctaButton: string;
  ctaLink: string;
};

export interface Features {
  title: string;
  description: PortableTextBlock[];
  featuresList: {
    title: string;
    description: PortableTextBlock[];
    icon: string;
    imageMobile: string;
    imageDesktop: string;
  }[];
}

export interface Organization {
  title: PortableTextBlock[];
  description: PortableTextBlock[];
  featuresList: OrganizationData[];
  clientImage: string;
  clientText: string;
}

export interface OrganizationData {
  icon: string;
  title: string;
  description: PortableTextBlock[];
  image: string;
}

export interface IA {
  title: string;
  placeholder: string;
  image: string;
}

export interface Trip {
  firstName: string;
  profileImage: string;
  tripImage: string;
  description: PortableTextBlock[];
}

export interface TripsType {
  title: PortableTextBlock;
  tripsList: Trip[];
}

export interface Logiciel {
  title: PortableTextBlock[];
  image: string;
}

export interface Testimonial {
  description: PortableTextBlock[];
  name: string;
  profileImage: string;
}

export interface AvisType {
  title: PortableTextBlock[];
  testimonials: Testimonial[];
}

export interface FAQItem {
  question: string;
  answer: PortableTextBlock[];
}

export interface FAQType {
  title: PortableTextBlock[];
  questions: FAQItem[];
}

export interface FooterType {
  title: PortableTextBlock[];
  subtitle: PortableTextBlock[];
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
