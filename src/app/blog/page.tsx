import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery } from "@/sanity/lib/query";
import { NavType } from "@/sanity/lib/type";
import Link from "next/link";

export default async function BlogPage() {
  const navData: NavType = await sanityFetch({
    query: navQuery,
    tags: ["nav"],
  });

  // Article récupéré depuis Sanity (simulé)
  const heroArticle = {
    title: "Pourquoi une application de voyage comme WePlanify est bien plus efficace que vos outils habituels ?",
    author: "Valentine Hamon",
    date: "14 Septembre 2025",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    slug: "pourquoi-weplanify-est-plus-efficace"
  };

  return (
    <>
      <Nav navData={navData} />
      <main className="min-h-screen">
        {/* Hero Article Section */}
        <section className="pt-4 pb-2 lg:pt-6 lg:pb-2">
          <div className="container mx-auto px-4 lg:px-8">
            <Link href={`/blog/${heroArticle.slug}`} className="block">
              <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${heroArticle.heroImage}')`
                  }}
                ></div>

                <div className="relative z-20 h-full flex flex-col justify-end p-6 lg:p-12">
                  <h1 className="text-white text-2xl lg:text-4xl font-bold mb-4 max-w-3xl">
                    {heroArticle.title}
                  </h1>
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <span className="font-medium text-white">{heroArticle.author}</span>
                    <span className="text-white">{heroArticle.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

      </main>
      <Footer variant="blog" />
    </>
  );
}