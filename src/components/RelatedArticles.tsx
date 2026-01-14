import { BlogPost, BlogPostPreview } from "@/sanity/lib/type";
import ArticleCard from "./ArticleCard";

interface RelatedArticlesProps {
  articles: (BlogPost | BlogPostPreview)[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-4 lg:py-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="md:hidden flex gap-4 overflow-x-scroll scrollbar-hide -mx-4 px-4">
            {articles.map((article, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          <div className="hidden md:contents">
            {articles.map((article, index) => (
              <ArticleCard key={`grid-${index}`} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
