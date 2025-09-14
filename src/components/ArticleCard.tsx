import Link from "next/link";
import { BlogPost, BlogPostPreview } from "@/sanity/lib/type";

interface ArticleCardProps {
  article: BlogPost | BlogPostPreview;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
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
  );
}
