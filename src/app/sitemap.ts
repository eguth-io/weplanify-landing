import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { blogPostsQuery } from '@/sanity/lib/query'
import { BlogPostPreview } from '@/sanity/lib/type'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://weplanify.com'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  ]

  try {
    const blogPosts: BlogPostPreview[] = await sanityFetch({
      query: blogPostsQuery,
      tags: ["blogPost"],
    })

    const blogPages = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    return staticPages
  }
}
