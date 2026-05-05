import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, blogPostsQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, BlogPostPreview, Footer as FooterType } from "@/sanity/lib/type";
import Link from "next/link";
import { setRequestLocale } from 'next-intl/server';
import { generateMetadataFromSanity } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, "/blog");
  return {
    ...metadata,
    title: locale === "fr" ? "Blog — Conseils Voyage de Groupe" : "Blog — Group Travel Tips",
    description:
      locale === "fr"
        ? "Decouvrez nos articles et conseils pour organiser des voyages de groupe inoubliables. Astuces, destinations et guides pratiques."
        : "Discover articles and tips for organizing unforgettable group trips. Travel hacks, destinations and practical guides.",
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [navData, navigationData, sanityPosts, footerData]: [NavType, Navigation | null, BlogPostPreview[], FooterType | null] = await Promise.all([
    sanityFetch<NavType>({
      query: navQuery,
      params: { locale },
      tags: ["nav"],
    }),
    sanityFetch<Navigation>({
      query: navigationQuery,
      params: { locale },
      tags: ["navigation"],
    }),
    sanityFetch<BlogPostPreview[]>({
      query: blogPostsQuery,
      tags: ["blogPost"],
    }),
    sanityFetch<FooterType>({
      query: footerQuery,
      params: { locale },
      tags: ["footer"],
    }),
  ]);

  // Hardcoded long-form articles that live as static routes outside Sanity.
  // They were invisible on /blog because the listing only queried the CMS;
  // we surface them inline so /blog reflects the full content catalog.
  const staticPosts: BlogPostPreview[] = locale === "fr"
    ? [
        {
          _id: "static-meilleures-applications-voyage-groupe",
          title: "Top 6 applications de voyage de groupe en 2026 — comparatif honnête",
          slug: { current: "meilleures-applications-voyage-groupe" },
          excerpt: "Nous avons testé 6 applications de planification de voyage de groupe. Comparatif côte à côte : prix, fonctionnalités, points forts, faiblesses. Choisissez la bonne en 2 minutes.",
          readTime: "12 min",
          heroImage: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1200",
          publishedAt: "2026-04-15",
          author: { _id: "alex", firstName: "Alex", lastName: "Martin" },
        },
        {
          _id: "static-organiser-evjf",
          title: "Comment organiser un EVJF inoubliable — guide complet 2026",
          slug: { current: "organiser-evjf" },
          excerpt: "Du choix de la destination à la coordination du groupe : tout ce qu'il faut savoir pour organiser un enterrement de vie de jeune fille mémorable, sans stress.",
          readTime: "14 min",
          heroImage: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1200",
          publishedAt: "2026-04-15",
          author: { _id: "alex", firstName: "Alex", lastName: "Martin" },
        },
        {
          _id: "static-group-trip-budget",
          title: "Budget voyage de groupe — comment partager les frais sans drama",
          slug: { current: "group-trip-budget" },
          excerpt: "Établir un budget réaliste, répartir équitablement, suivre les dépenses en temps réel et solder proprement à la fin du voyage.",
          readTime: "11 min",
          heroImage: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1200",
          publishedAt: "2026-04-15",
          author: { _id: "alex", firstName: "Alex", lastName: "Martin" },
        },
      ]
    : [
        {
          _id: "static-meilleures-applications-voyage-groupe",
          title: "Top 6 Group Trip Planner Apps 2026 — Honest Comparison",
          slug: { current: "meilleures-applications-voyage-groupe" },
          excerpt: "We tested 6 group trip planner apps (WePlanify, Wanderlog, TripIt, Splitwise…). Side-by-side comparison: pricing, features, pros & cons. Pick the right one in 2 minutes.",
          readTime: "12 min",
          heroImage: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1200",
          publishedAt: "2026-04-15",
          author: { _id: "alex", firstName: "Alex", lastName: "Martin" },
        },
        {
          _id: "static-organiser-evjf",
          title: "How to Organize an Unforgettable Bachelorette Trip — 2026 Guide",
          slug: { current: "organiser-evjf" },
          excerpt: "From picking the destination to coordinating the group: everything you need to organize a memorable bachelorette trip, stress-free.",
          readTime: "14 min",
          heroImage: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1200",
          publishedAt: "2026-04-15",
          author: { _id: "alex", firstName: "Alex", lastName: "Martin" },
        },
        {
          _id: "static-group-trip-budget",
          title: "Group Trip Budget — How to Split Costs Without Drama",
          slug: { current: "group-trip-budget" },
          excerpt: "Set a realistic budget, split costs fairly, track expenses in real time, and settle up cleanly when the trip is over.",
          readTime: "11 min",
          heroImage: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1200",
          publishedAt: "2026-04-15",
          author: { _id: "alex", firstName: "Alex", lastName: "Martin" },
        },
      ];

  // Merge Sanity posts with static ones, dedupe on slug, sort by publishedAt desc.
  const seenSlugs = new Set<string>();
  const blogPosts = [...sanityPosts, ...staticPosts]
    .filter((post) => {
      const slug = post.slug?.current;
      if (!slug || seenSlugs.has(slug)) return false;
      seenSlugs.add(slug);
      return true;
    })
    .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

  // First article as hero article
  const heroArticle = blogPosts[0];

  // Similar articles (excluding hero)
  const similarArticles = blogPosts.slice(1, 4); // Take next 3

  if (!heroArticle) {
    return (
      <>
        <Nav navData={navData} navigationData={navigationData} />
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
        <Footer footerData={footerData} />
      </>
    );
  }

  return (
    <>
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen">
        {/* Hero Article Section */}
        <section className="pt-4 pb-2 lg:pt-6 lg:pb-2">
          <div className="container mx-auto px-4 lg:px-8">
            <Link href={`/${locale}/blog/${heroArticle.slug?.current || '#'}`} className="block">
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
                    <span className="text-white">{new Date(heroArticle.publishedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}</span>
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
                  <ArticleCard key={article._id} article={article} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer footerData={footerData} />
    </>
  );
}