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
    datePublished: "2026-03-19", dateModified: "2026-04-15",
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

  const howToLd = {
    "@context": "https://schema.org", "@type": "HowTo",
    name: isEn ? "How to Plan a Corporate Team Retreat" : "Comment organiser un séminaire d'entreprise",
    description: isEn
      ? "Step-by-step guide to planning a team building retreat that your whole team will enjoy."
      : "Guide étape par étape pour organiser un séminaire d'entreprise que toute votre équipe appréciera.",
    totalTime: "PT90D",
    step: isEn
      ? [
          { "@type": "HowToStep", name: "Define goals and destination", text: "Set retreat objectives, fix a rough budget, and shortlist 2–3 destination ideas. Run a poll to involve the team in the destination choice.", position: 1 },
          { "@type": "HowToStep", name: "Book accommodation and activities", text: "Confirm the venue, reserve group activities, and finalize travel logistics. Build a shared itinerary everyone can see.", position: 2 },
          { "@type": "HowToStep", name: "Share the final plan", text: "Distribute the finalized itinerary, collect dietary needs and accessibility requirements, and confirm headcounts.", position: 3 },
          { "@type": "HowToStep", name: "Stay flexible on the day", text: "Keep the shared itinerary updated in real time so everyone stays informed when plans change.", position: 4 },
        ]
      : [
          { "@type": "HowToStep", name: "Définir les objectifs et la destination", text: "Fixez les objectifs du séminaire, établissez un budget indicatif et présélectionnez 2–3 idées de destinations. Lancez un sondage pour impliquer l'équipe.", position: 1 },
          { "@type": "HowToStep", name: "Réserver l'hébergement et les activités", text: "Confirmez le lieu, réservez les activités de groupe et finalisez la logistique transport. Construisez un itinéraire partagé visible par tous.", position: 2 },
          { "@type": "HowToStep", name: "Partager le programme final", text: "Diffusez l'itinéraire finalisé, recueillez les régimes alimentaires et confirmez les effectifs.", position: 3 },
          { "@type": "HowToStep", name: "Rester flexible le jour J", text: "Maintenez l'itinéraire partagé à jour en temps réel pour que tout le monde reste informé en cas de changement.", position: 4 },
        ],
  };

  return (
    <>
      <AuthorJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
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
            <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-31" />
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
                  ? <>The fix isn&apos;t better activities — it&apos;s better process. When people <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline underline-offset-4">have a say</Link> in where they go and what they do, they show up with energy instead of obligation. When expenses are tracked transparently, there are no awkward reimbursement conversations. When the <Link href={`/${locale}/features/collaboration`} className="text-[#F6391A] hover:underline underline-offset-4">schedule is visible to everyone</Link>, nobody shows up to the wrong lobby at the wrong time.</>
                  : <>La solution, ce n&apos;est pas de meilleures activités — c&apos;est un meilleur processus. Quand les gens <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline underline-offset-4">ont leur mot à dire</Link> sur où ils vont et ce qu&apos;ils font, ils arrivent avec de l&apos;énergie au lieu de l&apos;obligation. Quand les dépenses sont suivies de manière transparente, il n&apos;y a pas de conversations gênantes sur les remboursements. Quand le <Link href={`/${locale}/features/collaboration`} className="text-[#F6391A] hover:underline underline-offset-4">planning est visible par tous</Link>, personne ne se trompe de hall d&apos;hôtel.</>}
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
                  ? <>Come with a budget breakdown, not just a vague ask. Use WePlanify&apos;s <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">budget tracker</Link> to model costs per person across accommodation, transport, activities, and meals. Showing a transparent, itemized plan is infinitely more convincing than &quot;it&apos;ll cost around €500 per person, probably.&quot;</>
                  : <>Venez avec un budget détaillé, pas une demande vague. Utilisez le <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">suivi de budget</Link> WePlanify pour modéliser les coûts par personne (hébergement, transport, activités, repas). Montrer un plan transparent et détaillé est infiniment plus convaincant que « ça coûtera environ 500€ par personne, à peu près ».</>}
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

        {/* ━━━ PLANNING TIMELINE ━━━ */}
        <FadeIn>
          <section className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12">
            <div className="max-w-[900px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10">
                {isEn ? "Planning Timeline: From Idea to Offsite" : "Planning : de l'Idée au Séminaire"}
              </h2>
              <div className="space-y-8">
                <p className="text-[#FFFBF5]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn
                    ? <>Three months before the trip, start with the fundamentals: define the goals (is this about bonding, strategy, or celebrating?), set a rough budget range, and shortlist two or three destination ideas. Create a trip on WePlanify and invite the core organizers. Use <Link href={`/${locale}/features/polls`} className="text-[#EEF899] hover:underline underline-offset-4">polls</Link> to let the broader team weigh in on destination preferences early — this avoids the classic mistake of announcing a location nobody wanted.</>
                    : <>Trois mois avant le départ, posez les fondations : définissez les objectifs (cohésion, stratégie, célébration ?), fixez une fourchette de budget et présélectionnez deux ou trois idées de destinations. Créez un voyage sur WePlanify et invitez les organisateurs. Utilisez les <Link href={`/${locale}/features/polls`} className="text-[#EEF899] hover:underline underline-offset-4">sondages</Link> pour que l&apos;équipe donne son avis sur la destination dès le départ — vous éviterez ainsi l&apos;erreur classique d&apos;annoncer un lieu que personne ne voulait.</>}
                </p>
                <p className="text-[#FFFBF5]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn
                    ? <>One month out, lock in the big decisions: book accommodation, reserve group activities, and finalize travel logistics. Build the <Link href={`/${locale}/features/planning`} className="text-[#EEF899] hover:underline underline-offset-4">shared itinerary</Link> so everyone can see the day-by-day plan taking shape. This is also the time to gather dietary restrictions, accessibility needs, and travel preferences. The more you plan collaboratively now, the fewer fires you&apos;ll fight later. For a step-by-step approach, our <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#EEF899] hover:underline underline-offset-4">group trip planning guide</Link> covers the full process.</>
                    : <>Un mois avant, verrouillez les grandes décisions : réservez l&apos;hébergement, bloquez les activités de groupe, finalisez la logistique transport. Construisez l&apos;<Link href={`/${locale}/features/planning`} className="text-[#EEF899] hover:underline underline-offset-4">itinéraire partagé</Link> pour que tout le monde voie le programme jour par jour prendre forme. C&apos;est aussi le moment de recueillir les régimes alimentaires, besoins d&apos;accessibilité et préférences de voyage. Plus vous planifiez à plusieurs maintenant, moins vous aurez de problèmes plus tard. Pour une approche détaillée, notre <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#EEF899] hover:underline underline-offset-4">guide d&apos;organisation de voyage de groupe</Link> couvre tout le processus.</>}
                </p>
                <p className="text-[#FFFBF5]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn
                    ? "Two weeks before, shift to communication mode. Share the finalized itinerary with the entire team, send packing suggestions, and confirm headcounts for each activity. Pin important details — airport transfers, check-in times, emergency contacts — at the top of the trip. A well-informed team is a relaxed team."
                    : "Deux semaines avant, passez en mode communication. Partagez l'itinéraire finalisé avec toute l'équipe, envoyez des suggestions de bagages et confirmez les effectifs pour chaque activité. Épinglez les infos clés — transferts aéroport, heures de check-in, contacts d'urgence — en haut du voyage. Une équipe bien informée est une équipe détendue."}
                </p>
                <p className="text-[#FFFBF5]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn
                    ? "One week before and during the trip, your job is to stay flexible. Last-minute changes happen — a restaurant cancels, weather shifts, someone's flight is delayed. With a shared itinerary that updates in real time, you can adapt on the fly and everyone stays in the loop. No more frantic group texts asking \"where are we supposed to be right now?\""
                    : "Une semaine avant et pendant le séminaire, votre rôle est de rester flexible. Les imprévus arrivent — un restaurant annule, la météo change, un vol est retardé. Avec un itinéraire partagé qui se met à jour en temps réel, vous pouvez vous adapter à la volée et tout le monde reste informé. Fini les messages de groupe paniqués « on est censés être où là ? »"}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ MEASURING ROI ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10">
              {isEn ? "Measuring ROI of Your Team Retreat" : "Mesurer le Retour sur Investissement de Votre Séminaire"}
            </h2>
            <div className="space-y-8">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>The biggest blocker for team retreats isn&apos;t logistics — it&apos;s justifying the cost. To make a compelling case, measure what matters. Send a short team satisfaction survey before and after the retreat: rate your sense of connection with colleagues, cross-team <Link href={`/${locale}/features/collaboration`} className="text-[#F6391A] hover:underline underline-offset-4">collaboration</Link> quality, and overall morale. The delta between those two snapshots is your clearest proof of impact.</>
                  : <>Le plus grand frein aux séminaires, ce n&apos;est pas la logistique — c&apos;est justifier le coût. Pour construire un argumentaire solide, mesurez ce qui compte. Envoyez un court sondage de satisfaction avant et après le séminaire : évaluez le sentiment de connexion entre collègues, la qualité de la <Link href={`/${locale}/features/collaboration`} className="text-[#F6391A] hover:underline underline-offset-4">collaboration</Link> inter-équipes et le moral général. L&apos;écart entre ces deux snapshots est votre preuve d&apos;impact la plus claire.</>}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Track collaboration metrics in the weeks that follow: are cross-team Slack threads more active? Are people scheduling more one-on-ones with colleagues they met at the retreat? Companies that measure retention rates find that teams with regular offsites have 15-25% lower voluntary turnover. That alone can offset the entire <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">cost of the trip</Link>.</>
                  : <>Suivez les métriques de collaboration dans les semaines qui suivent : les fils Slack inter-équipes sont-ils plus actifs ? Les gens prennent-ils plus de one-on-ones avec les collègues rencontrés au séminaire ? Les entreprises qui mesurent la rétention constatent que les équipes avec des offsites réguliers ont 15 à 25% de turnover volontaire en moins. Cela seul peut compenser la totalité du <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">coût du séminaire</Link>.</>}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Finally, document what worked and what didn&apos;t while it&apos;s fresh. Which activities sparked real conversation? Which felt forced? This post-retreat debrief becomes your playbook for next time — and strong evidence for leadership that the investment paid off. For inspiration on how other groups handle planning, check out our <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline underline-offset-4">roundup of the best group travel apps</Link>.</>
                  : <>Enfin, documentez ce qui a fonctionné et ce qui n&apos;a pas marché tant que c&apos;est frais. Quelles activités ont généré de vraies conversations ? Lesquelles semblaient forcées ? Ce débrief post-séminaire devient votre guide pour la prochaine fois — et une preuve solide pour la direction que l&apos;investissement a porté ses fruits. Pour voir comment d&apos;autres groupes gèrent leur organisation, consultez notre <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline underline-offset-4">comparatif des meilleures applis de voyage de groupe</Link>.</>}
              </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Trip with Friends" : "Voyage entre Amis"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan any group trip effortlessly." : "Organisez n'importe quel voyage de groupe."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/road-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Road Trip" : "Road Trip"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan a group road trip with shared routes and budgets." : "Organisez un road trip de groupe avec itinéraire et budget partagés."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Group Trip Guide" : "Guide Voyage de Groupe"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Step-by-step guide to plan any group trip." : "Guide étape par étape pour organiser un voyage de groupe."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read the guide →" : "Lire le guide →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Best Group Travel Apps" : "Meilleures Applis Voyage de Groupe"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Compare the top tools for group travel." : "Comparez les meilleurs outils pour voyager en groupe."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read the article →" : "Lire l'article →"}</span>
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
