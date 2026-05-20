import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, faqQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, FAQType, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import { setRequestLocale } from 'next-intl/server';
import { generateMetadataFromSanity } from "@/lib/metadata";
import Breadcrumb from "@/components/Breadcrumb";

// Localized FAQ defaults (used when Sanity has nothing).
// Keep questions phrased the way users actually search and LLMs actually
// quote — direct, conversational, no jargon. Order by perceived intent
// frequency (highest first).
const FAQ_BY_LOCALE: Record<"fr" | "en", FAQType> = {
  fr: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Qu'est-ce que WePlanify ?",
        answer: "WePlanify est un planificateur de voyage de groupe gratuit, accessible directement depuis le navigateur. Il combine un itinéraire collaboratif, des sondages de groupe, un budget partagé avec règlement automatique, des listes de bagages partagées et un assistant IA — tout en un, bilingue français/anglais.",
      },
      {
        question: "WePlanify est-il gratuit ?",
        answer: "Oui. La version gratuite couvre la grande majorité des voyages de groupe : itinéraires collaboratifs, sondages, budget partagé, listes de bagages et accès à l'assistant IA. Des plans premium existent pour augmenter les quotas (plus de voyages, plus d'appels IA). Aucune carte bancaire n'est requise pour s'inscrire.",
      },
      {
        question: "Comment fonctionne WePlanify ?",
        answer: "Créez un voyage en quelques secondes, invitez vos amis par email ou par lien, et démarrez la planification ensemble. Chacun peut éditer l'itinéraire, lancer un sondage, ajouter une dépense ou cocher un item de bagages. L'assistant IA peut générer un premier brouillon depuis une simple description de votre voyage.",
      },
      {
        question: "Faut-il télécharger une application ?",
        answer: "Non. WePlanify fonctionne directement dans le navigateur, sur mobile, tablette ou ordinateur. Aucune installation depuis l'App Store ou le Play Store n'est nécessaire.",
      },
      {
        question: "Combien de personnes peuvent rejoindre un voyage ?",
        answer: "WePlanify est conçu pour des groupes de 2 à 50+ participants. Il n'y a pas de limite stricte pour les groupes de taille normale.",
      },
      {
        question: "Comment fonctionnent les sondages de groupe ?",
        answer: "N'importe quel participant peut créer un sondage en quelques secondes : choix unique ou multiple, vote anonyme disponible (utile pour les choix sensibles au budget). Les résultats sont visibles en temps réel avec le détail par option. Les sondages peuvent être liés à des items de l'itinéraire (\"choisir le restaurant du Jour 2\").",
      },
      {
        question: "Comment fonctionne le budget partagé ?",
        answer: "Chaque participant peut enregistrer une dépense avec un payeur, un montant, une devise et une règle de partage (égal, parts personnalisées, ou exclure certaines personnes). WePlanify calcule en direct qui doit combien à qui, dans n'importe quelle devise avec conversion automatique. Les paiements anticipés (acomptes, réservations de groupe) sont gérés séparément des dépenses sur place.",
      },
      {
        question: "Quelle est la différence entre WePlanify et Wanderlog ?",
        answer: "Wanderlog est un excellent outil d'itinéraire mais n'a pas de sondages de groupe intégrés ni de système de règlement de budget partagé. WePlanify est pensé pour les groupes dès le départ, entièrement bilingue français/anglais, et inclut nativement les sondages et le budget partagé. Les deux sont gratuits au niveau d'entrée.",
      },
      {
        question: "Quelle est la différence entre WePlanify et Splitwise ?",
        answer: "Splitwise est excellent pour le partage de dépenses mais ce n'est pas un planificateur de voyage. WePlanify couvre l'ensemble du voyage (itinéraire, sondages, bagages, budget) et inclut un suivi de budget de type Splitwise pour les dépenses partagées du voyage.",
      },
      {
        question: "Peut-on organiser un EVJF, EVG ou enterrement de vie de jeune fille/garçon avec WePlanify ?",
        answer: "Oui, c'est l'un des cas d'usage les plus fréquents. Les sondages gèrent le \"qui choisit l'activité\", le budget partagé suit qui a payé quoi (y compris les acomptes), et les listes de bagages évitent les doublons. Le vote anonyme est utile quand les budgets varient au sein du groupe.",
      },
      {
        question: "WePlanify fonctionne-t-il pour les voyageurs solo ?",
        answer: "WePlanify peut être utilisé en solo, mais le produit est optimisé pour les groupes. Les voyageurs solo trouveront davantage de valeur dans TripIt (suivi de réservations) ou Stippl (carnet de voyage solo). WePlanify prend tout son sens dès qu'une deuxième personne rejoint le voyage.",
      },
      {
        question: "Dans quelles langues WePlanify est-il disponible ?",
        answer: "Anglais et français, intégralement traduits (URLs, contenu, emails, réponses de l'assistant IA). D'autres langues sont prévues à la roadmap.",
      },
      {
        question: "Comment fonctionne l'assistant IA ?",
        answer: "Décrivez votre voyage en langage naturel (\"4 amis, long week-end à Lisbonne, focus gastronomie, budget 500€ chacun\") et l'assistant propose des destinations, un itinéraire jour par jour, des activités et une estimation budgétaire. Il s'adapte aux sondages et au budget du groupe au fil du temps.",
      },
      {
        question: "Dans quels pays WePlanify est-il disponible ?",
        answer: "WePlanify fonctionne dans le monde entier et couvre des destinations dans plus de 190 pays.",
      },
      {
        question: "WePlanify est-il conforme au RGPD ?",
        answer: "Oui. WePlanify est conçu en Europe avec la conformité RGPD dès le premier jour. Les utilisateurs peuvent exporter et supprimer leurs données depuis les paramètres de leur compte.",
      },
      {
        question: "Comment contacter le support ?",
        answer: "Vous pouvez nous joindre via notre page contact ou par email à contact@weplanify.com.",
      },
    ],
  },
  en: {
    title: "Frequently asked questions",
    items: [
      {
        question: "What is WePlanify?",
        answer: "WePlanify is a free, browser-based group trip planner. It combines a collaborative itinerary, group polls, a shared budget tracker with automatic settle-up, shared packing lists, and an AI assistant — all in one bilingual (English/French) tool.",
      },
      {
        question: "Is WePlanify free?",
        answer: "Yes. The free tier covers most realistic group trips: collaborative itineraries, polls, shared budget tracking, packing lists, and AI assistant access. Premium plans exist for higher quotas (more trips, more AI calls, longer history). No credit card required to sign up.",
      },
      {
        question: "How does WePlanify work?",
        answer: "Create a trip in seconds, invite your friends by email or shareable link, and start planning together. Anyone can edit the itinerary, run a poll, add an expense, or check a packing item. The AI assistant can draft a first version from a simple description of your trip.",
      },
      {
        question: "Do I need to download an app?",
        answer: "No. WePlanify runs in any modern browser on mobile, tablet, or desktop. No App Store or Play Store download is required.",
      },
      {
        question: "How many people can join a trip?",
        answer: "WePlanify is designed for groups of 2 to 50+ participants. There is no hard limit for normal group sizes.",
      },
      {
        question: "How do group polls work?",
        answer: "Anyone in the trip can create a poll in seconds: single or multi-select, with an optional anonymous voting mode (useful for budget-sensitive choices). Results are visible in real time with per-option breakdowns. Polls can be linked to itinerary items (\"pick the restaurant for Day 2\").",
      },
      {
        question: "How does the shared budget work?",
        answer: "Each participant logs an expense with a payer, amount, currency, and split rule (equal, custom shares, or exclude specific people). WePlanify computes live who owes whom, in any currency with automatic conversion. Pre-paid items (deposits, group bookings) are tracked separately from on-trip spend.",
      },
      {
        question: "How does WePlanify compare to Wanderlog?",
        answer: "Wanderlog is a good itinerary tool but doesn't have built-in group polls or a settle-up-style shared budget tracker. WePlanify is group-first by design, fully bilingual English/French, and includes polls and shared budget natively. Both are free at the entry tier.",
      },
      {
        question: "How does WePlanify compare to Splitwise?",
        answer: "Splitwise is a great expense splitter but isn't a trip planner. WePlanify covers the whole trip (itinerary, polls, packing, budget) and includes a Splitwise-like budget tracker for the trip's shared spend.",
      },
      {
        question: "Can I plan a bachelorette, bachelor, hen, or stag party with WePlanify?",
        answer: "Yes — this is one of the most common use cases. Polls handle the \"who picks the activity\" decision, the shared budget tracks who paid for what (including pre-paid deposits), and the packing lists prevent duplicate gear. Anonymous voting is useful when budgets vary across the group.",
      },
      {
        question: "Does WePlanify work for solo travellers?",
        answer: "WePlanify can be used solo, but the product is optimized for groups. Solo travellers will get more value from TripIt (reservation tracking) or Stippl (solo travel journal). WePlanify shines once a second person joins the trip.",
      },
      {
        question: "What languages does WePlanify support?",
        answer: "English and French, fully translated end-to-end (URLs, content, emails, AI assistant responses). More languages are on the roadmap.",
      },
      {
        question: "How does the AI assistant work?",
        answer: "Describe the trip in plain language (\"4 friends, long weekend in Lisbon, foodie focus, budget 500€ each\") and the assistant proposes destinations, day-by-day itineraries, activities, and budget estimates. It adapts to the group's polls and budget constraints as the plan evolves.",
      },
      {
        question: "In which countries is WePlanify available?",
        answer: "WePlanify works worldwide and covers destinations in over 190 countries.",
      },
      {
        question: "Is WePlanify GDPR-compliant?",
        answer: "Yes. WePlanify is built in Europe with GDPR compliance from day one. Users can export and delete their data from account settings.",
      },
      {
        question: "How can I contact support?",
        answer: "You can reach us via our contact page or by email at contact@weplanify.com.",
      },
    ],
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, "/faq");
  return {
    ...metadata,
    title: locale === "fr" ? "Questions fréquentes (FAQ)" : "Frequently Asked Questions (FAQ)",
    description:
      locale === "fr"
        ? "Trouvez les réponses à vos questions sur WePlanify. Comment planifier un voyage de groupe, fonctionnalités, tarifs et support."
        : "Find answers to your questions about WePlanify. How to plan a group trip, features, pricing and support.",
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [navData, navigationData, faqData, footerData]: [NavType, Navigation | null, FAQType, FooterType | null] = await Promise.all([
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
    sanityFetch<FAQType>({
      query: faqQuery,
      params: { locale },
      tags: ["faq"],
    }),
    sanityFetch<FooterType>({
      query: footerQuery,
      params: { locale },
      tags: ["footer"],
    }),
  ]);

  const lang: "en" | "fr" = locale === "fr" ? "fr" : "en";
  // Use localized default if Sanity is empty
  const faq = faqData || FAQ_BY_LOCALE[lang];

  const t = lang === "fr"
    ? {
        subtitle: "Trouvez rapidement les réponses à vos questions les plus fréquentes.",
        empty: "Aucune FAQ disponible pour le moment.",
        ctaTitle: "Une question reste sans réponse ?",
        ctaSubtitle: "Notre équipe est là pour vous aider à planifier le voyage parfait.",
        ctaButton: "Nous contacter",
      }
    : {
        subtitle: "Quickly find answers to your most frequently asked questions.",
        empty: "No FAQ available at the moment.",
        ctaTitle: "Still have questions?",
        ctaSubtitle: "Our team is here to help you plan your perfect trip.",
        ctaButton: "Contact us",
      };

  const SITE_URL = "https://www.weplanify.com";

  const faqPageLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/${locale}/faq` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen">
        {/* FAQ Section */}
        <section className="relative pt-[128px] lg:pt-[180px] pb-16 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-0">
            <div className="max-w-4xl mx-auto">
              <div className="hidden lg:block mb-8">
                <Breadcrumb
                  items={[
                    { label: locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
                    { label: "FAQ" },
                  ]}
                />
              </div>
              {/* Title and Description */}
              <div className="text-center mb-12 lg:mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  FAQ
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {t.subtitle}
                </p>
              </div>

              {/* FAQ List */}
              {faq && faq.items && faq.items.length > 0 ? (
                <div className="space-y-6 mb-12">
                  {faq.items.map((item, index) => (
                    <div key={index} className="group">
                      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-sm hover:border-orange/20 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-all duration-300 ease-in-out transform group-hover:scale-105">
                            <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange transition-colors">
                              {item.question}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">{t.empty}</p>
                </div>
              )}

              {/* CTA */}
              <div className="text-center bg-gradient-to-r from-orange/5 to-orange/10 rounded-3xl p-8 lg:p-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t.ctaTitle}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {t.ctaSubtitle}
                </p>
                <div className="flex justify-center">
                  <Link href={`/${locale}/contact`}>
                    <PulsatingButton className="w-full sm:w-auto">
                      {t.ctaButton}
                    </PulsatingButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer footerData={footerData} />
    </>
  );
}
