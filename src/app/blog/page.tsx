import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, blogPostsQuery } from "@/sanity/lib/query";
import { NavType, BlogPostPreview } from "@/sanity/lib/type";
import Link from "next/link";

export default async function BlogPage() {
  const navData: NavType = await sanityFetch({
    query: navQuery,
    tags: ["nav"],
  });

  const blogPosts: BlogPostPreview[] = await sanityFetch({
    query: blogPostsQuery,
    tags: ["blogPost"],
  });

  // First article as hero article
  const heroArticle = blogPosts[0];
  
  // Similar articles (excluding hero)
  const similarArticles = blogPosts.slice(1, 4); // Take next 3

  if (!heroArticle) {
    return (
      <>
        <Nav navData={navData} />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-4">
                Blog
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
                No articles available
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Blog articles will be available soon.
              </p>
            </div>
          </div>
        </main>
        <Footer variant="blog" />
      </>
    );
  }

  return (
    <>
      <Nav navData={navData} />
      <main className="min-h-screen">
        {/* Hero Article Section */}
        <section className="pt-4 pb-2 lg:pt-6 lg:pb-2">
          <div className="container mx-auto px-4 lg:px-8">
            <Link href={`/blog/${heroArticle.slug.current}`} className="block">
              <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 z-10"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-xl"
                  style={{
                    borderRadius: '10px',
                    backgroundImage: `url('${heroArticle.heroImage}')`
                  }}
                ></div>

                <div 
                  className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-300 z-10 rounded-xl"
                  style={{
                    borderRadius: '10px'
                  }}
                ></div>
                <div className="relative z-20 h-full flex flex-col justify-end p-6 lg:p-12">
                  <h1 className="text-white text-2xl lg:text-4xl font-bold mb-4 max-w-3xl">
                    {heroArticle.title}
                  </h1>
                  <div className="flex items-center gap-3 text-white">
                    {heroArticle.author?.avatar ? (
                      <img 
                        src={heroArticle.author.avatar} 
                        alt={`${heroArticle.author?.firstName || ''} ${heroArticle.author?.lastName || ''}`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    )}
                    <span className="font-medium text-white">
                      {heroArticle.author ? `${heroArticle.author.firstName} ${heroArticle.author.lastName}` : 'Unknown author'}
                    </span>
                    <span className="text-white">{new Date(heroArticle.publishedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }).replace(/^\w/, c => c.toUpperCase()).replace(/(\d+) (\w+)/, '$1 $2,')}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Similar articles */}
        {similarArticles.length > 0 && (
          <section className="py-8 lg:py-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarArticles.map((article) => (
                  <Link 
                    key={article._id} 
                    href={`/blog/${article.slug.current}`} 
                    className="group block"
                  >
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow duration-300">
                      <div className="relative h-48 mx-4 mt-4 overflow-hidden rounded-md" style={{ borderRadius: '6px' }}>
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300 rounded-md"
                          style={{
                            backgroundImage: `url('${article.heroImage}')`,
                            borderRadius: '6px'
                          }}
                        ></div>
                        <div 
                          className="absolute inset-0 bg-black/20 rounded-md group-hover:bg-black/0 transition-colors duration-300"
                          style={{
                            borderRadius: '6px'
                          }}
                        ></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {article.author?.avatar ? (
                              <img 
                                src={article.author.avatar} 
                                alt={`${article.author?.firstName || ''} ${article.author?.lastName || ''}`}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            )}
                            <span className="text-sm text-gray-500">
                              {article.author ? `${article.author.firstName} ${article.author.lastName}` : 'Unknown author'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            }).replace(/^\w/, c => c.toUpperCase()).replace(/(\d+) (\w+)/, '$1 $2,')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer variant="blog" />
    </>
  );
}