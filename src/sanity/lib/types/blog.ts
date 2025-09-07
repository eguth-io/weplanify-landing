import { PortableTextBlock } from "@portabletext/react";

export interface BlogPost {
  _id: string;
  _type: "blog";
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: PortableTextBlock[];
  featuredImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  author: string;
  publishedAt: string;
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogPostPreview {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  featuredImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  author: string;
  publishedAt: string;
  tags?: string[];
}
