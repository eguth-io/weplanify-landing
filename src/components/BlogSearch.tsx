"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Données factices pour la recherche
const allArticles = [
  {
    id: "1",
    title: "10 conseils pour organiser un voyage en groupe parfait",
    slug: "conseils-voyage-groupe",
    excerpt: "Découvrez nos meilleures astuces pour planifier et organiser un voyage en groupe sans stress.",
    author: "Marie Dubois",
    publishedAt: "2024-01-15",
    tags: ["voyage", "groupe", "conseils", "organisation"]
  },
  {
    id: "2",
    title: "Comment choisir la destination idéale pour vos vacances",
    slug: "choisir-destination-vacances",
    excerpt: "Trouvez la destination parfaite selon vos envies, votre budget et vos contraintes de temps.",
    author: "Jean Martin",
    publishedAt: "2024-01-10",
    tags: ["destination", "vacances", "planification", "conseils"]
  },
  {
    id: "3",
    title: "Budget voyage : comment économiser sans se priver",
    slug: "budget-voyage-economiser",
    excerpt: "Nos astuces pour voyager moins cher tout en profitant pleinement de votre séjour.",
    author: "Sophie Laurent",
    publishedAt: "2024-01-05",
    tags: ["budget", "économie", "voyage", "astuces"]
  },
  {
    id: "4",
    title: "Les meilleures applications pour planifier vos voyages",
    slug: "meilleures-apps-voyage",
    excerpt: "Découvrez notre sélection des applications indispensables pour organiser, réserver et profiter de vos voyages.",
    author: "Thomas Petit",
    publishedAt: "2024-01-01",
    tags: ["applications", "technologie", "voyage", "outils"]
  },
  {
    id: "5",
    title: "Voyage solo : conseils pour partir en toute sécurité",
    slug: "voyage-solo-securite",
    excerpt: "Partir seul en voyage peut être une expérience enrichissante. Nos conseils pour voyager en solo en toute sécurité.",
    author: "Emma Rousseau",
    publishedAt: "2023-12-28",
    tags: ["solo", "sécurité", "voyage", "conseils"]
  },
  {
    id: "6",
    title: "Comment préparer sa valise pour un voyage longue durée",
    slug: "preparer-valise-longue-duree",
    excerpt: "Préparer sa valise pour un voyage de plusieurs semaines ou mois nécessite une organisation particulière.",
    author: "Lucas Moreau",
    publishedAt: "2023-12-20",
    tags: ["valise", "préparation", "longue durée", "organisation"]
  }
];

export default function BlogSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredArticles(allArticles);
      return;
    }

    const filtered = allArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredArticles(filtered);
  }, [searchTerm]);

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F6391A] focus:border-[#F6391A] outline-none"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {searchTerm && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-3">
              {filteredArticles.length} article(s) trouvé(s) pour "{searchTerm}"
            </p>
            
            {filteredArticles.length > 0 ? (
              <div className="space-y-3">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <span>Par {article.author}</span>
                      <span className="mx-2">•</span>
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Aucun article trouvé pour cette recherche.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-[#F6391A] hover:text-[#FF6B35] text-sm"
                >
                  Effacer la recherche
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}