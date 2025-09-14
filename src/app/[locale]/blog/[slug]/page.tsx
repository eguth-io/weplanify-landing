import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RelatedArticles from "@/components/RelatedArticles";
import CTASection from "@/components/CTASection";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, blogPostQuery, footerQuery, ctaQuery } from "@/sanity/lib/query";
import { NavType, BlogPost, FooterType, CtaType } from "@/sanity/lib/type";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  const [navData, article, footerData, ctaData] = await Promise.all([
    sanityFetch({
      query: navQuery,
      tags: ["nav"],
    }) as Promise<NavType>,
    sanityFetch({
      query: blogPostQuery,
      params: { slug },
      tags: ["blogPost"],
    }) as Promise<BlogPost | null>,
    sanityFetch({
      query: footerQuery,
      tags: ["footer"],
    }) as Promise<FooterType>,
    sanityFetch({
      query: ctaQuery,
      tags: ["nav"],
    }) as Promise<CtaType>,
  ]);

  if (!article) {
    return (
      <>
        <Nav navData={navData} />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-4">
                404
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
                Article non trouvé
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Cet article n&apos;existe pas encore.
              </p>
            </div>
          </div>
        </main>
        <Footer variant="home" />
      </>
    );
  }

  return (
    <>
      <Nav navData={navData} />
      <main className="min-h-screen">
        <article className="max-w-7xl mx-auto px-[30px] lg:px-[70px] py-8 lg:py-12">
          <div className="hidden lg:block">
            <Breadcrumb
              items={[
                { label: "Blog", href: "/blog" },
                { label: article.title }
              ]}
            />
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mb-4 lg:mb-6">
            {article.author?.avatar ? (
              <Image 
                src={article.author.avatar} 
                alt={`${article.author?.firstName || ''} ${article.author?.lastName || ''}`}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            )}
            <div>
              <span className="font-medium text-gray-900">
                {article.author ? `${article.author.firstName} ${article.author.lastName}` : 'Auteur inconnu'}
              </span>
              <span className="text-gray-500 mx-2">•</span>
              <span className="text-gray-500">{new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric"
              }).replace(/^\w/, c => c.toUpperCase()).replace(/(\d+) (\w+)/, '$1 $2,')}</span>
              <span className="text-gray-500 mx-2">•</span>
              <span className="text-gray-500">{article.readTime}</span>
            </div>
          </div>

          <div className="mb-8 lg:mb-12">
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-[10px]">
              <div className="absolute inset-0 z-10"></div>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${article.heroImage}')`
                }}
              ></div>
            </div>
          </div>

          <div className="mb-4 lg:mb-6">
            <div 
              className="max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-gray-900 [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
          </div>
        </article>

        {/* Articles similaires */}
        <RelatedArticles articles={article.relatedArticles || []} />

        <CTASection footer={footerData} ctaData={ctaData} />

      </main>
      <Footer variant="home" />
    </>
  );
}