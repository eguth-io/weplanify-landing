import Link from "next/link";

// Données factices pour les articles récents
const recentArticles = [
  {
    id: "1",
    title: "10 conseils pour organiser un voyage en groupe parfait",
    slug: "conseils-voyage-groupe",
    publishedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Comment choisir la destination idéale pour vos vacances",
    slug: "choisir-destination-vacances",
    publishedAt: "2024-01-10"
  },
  {
    id: "3",
    title: "Budget voyage : comment économiser sans se priver",
    slug: "budget-voyage-economiser",
    publishedAt: "2024-01-05"
  }
];

export default function RecentBlogPosts() {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-black font-medium mb-4">Blog</p>
      <div className="space-y-3">
        {recentArticles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.slug}`}
            className="block group"
          >
            <h4 className="text-black/75 text-sm group-hover:text-orange-600 transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
            </p>
          </Link>
        ))}
        <Link 
          href="/blog"
          className="text-orange-600 text-sm hover:text-orange-700 transition-colors"
        >
          Voir tous les articles →
        </Link>
      </div>
    </div>
  );
}