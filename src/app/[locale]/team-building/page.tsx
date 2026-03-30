import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { setRequestLocale } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/team-building";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "Corporate Retreat Planner — Team Building Trips | WePlanify"
    : "Organiser un Séminaire d'Entreprise — Team Building | WePlanify";
  const description = isEn
    ? "Plan your next corporate retreat or team offsite without the spreadsheet chaos. Itineraries, polls, budgets — one tool, zero headache."
    : "Organisez votre prochain séminaire ou team building sans tableur ni chaos. Itinéraire, votes, budget — un seul outil.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function TeamBuildingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Accueil", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Team Building", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "Plan a Team Building Trip That People Actually Want to Go On" : "Organisez un Séminaire d'Entreprise où les Gens Veulent Vraiment Aller",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-03-19", dateModified: "2026-03-26",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const faqItems = isEn
    ? [
        { q: "Can WePlanify handle large teams (20+ people)?", a: "Yes. There's no limit on group size. Every team member joins with a shared link and can see the itinerary, vote in polls, and track expenses. For very large groups, you can use sub-groups within the trip for different activity tracks." },
        { q: "How do you manage expenses when the company is paying?", a: "Use the budget tracker to log all expenses in real time. Tag expenses by category (accommodation, meals, activities, transport) for easy reporting. At the end of the trip, export a clean summary for finance or reimbursement. You can separate company-paid from personal expenses." },
        { q: "Can we include remote team members in the planning?", a: "Absolutely. WePlanify works in the browser — no app to download. Share the trip link and remote team members can contribute ideas, vote on activities, and see the full itinerary from anywhere. It's designed for distributed collaboration." },
        { q: "How far ahead should we plan a team retreat?", a: "Two to three months minimum for domestic retreats, four to six months for international ones. Large group accommodation books up fast, and people need advance notice to block their calendars. Start a WePlanify trip early to gather input even before details are finalized." },
        { q: "What types of team trips work best?", a: "It depends on your goals. Problem-solving teams benefit from adventure activities (escape rooms, outdoor challenges). Creative teams thrive with unstructured exploration (city trips, cultural experiences). New teams need icebreaker-friendly formats. Use polls to gauge what your team actually wants — you might be surprised." },
        { q: "How do you pitch a team trip to management?", a: "Focus on outcomes: improved communication, stronger cross-team relationships, reduced remote isolation. Frame it as an investment in retention and productivity, not an expense. Provide a clear budget breakdown using WePlanify's tracker — showing transparency makes approval much easier." },
      ]
    : [
        { q: "WePlanify gère-t-il les grandes équipes (20+ personnes) ?", a: "Oui. Il n'y a pas de limite de taille de groupe. Chaque membre rejoint avec un lien partagé et peut voir l'itinéraire, voter et suivre les dépenses. Pour les très grands groupes, vous pouvez utiliser des sous-groupes pour différentes activités." },
        { q: "Comment gérer les dépenses quand l'entreprise paie ?", a: "Utilisez le suivi de budget pour enregistrer toutes les dépenses en temps réel. Catégorisez-les (hébergement, repas, activités, transport) pour faciliter le reporting aux finances. En fin de séminaire, exportez un résumé propre pour les finances. Vous pouvez séparer les frais entreprise des frais personnels." },
        { q: "Les collègues en remote peuvent-ils participer à la planification ?", a: "Absolument. WePlanify fonctionne dans le navigateur — rien à télécharger. Partagez le lien et les collègues distants peuvent contribuer, voter et voir l'itinéraire complet depuis n'importe où. C'est conçu pour la collaboration distribuée." },
        { q: "Combien de temps avant faut-il planifier un séminaire ?", a: "Deux à trois mois minimum pour les séminaires nationaux, quatre à six mois pour l'international. Les hébergements grande capacité se réservent vite et les gens ont besoin de temps pour bloquer leurs agendas. Créez un voyage WePlanify tôt pour recueillir les avis." },
        { q: "Quels types de séminaires fonctionnent le mieux ?", a: "Ça dépend de vos objectifs. Les équipes de résolution de problèmes profitent des activités aventure (escape rooms, défis outdoor). Les équipes créatives s'épanouissent avec l'exploration libre (city trips, expériences culturelles). Les nouvelles équipes ont besoin de formats brise-glace. Utilisez les sondages pour savoir ce que votre équipe veut vraiment." },
        { q: "Comment convaincre la direction d'organiser un séminaire ?", a: "Concentrez-vous sur les résultats : meilleure communication, relations inter-équipes plus fortes, réduction de l'isolement remote. Présentez-le comme un investissement en rétention et productivité, pas une dépense. Fournissez un budget détaillé via le suivi WePlanify — la transparence facilite grandement l'approbation." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  return (
    <>
      <AuthorJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ HERO ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb items={[
                { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
                { label: "Team Building" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "Corporate & Team Trips" : "Séminaires & Voyages d'Équipe"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "Plan a Team Trip People Actually Want to Go On"
                : "Organisez un Séminaire où les Gens Veulent Vraiment Aller"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? "Team retreats fail when one person plans everything, nobody gets a say, and the activities feel forced. Here's how to organize one that your team will actually enjoy — and that delivers real results."
                : "Les séminaires échouent quand une seule personne planifie tout, personne n'a son mot à dire et les activités semblent forcées. Voici comment en organiser un que votre équipe appréciera vraiment — et qui donnera de vrais résultats."}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "9 min read" : "9 min de lecture"}</p>
            <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-26" />
          </div>
        </section>

        {/* ━━━ WHY MOST TEAM TRIPS FAIL ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-8">
              {isEn ? "Why Most Team Trips Miss the Mark" : "Pourquoi la Plupart des Séminaires Ratent leur Objectif"}
            </h2>
            <div className="space-y-8">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Most corporate retreats are organized top-down: someone in HR or management picks a venue, books some activities, sends out a calendar invite, and hopes for the best. The result? Half the team dreads the forced fun, the other half is confused about the schedule, and the organizer is burned out before the first team dinner."
                  : "La plupart des séminaires sont organisés de haut en bas : quelqu'un aux RH ou au management choisit un lieu, réserve des activités, envoie une invitation agenda et espère que tout ira bien. Le résultat ? La moitié de l'équipe redoute le fun forcé, l'autre est perdue sur le planning, et l'organisateur est épuisé avant le premier dîner d'équipe."}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "The fix isn't better activities — it's better process. When people have a say in where they go and what they do, they show up with energy instead of obligation. When expenses are tracked transparently, there are no awkward reimbursement conversations. When the schedule is visible to everyone, nobody shows up to the wrong lobby at the wrong time."
                  : "La solution, ce n'est pas de meilleures activités — c'est un meilleur processus. Quand les gens ont leur mot à dire sur où ils vont et ce qu'ils font, ils arrivent avec de l'énergie au lieu de l'obligation. Quand les dépenses sont suivies de manière transparente, il n'y a pas de conversations gênantes sur les remboursements. Quand le planning est visible par tous, personne ne se trompe de hall d'hôtel."}
              </p>
              <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
                {isEn
                  ? "WePlanify brings the whole team into the planning. Not just the organizer."
                  : "WePlanify implique toute l'équipe dans la planification. Pas seulement l'organisateur."}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ TYPES OF TEAM TRIPS ━━━ */}
        <FadeIn>
          <section className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Types of Team Trips" : "Types de Séminaires"}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[600px]">
                {isEn
                  ? "Different objectives call for different formats. Pick the one that matches your team's needs."
                  : "Différents objectifs appellent différents formats. Choisissez celui qui correspond aux besoins de votre équipe."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                {(isEn
                  ? [
                      { title: "The Classic Retreat", desc: "2-3 days at a countryside venue. Mix of workshops, outdoor activities, and free time. Works best for annual company-wide meetups and strategic planning sessions.", color: "bg-[#EEF899]" },
                      { title: "The City Offsite", desc: "A vibrant city for 2-4 days. Office coworking in the morning, exploration and team dinners in the evening. Ideal for remote teams meeting in person for the first time.", color: "bg-[#61DBD5]" },
                      { title: "The Adventure Trip", desc: "Hiking, rafting, climbing, skiing — something physical that pushes people out of comfort zones together. Best for small, tight-knit teams. Creates strong bonds fast.", color: "bg-[#F6391A]" },
                      { title: "The Working Retreat", desc: "Part work, part play. A week-long trip where mornings are productive sprints and afternoons are free. Great for startups and distributed teams who need focused time together.", color: "bg-white" },
                    ]
                  : [
                      { title: "Le Séminaire Classique", desc: "2-3 jours dans un lieu à la campagne. Mix d'ateliers, activités outdoor et temps libre. Fonctionne pour les rencontres annuelles et la planification stratégique.", color: "bg-[#EEF899]" },
                      { title: "L'Offsite Urbain", desc: "Une ville dynamique pour 2-4 jours. Coworking le matin, exploration et dîners d'équipe le soir. Idéal pour les équipes remote qui se rencontrent pour la première fois.", color: "bg-[#61DBD5]" },
                      { title: "Le Trip Aventure", desc: "Randonnée, rafting, escalade, ski — du physique qui pousse les gens hors de leur zone de confort ensemble. Parfait pour les petites équipes soudées.", color: "bg-[#F6391A]" },
                      { title: "La Retraite de Travail", desc: "Moitié travail, moitié détente. Une semaine où les matins sont des sprints productifs et les après-midi sont libres. Idéal pour les startups et équipes distribuées.", color: "bg-white" },
                    ]
                ).map((type, i) => {
                  const isDark = type.color === "bg-[#F6391A]";
                  const isWhite = type.color === "bg-white";
                  const textColor = isDark ? "text-[#FFFBF5]" : "text-[#001E13]";
                  const descColor = isDark ? "text-[#FFFBF5]/70" : isWhite ? "text-[#001E13]/65" : "text-[#001E13]/70";
                  return (
                    <div key={i} className={`${type.color} rounded-[20px] lg:rounded-[28px] p-6 lg:p-8 ${isWhite ? "border border-[#001E13]/10" : ""}`}>
                      <h3 className={`${textColor} text-xl lg:text-2xl font-londrina-solid mb-3`}>{type.title}</h3>
                      <p className={`${descColor} text-sm lg:text-base font-karla leading-[1.8]`}>{type.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ HOW TO PITCH IT ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10">
              {isEn ? "How to Pitch It to Your Boss" : "Comment Convaincre Votre Direction"}
            </h2>
            <div className="space-y-8">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "The secret to getting a team trip approved is framing it as an investment, not an expense. Remote and hybrid teams in particular suffer from weak cross-team relationships — the kind of bonds that only form in person. A well-planned retreat pays for itself in improved collaboration, reduced turnover, and better onboarding for new hires."
                  : "Le secret pour faire approuver un séminaire, c'est de le présenter comme un investissement, pas une dépense. Les équipes remote et hybrides souffrent particulièrement de relations inter-équipes faibles — le genre de liens qui ne se forment qu'en personne. Un séminaire bien planifié se rembourse en meilleure collaboration, turnover réduit et meilleur onboarding."}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Come with a budget breakdown, not just a vague ask. Use WePlanify's budget tracker to model costs per person across accommodation, transport, activities, and meals. Showing a transparent, itemized plan is infinitely more convincing than \"it'll cost around €500 per person, probably.\""
                  : "Venez avec un budget détaillé, pas une demande vague. Utilisez le suivi de budget WePlanify pour modéliser les coûts par personne (hébergement, transport, activités, repas). Montrer un plan transparent et détaillé est infiniment plus convaincant que « ça coûtera environ 500€ par personne, à peu près »."}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ PULL QUOTE ━━━ */}
        <section className="bg-[#EEF899] py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-[#001E13] text-[24px] lg:text-[44px] font-londrina-solid leading-[1.12]">
              {isEn
                ? "The best team retreats don't feel like mandatory fun — they feel like a trip you'd go on even if work wasn't paying."
                : "Les meilleurs séminaires ne ressemblent pas à du fun obligatoire — ils ressemblent à un voyage que vous feriez même si le boulot ne payait pas."}
            </p>
          </div>
        </section>

        {/* ━━━ HOW WEPLANIFY HELPS ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {isEn ? "How WePlanify Helps Teams" : "Comment WePlanify Aide les Équipes"}
            </h2>
            <div className="space-y-6">
              {(isEn
                ? [
                    ["Let the team vote", "Use polls to decide on destinations, dates, and activities. When people choose what they do, they actually look forward to it. Anonymous voting removes hierarchy from the decision.", "/features/polls"],
                    ["One itinerary everyone can see", "Build the schedule collaboratively. Mark what's mandatory (the strategy session) vs. optional (the hike). Changes sync in real time — no more emailing updated PDFs.", "/features/planning"],
                    ["Transparent budgeting", "Track every expense in real time. Tag by category for easy reporting to finance. Separate company expenses from personal ones. Clear, clean, no surprises.", "/features/budget"],
                    ["Coordinate logistics at scale", "Shared packing lists, transport details, room assignments — everything in one place. When 20 people need to be at the same restaurant at 8pm, the shared itinerary is your single source of truth.", "/features/collaboration"],
                  ]
                : [
                    ["Laissez l'équipe voter", "Utilisez les sondages pour décider des destinations, dates et activités. Quand les gens choisissent ce qu'ils font, ils s'en réjouissent vraiment. Le vote anonyme supprime la hiérarchie.", "/features/polls"],
                    ["Un seul planning visible par tous", "Construisez le programme de manière collaborative. Marquez ce qui est obligatoire vs. optionnel. Les modifications se synchronisent en temps réel.", "/features/planning"],
                    ["Budget transparent", "Suivez chaque dépense en temps réel. Catégorisez pour faciliter le reporting aux finances. Séparez les frais entreprise des frais personnels.", "/features/budget"],
                    ["Coordonnez la logistique à grande échelle", "Listes de bagages, détails transport, attribution des chambres — tout au même endroit. Quand 20 personnes doivent être au même restaurant à 20h, l'itinéraire partagé est votre source de vérité.", "/features/collaboration"],
                  ]
              ).map(([title, desc, link], i) => (
                <div key={i} className="flex gap-5 lg:gap-8 items-baseline">
                  <span className="text-[#F6391A] font-londrina-solid text-[28px] lg:text-[36px] leading-none flex-shrink-0 w-8 lg:w-10 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-[#001E13]/10 pt-5 flex-1">
                    <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-1.5">
                      <Link href={`/${locale}${link}`} className="text-[#001E13] hover:underline underline-offset-4 no-underline">{title}</Link>
                    </h3>
                    <p className="text-[#001E13]/65 text-sm lg:text-base font-karla leading-[1.8]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ FAQ ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-10 text-center">
              {isEn ? "Frequently Asked Questions" : "Questions Fréquemment Posées"}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <details key={i} className="group border-b border-[#001E13]/10 pb-5">
                  <summary className="flex items-start justify-between cursor-pointer list-none font-karla font-semibold text-[#001E13] text-base lg:text-lg">
                    <span className="pr-4">{item.q}</span>
                    <span className="text-[#F6391A] text-xl leading-none mt-0.5 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ DISCOVER MORE ━━━ */}
        <section className="py-12 lg:py-16 px-6 lg:px-12 bg-[#FFFBF5]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">{isEn ? "Discover More" : "Découvrir aussi"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Trip with Friends" : "Voyage entre Amis"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan any group trip effortlessly." : "Organisez n'importe quel voyage de groupe."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/road-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">Road Trip</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan a road trip with your crew." : "Organisez un road trip avec votre bande."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "App Comparison" : "Comparatif"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "See how WePlanify compares." : "Comparez WePlanify aux autres."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "View comparison →" : "Voir le comparatif →"}</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-[24px] lg:rounded-[40px] p-8 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
                {isEn ? "Plan a Retreat Your Team Will Remember" : "Organisez un Séminaire Dont Votre Équipe Se Souviendra"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn ? "Give your team a voice in the planning — and watch the energy change." : "Donnez à votre équipe une voix dans la planification — et regardez l'énergie changer."}
              </p>
              <div className="flex justify-center">
                <Link href="https://app.weplanify.com/register">
                  <PulsatingButton className="font-karla font-bold">{isEn ? "Start planning" : "Commencer"}</PulsatingButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer footerData={footerData} />
    </>
  );
}
