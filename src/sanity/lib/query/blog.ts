import { groq } from "next-sanity";

// Requête pour récupérer tous les articles de blog (version préview)
export const blogPostsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author,
    publishedAt,
    tags
  }
`;

// Requête pour récupérer un article spécifique par slug
export const blogPostBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author,
    publishedAt,
    tags,
    seo
  }
`;

// Requête pour récupérer les articles récents (limite)
export const recentBlogPostsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author,
    publishedAt,
    tags
  }
`;

// Requête pour récupérer les articles par tag
export const blogPostsByTagQuery = groq`
  *[_type == "blog" && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author,
    publishedAt,
    tags
  }
`;

// Requête pour récupérer tous les tags uniques
export const blogTagsQuery = groq`
  array::unique(*[_type == "blog"].tags[])
`;
