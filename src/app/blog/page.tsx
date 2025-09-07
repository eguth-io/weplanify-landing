import Image from "next/image";
import Link from "next/link";
import BlogSearch from "@/components/BlogSearch";
import Nav from "@/components/Nav";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery } from "@/sanity/lib/query";
import { NavType } from "@/sanity/lib/type";

// Données factices pour le blog
const fakeBlogPosts = [
  {
    id: "1",
    title: "10 conseils pour organiser un voyage en groupe parfait",
    slug: "conseils-voyage-groupe",
    excerpt: "Découvrez nos meilleures astuces pour planifier et organiser un voyage en groupe sans stress. De la coordination des dates à la gestion du budget, apprenez à créer des souvenirs inoubliables.",
    author: "Marie Dubois",
    publishedAt: "2024-01-15",
    image: "/planes.png",
    tags: ["voyage", "groupe", "conseils", "organisation"]
  },
  {
    id: "2", 
    title: "Comment choisir la destination idéale pour vos vacances",
    slug: "choisir-destination-vacances",
    excerpt: "Trouvez la destination parfaite selon vos envies, votre budget et vos contraintes de temps. Notre guide complet vous aide à faire le bon choix.",
    author: "Jean Martin",
    publishedAt: "2024-01-10",
    image: "/planesMobile.png",
    tags: ["destination", "vacances", "planification", "conseils"]
  },
  {
    id: "3",
    title: "Budget voyage : comment économiser sans se priver",
    slug: "budget-voyage-economiser",
    excerpt: "Nos astuces pour voyager moins cher tout en profitant pleinement de votre séjour. Découvrez les secrets des voyageurs expérimentés.",
    author: "Sophie Laurent",
    publishedAt: "2024-01-05",
    image: "/planes.png",
    tags: ["budget", "économie", "voyage", "astuces"]
  },
  {
    id: "4",
    title: "Les meilleures applications pour planifier vos voyages",
    slug: "meilleures-apps-voyage",
    excerpt: "Découvrez notre sélection des applications indispensables pour organiser, réserver et profiter de vos voyages en toute simplicité.",
    author: "Thomas Petit",
    publishedAt: "2024-01-01",
    image: "/planesMobile.png",
    tags: ["applications", "technologie", "voyage", "outils"]
  },
  {
    id: "5",
    title: "Voyage solo : conseils pour partir en toute sécurité",
    slug: "voyage-solo-securite",
    excerpt: "Partir seul en voyage peut être une expérience enrichissante. Nos conseils pour voyager en solo en toute sécurité et confiance.",
    author: "Emma Rousseau",
    publishedAt: "2023-12-28",
    image: "/planes.png",
    tags: ["solo", "sécurité", "voyage", "conseils"]
  },
  {
    id: "6",
    title: "Comment préparer sa valise pour un voyage longue durée",
    slug: "preparer-valise-longue-duree",
    excerpt: "Préparer sa valise pour un voyage de plusieurs semaines ou mois nécessite une organisation particulière. Nos conseils pratiques.",
    author: "Lucas Moreau",
    publishedAt: "2023-12-20",
    image: "/planesMobile.png",
    tags: ["valise", "préparation", "longue durée", "organisation"]
  }
];

export default async function BlogPage() {
  const navData: NavType = await sanityFetch({
    query: navQuery,
    tags: ["nav"],
  });

  return (
    <div className="min-h-screen bg-[#FFFCFB]">
      <Nav navData={navData} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#F6391A] to-[#FF6B35] pt-[100px] lg:pt-[150px] pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-4">
            Notre Blog Voyage
          </h1>
          <p className="text-xl text-white/90">
            Découvrez nos conseils, astuces et actualités pour planifier vos voyages parfaitement
          </p>
        </div>
      </section>

      {/* Search Section */}
      <BlogSearch />

      {/* Articles Section */}
      <section className="py-16 bg-[#FFFCFB]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fakeBlogPosts.map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>Par {article.author}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                    </time>
                  </div>
                  
                  <h2 className="text-xl font-unbounded font-semibold mb-3 line-clamp-2">
                    <Link 
                      href={`/blog/${article.slug}`}
                      className="hover:text-[#F6391A] transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-[#F6391A]/10 text-[#F6391A] text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center text-[#F6391A] hover:text-[#FF6B35] font-medium transition-colors"
                  >
                    Lire la suite
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}