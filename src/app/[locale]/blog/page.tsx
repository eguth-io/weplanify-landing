import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
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
                      <Image 
                        src={heroArticle.author.avatar} 
                        alt={`${heroArticle.author?.firstName || ''} ${heroArticle.author?.lastName || ''}`}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
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
          <section className="py-4 lg:py-6">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {similarArticles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
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