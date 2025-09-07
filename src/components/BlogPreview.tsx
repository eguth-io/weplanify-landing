import Image from "next/image";
import Link from "next/link";

// Données factices pour le blog
const fakeBlogPosts = [
  {
    id: "1",
    title: "10 conseils pour organiser un voyage en groupe parfait",
    slug: "conseils-voyage-groupe",
    excerpt: "Découvrez nos meilleures astuces pour planifier et organiser un voyage en groupe sans stress.",
    author: "Marie Dubois",
    publishedAt: "2024-01-15",
    image: "/planes.png",
    tags: ["voyage", "groupe", "conseils"]
  },
  {
    id: "2", 
    title: "Comment choisir la destination idéale pour vos vacances",
    slug: "choisir-destination-vacances",
    excerpt: "Trouvez la destination parfaite selon vos envies, votre budget et vos contraintes de temps.",
    author: "Jean Martin",
    publishedAt: "2024-01-10",
    image: "/planesMobile.png",
    tags: ["destination", "vacances", "planification"]
  },
  {
    id: "3",
    title: "Budget voyage : comment économiser sans se priver",
    slug: "budget-voyage-economiser",
    excerpt: "Nos astuces pour voyager moins cher tout en profitant pleinement de votre séjour.",
    author: "Sophie Laurent",
    publishedAt: "2024-01-05",
    image: "/planes.png",
    tags: ["budget", "économie", "voyage"]
  }
];

export default function BlogPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Derniers articles du blog
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fakeBlogPosts.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>Par {article.author}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                  </time>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
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
        
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </section>
  );
}