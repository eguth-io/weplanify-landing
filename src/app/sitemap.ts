import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { blogPostsQuery } from '@/sanity/lib/query'
import { BlogPostPreview } from '@/sanity/lib/type'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.weplanify.com'
  const locales = ['fr', 'en']
  
  const staticRoutes = ['', '/blog', '/contact', '/faq']
  const staticPages: MetadataRoute.Sitemap = []
  
  // Generate static pages for each locale
  locales.forEach(locale => {
    staticRoutes.forEach(route => {
      const url = locale === 'fr' 
        ? `${baseUrl}${route}` 
        : `${baseUrl}/${locale}${route}`
      
      staticPages.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/blog' ? 'weekly' as const : 'monthly' as const,
        priority: route === '' ? 1 : route === '/blog' ? 0.8 : 0.6,
        alternates: {
          languages: {
            'fr': locale === 'fr' ? url : `${baseUrl}${route}`,
            'en': locale === 'en' ? url : `${baseUrl}/en${route}`,
          }
        }
      })
    })
  })

  try {
    const blogPosts: BlogPostPreview[] = await sanityFetch({
      query: blogPostsQuery,
      tags: ["blogPost"],
    })

    const blogPages: MetadataRoute.Sitemap = []
    
    // Generate blog pages for each locale
    locales.forEach(locale => {
      blogPosts.forEach(post => {
        const url = locale === 'fr' 
          ? `${baseUrl}/blog/${post.slug.current}` 
          : `${baseUrl}/${locale}/blog/${post.slug.current}`
        
        blogPages.push({
          url,
          lastModified: new Date(post.publishedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
          alternates: {
            languages: {
              'fr': locale === 'fr' ? url : `${baseUrl}/blog/${post.slug.current}`,
              'en': locale === 'en' ? url : `${baseUrl}/en/blog/${post.slug.current}`,
            }
          }
        })
      })
    })

    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    return staticPages
  }
}
