import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery } from "@/sanity/lib/query";
import { NavType } from "@/sanity/lib/type";

// Données factices pour les articles de blog
const fakeBlogPosts = {
  "conseils-voyage-groupe": {
    id: "1",
    title: "10 conseils pour organiser un voyage en groupe parfait",
    slug: "conseils-voyage-groupe",
    excerpt: "Découvrez nos meilleures astuces pour planifier et organiser un voyage en groupe sans stress.",
    author: "Marie Dubois",
    publishedAt: "2024-01-15",
    featuredImage: {
      url: "/planes.png",
      alt: "Voyage en groupe"
    },
    tags: ["voyage", "groupe", "conseils", "organisation"],
    content: [
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "1. Définissez vos objectifs communs"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Avant de commencer à planifier, il est essentiel de réunir tout le groupe pour discuter des attentes de chacun. Quels sont les objectifs du voyage ? Souhaitez-vous vous détendre, découvrir de nouveaux endroits, ou vivre des aventures ?"
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "2. Établissez un budget réaliste"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Le budget est souvent un point de friction dans les voyages de groupe. Fixez un budget maximum que tout le monde peut se permettre et respectez-le. N'oubliez pas d'inclure les frais cachés comme les pourboires, les taxes d'aéroport, et les dépenses imprévues."
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "3. Utilisez des outils de planification collaboratifs"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Des applications comme Weplanify permettent à tous les membres du groupe de participer à la planification. Chacun peut suggérer des activités, voter pour les options, et voir les coûts en temps réel."
          }
        ]
      }
    ]
  },
  "choisir-destination-vacances": {
    id: "2",
    title: "Comment choisir la destination idéale pour vos vacances",
    slug: "choisir-destination-vacances",
    excerpt: "Trouvez la destination parfaite selon vos envies, votre budget et vos contraintes de temps.",
    author: "Jean Martin",
    publishedAt: "2024-01-10",
    featuredImage: {
      url: "/planesMobile.png",
      alt: "Choisir une destination"
    },
    tags: ["destination", "vacances", "planification", "conseils"],
    content: [
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Analysez vos envies et contraintes"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Commencez par lister ce que vous recherchez : détente, aventure, culture, nature, gastronomie... Puis identifiez vos contraintes : budget, durée, période de l'année, et préférences climatiques."
          }
        ]
      }
    ]
  },
  "budget-voyage-economiser": {
    id: "3",
    title: "Budget voyage : comment économiser sans se priver",
    slug: "budget-voyage-economiser",
    excerpt: "Nos astuces pour voyager moins cher tout en profitant pleinement de votre séjour.",
    author: "Sophie Laurent",
    publishedAt: "2024-01-05",
    featuredImage: {
      url: "/planes.png",
      alt: "Budget voyage"
    },
    tags: ["budget", "économie", "voyage", "astuces"],
    content: [
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Planifiez à l'avance"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Plus vous réservez tôt, plus vous avez de chances de trouver de bonnes offres. Les billets d'avion et les hôtels sont généralement moins chers plusieurs mois à l'avance."
          }
        ]
      }
    ]
  }
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const article = fakeBlogPosts[params.slug as keyof typeof fakeBlogPosts];
  const navData: NavType = await sanityFetch({
    query: navQuery,
    tags: ["nav"],
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFFCFB]">
      <Nav navData={navData} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#F6391A] to-[#FF6B35] pt-[100px] lg:pt-[150px] pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-white">
            <Link 
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour au blog
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-unbounded font-bold mb-4">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-center text-white/80 mb-6">
              <span>Par {article.author}</span>
              <span className="mx-2">•</span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.featuredImage && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.alt || article.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 bg-[#FFFCFB]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </div>
            
            <div className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#F6391A] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-[#F6391A] prose-blockquote:bg-[#F6391A]/5 prose-blockquote:p-4 prose-blockquote:rounded-lg">
              <PortableText value={article.content} />
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              À propos de l'auteur
            </h3>
            <p className="text-gray-600">
              <strong>{article.author}</strong> - Expert en planification de voyage chez Weplanify
            </p>
            <p className="text-gray-600 mt-2">
              Découvrez nos conseils et astuces pour organiser vos voyages parfaitement avec Weplanify.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#F6391A] to-[#FF6B35] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-unbounded font-bold text-white mb-4">
            Prêt à planifier votre prochain voyage ?
          </h2>
          <p className="text-white/90 text-xl mb-8">
            Découvrez Weplanify et organisez vos voyages en toute simplicité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-white text-[#F6391A] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Découvrir Weplanify
            </Link>
            <Link 
              href="/blog"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#F6391A] transition-colors"
            >
              Lire d'autres articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Génération des métadonnées pour le SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const article = fakeBlogPosts[params.slug as keyof typeof fakeBlogPosts];

  if (!article) {
    return {
      title: "Article non trouvé - Weplanify Blog",
    };
  }

  return {
    title: `${article.title} - Weplanify Blog`,
    description: article.excerpt,
    keywords: article.tags || [],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.featuredImage.url,
          width: 1200,
          height: 630,
          alt: article.featuredImage.alt || article.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage.url],
    },
  };
}

// Génération des paramètres statiques
export async function generateStaticParams() {
  return Object.keys(fakeBlogPosts).map((slug) => ({
    slug,
  }));
}