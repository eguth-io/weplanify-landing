import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleTOC from "@/components/ArticleTOC";
import { setRequestLocale } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/school-trip";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "How to Plan a School Trip — Free Field Trip Planner for Teachers | WePlanify"
    : "Organiser un Voyage Scolaire — Planificateur Gratuit de Sortie Scolaire | WePlanify";
  const description = isEn
    ? "Plan a school trip with WePlanify: shared itinerary visible to parents, headcounts and dietary needs in one place, polls for activities, packing lists and document storage. Free for teachers."
    : "Organisez un voyage scolaire avec WePlanify : itinéraire partagé visible par les parents, effectifs et régimes alimentaires centralisés, sondages pour les activités, listes de bagages et stockage de documents. Gratuit pour les enseignants.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function SchoolTripPage({ params }: Props) {
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
      { "@type": "ListItem", position: 2, name: isEn ? "School Trip" : "Voyage Scolaire", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "How to Plan a School Trip Without the Paperwork Nightmare" : "Organiser un Voyage Scolaire Sans le Cauchemar Administratif",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-05", dateModified: "2026-05-05",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const faqItems = isEn
    ? [
        { q: "How far in advance should I plan a school trip?", a: "For day trips, two to three weeks is usually enough. For overnight or international trips, start three to six months ahead. Booking pressure varies by destination — popular school-trip cities like Rome, London or Barcelona fill up fast in spring. Lock in transport and accommodation first; activities can be confirmed later." },
        { q: "How do I collect permission slips and dietary needs efficiently?", a: "Stop chasing paper forms. Use a single shared trip with a participants list — each parent confirms attendance, dietary restrictions, and emergency contacts in one place. WePlanify keeps the live headcount visible so you always know who's signed off and who hasn't." },
        { q: "Can parents see the itinerary without creating an account?", a: "Yes. Share the trip link and parents can view the full day-by-day plan, accommodation address, and emergency contacts without signing up. They'll feel reassured, you'll get fewer panicked emails the day before." },
        { q: "How do you handle dietary needs and allergies?", a: "Add dietary restrictions to each participant's profile and tag them on relevant meals or activities. The information stays visible to chaperones and to the venues you've booked. For severe allergies, attach the medical document directly to the participant so it's accessible offline." },
        { q: "What's the best way to split chaperone responsibilities?", a: "Assign chaperones to specific groups of students inside the trip. Each chaperone sees their group's headcount, dietary info, and emergency contacts on their phone. Use polls to vote on activities the chaperones are debating — no more 'we never decided who goes to the museum.'" },
        { q: "Is WePlanify suitable for school trips with under-13 students?", a: "Yes — students don't need an account. Only the lead teacher and chaperones (or designated parents) join the trip. Student details are stored as participants, not user accounts, which keeps the setup compliant with privacy rules around minors." },
      ]
    : [
        { q: "Combien de temps à l'avance organiser un voyage scolaire ?", a: "Pour une sortie à la journée, deux à trois semaines suffisent. Pour un séjour ou un voyage à l'étranger, démarrez trois à six mois avant. La pression sur les réservations varie selon la destination — les villes prisées (Rome, Londres, Barcelone) se remplissent vite au printemps. Bloquez d'abord le transport et l'hébergement ; les activités peuvent attendre." },
        { q: "Comment collecter autorisations parentales et régimes alimentaires sans paperasse ?", a: "Plus besoin de courir après les formulaires papier. Avec un voyage partagé et une liste de participants, chaque parent confirme directement la présence, les restrictions alimentaires et les contacts d'urgence — au même endroit. WePlanify met à jour les statuts en temps réel pour que vous sachiez à tout moment qui a validé et qui ne l'a pas encore fait." },
        { q: "Les parents peuvent-ils consulter l'itinéraire sans créer de compte ?", a: "Oui. Partagez le lien du voyage et les parents voient le programme jour par jour, l'adresse de l'hébergement et les contacts d'urgence sans s'inscrire. Ils sont rassurés, vous recevez moins de mails inquiets la veille du départ." },
        { q: "Comment gérer les régimes alimentaires et allergies ?", a: "Ajoutez les restrictions alimentaires sur le profil de chaque participant et taguez-les sur les repas et activités concernés. L'information reste visible aux accompagnateurs et aux lieux que vous avez réservés. Pour les allergies sévères, attachez directement le document médical au participant — accessible hors ligne." },
        { q: "Comment répartir les rôles entre accompagnateurs ?", a: "Assignez chaque accompagnateur à un sous-groupe d'élèves dans le voyage. Chacun consulte sur son téléphone l'effectif de son groupe, les régimes alimentaires et les contacts d'urgence. Pour les choix d'activité, les sondages permettent de trancher rapidement et de garder une trace claire des décisions prises." },
        { q: "WePlanify convient-il aux voyages avec des élèves de moins de 13 ans ?", a: "Oui — les élèves n'ont pas besoin de compte. Seul l'enseignant responsable et les accompagnateurs (ou parents désignés) rejoignent le voyage. Les élèves sont stockés comme participants, pas comme utilisateurs, ce qui respecte les règles de confidentialité applicables aux mineurs." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn ? "How to plan a school trip" : "Comment organiser un voyage scolaire",
    description: isEn
      ? "From getting administrative approval to handing out the post-trip survey — a step-by-step playbook for teachers organizing a class trip."
      : "De l'obtention de l'autorisation administrative au questionnaire de retour — un mode d'emploi étape par étape pour les enseignants qui organisent une sortie de classe.",
    totalTime: "PT60M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isEn ? "Get the administrative greenlight" : "Obtenir le feu vert administratif",
        text: isEn
          ? "Before booking anything, get formal sign-off from school leadership. Prepare a one-pager: dates, destination, learning objectives, indicative budget per student, supervision ratio. Most institutions require this 6-12 weeks in advance for overnight trips."
          : "Avant de réserver, obtenez la validation formelle de la direction. Préparez un dossier d'une page : dates, destination, objectifs pédagogiques, budget indicatif par élève, taux d'encadrement. La plupart des établissements demandent ce dossier 6 à 12 semaines à l'avance pour un séjour.",
        url: `${SITE_URL}/${locale}${PATHNAME}#approval`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isEn ? "Lock in transport, accommodation, and activities" : "Verrouiller transport, hébergement et activités",
        text: isEn
          ? "Book the big-ticket items first: coach or train, accommodation with the right adult-to-student ratio, and the marquee activities. Use a shared itinerary so co-organizers see the same plan and can flag conflicts before they become problems."
          : "Réservez d'abord les gros postes : car ou train, hébergement avec le bon taux d'encadrement, et les activités phares. Utilisez un itinéraire partagé pour que les co-organisateurs voient le même plan et signalent les conflits avant qu'ils deviennent des problèmes.",
        url: `${SITE_URL}/${locale}/features/planning`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isEn ? "Collect permissions, dietary needs, and emergency contacts" : "Collecter autorisations, régimes alimentaires et contacts d'urgence",
        text: isEn
          ? "Send parents the trip link. They confirm attendance, declare dietary restrictions and allergies, and provide emergency contacts in one form. The headcount updates live, no chasing required."
          : "Envoyez le lien du voyage aux parents. Ils confirment la présence, déclarent restrictions alimentaires et allergies, et donnent les contacts d'urgence dans un seul formulaire. L'effectif se met à jour en direct, plus besoin de relancer.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isEn ? "Vote on the negotiable activities" : "Voter sur les activités négociables",
        text: isEn
          ? "Some choices are fixed (the museum the curriculum requires). Others aren't (which evening activity, which restaurant for the group dinner). Run a quick poll with the chaperones — and where age-appropriate, the students — and the result decides."
          : "Certaines décisions sont fixes (le musée imposé par le programme). D'autres non (quelle activité du soir, quel restaurant pour le dîner de groupe). Lancez un sondage auprès des accompagnateurs — et selon l'âge, des élèves — et le résultat tranche.",
        url: `${SITE_URL}/${locale}/features/polls`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: isEn ? "Publish the packing list and pre-trip briefing" : "Publier la liste de bagages et le briefing pré-départ",
        text: isEn
          ? "Two weeks before departure, publish a shared packing list (split into 'mandatory' and 'recommended') and a pre-trip briefing covering meeting point, schedule, behavior expectations, and emergency procedure. Parents see exactly what their child needs."
          : "Deux semaines avant le départ, publiez une liste de bagages partagée (séparée en 'obligatoire' et 'recommandé') et un briefing pré-départ : point de rendez-vous, programme, règles de vie, procédure d'urgence. Les parents voient exactement ce dont leur enfant a besoin.",
        url: `${SITE_URL}/${locale}/features/packing`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: isEn ? "Run the trip with the live shared itinerary" : "Vivre le voyage avec l'itinéraire partagé en temps réel",
        text: isEn
          ? "On the day, every chaperone has the full plan on their phone — addresses, times, headcount, emergency contacts. Update the itinerary in real time when something changes (delayed bus, swapped activity), and parents see the new plan immediately. No phone tree, no panic."
          : "Sur place, chaque accompagnateur a le programme complet sur son téléphone — adresses, horaires, effectif, contacts d'urgence. Mettez l'itinéraire à jour en temps réel en cas d'imprévu (bus en retard, activité changée), et les parents voient le nouveau plan immédiatement. Plus de chaîne téléphonique, plus de panique.",
      },
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
                { label: isEn ? "School Trip" : "Voyage Scolaire" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "School Trip" : "Voyage Scolaire"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "Plan a School Trip Without the Paperwork Nightmare"
                : "Organiser un Voyage Scolaire Sans le Cauchemar Administratif"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>Permission slips. Dietary needs. Emergency contacts. Headcounts. Three different parent emails about the same activity. Organizing a school trip turns one teacher into a part-time logistics manager — and the spreadsheet always lags reality. There&apos;s a better way to coordinate it. If you&apos;re also weighing tools, see our take on the <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">best group travel apps</Link>.</>
                : <>Autorisations parentales. Régimes alimentaires. Contacts d&apos;urgence. Effectifs. Trois mails de parents différents sur la même activité. Organiser un voyage scolaire transforme un enseignant en logisticien à temps partiel — et le tableur retarde toujours sur la réalité. Il existe une meilleure façon de coordonner tout ça. Si vous comparez aussi les outils, voyez notre avis sur les <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">meilleures applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "8 min read · Updated May 5, 2026" : "8 min de lecture · Mis à jour le 5 mai 2026"}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-05" modifiedDate="2026-05-05" />
          </div>
        </section>

        {/* ━━━ THE REAL PROBLEM ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "A school trip looks like a single event but is actually three coordinated workflows running in parallel: the trip itself (transport, accommodation, activities), the parent communication (permissions, dietary needs, daily updates from the road), and the chaperone logistics (groups, ratios, who's responsible for which student). When any of those three live in different tools — paper forms here, an email thread there, a WhatsApp group somewhere else — every change has to be propagated three times. That's where the leaks happen."
                : "Un voyage scolaire ressemble à un seul événement mais ce sont en fait trois workflows coordonnés qui tournent en parallèle : le voyage lui-même (transport, hébergement, activités), la communication aux parents (autorisations, régimes, mises à jour pendant le séjour), et la logistique des accompagnateurs (groupes, taux d'encadrement, qui est responsable de qui). Quand ces trois flux vivent dans des outils différents — papier ici, mail là, WhatsApp ailleurs — chaque changement doit être propagé trois fois. C'est là que ça fuit."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify puts the itinerary, the participant list, and the document storage in one place — visible to chaperones and viewable by parents without an account."
                : "WePlanify met l'itinéraire, la liste des participants et les documents au même endroit — visible aux accompagnateurs et consultable par les parents sans inscription."}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={isEn ? "On this page" : "Sur cette page"}
              items={[
                { id: "approval", label: isEn ? "Getting administrative approval" : "Obtenir l'autorisation administrative" },
                { id: "logistics", label: isEn ? "Anatomy of a school trip" : "Anatomie d'un voyage scolaire" },
                { id: "parent-comms", label: isEn ? "Parent communication that scales" : "Communication parents qui passe à l'échelle" },
                { id: "safety", label: isEn ? "Safety, ratios and chaperone roles" : "Sécurité, taux d'encadrement et rôles des accompagnateurs" },
                { id: "faq", label: isEn ? "Frequently asked questions" : "Questions fréquentes" },
              ]}
            />
          </div>
        </section>

        {/* ━━━ APPROVAL ━━━ */}
        <section id="approval" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Getting Administrative Approval" : "Obtenir l'Autorisation Administrative"}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Most schools require formal approval 6-12 weeks before any overnight trip. The fastest path through the bureaucracy: a one-page proposal that answers the questions leadership will ask before they ask them. Dates and destination. Learning objectives mapped to your curriculum. Indicative cost per student. Adult-to-student ratio. Risk assessment. Insurance coverage. The cleaner this document, the faster the sign-off."
                : "La plupart des établissements demandent une autorisation formelle 6 à 12 semaines avant un séjour. Le chemin le plus rapide à travers la bureaucratie : un document d'une page qui répond aux questions de la direction avant qu'elles soient posées. Dates et destination. Objectifs pédagogiques rattachés au programme. Coût indicatif par élève. Taux d'encadrement adultes/élèves. Analyse des risques. Couverture assurance. Plus ce document est propre, plus la validation arrive vite."}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>Once approval is in hand, build the trip in a <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> immediately — even before the booking is confirmed. Treat it as a living document. As you lock in transport, accommodation and activities, the plan fills in. The day approval lands in your inbox is the day the trip stops being a vague idea and starts being an organized object.</>
                : <>Une fois l&apos;autorisation obtenue, construisez le voyage dans un <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> immédiatement — même avant que les réservations soient confirmées. Traitez-le comme un document vivant. Au fur et à mesure que vous bloquez transport, hébergement et activités, le plan se remplit. Le jour où l&apos;autorisation tombe dans votre boîte est le jour où le voyage cesse d&apos;être une idée vague pour devenir un objet organisé.</>}
            </p>
          </div>
        </section>

        {/* ━━━ ANATOMY ━━━ */}
        <FadeIn>
          <section id="logistics" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Anatomy of a School Trip" : "Anatomie d'un Voyage Scolaire"}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[600px]">
                {isEn
                  ? "Five moving parts. Get each one right and the trip runs itself."
                  : "Cinq pièces en mouvement. Réussissez chacune et le voyage roule tout seul."}
              </p>
              <div className="space-y-12">
                {(isEn
                  ? [
                      { stop: "The Roster", desc: "The single source of truth for who's going. Each participant carries their dietary restrictions, allergies, and emergency contact directly on their profile. When a parent signs the permission, the headcount updates live — no spreadsheet to reconcile.", link: "/features/collaboration" },
                      { stop: "The Itinerary", desc: "Day by day, time by time. Visible to every chaperone on their phone and to parents through the shared link. When the bus is 30 minutes late, you push one update and everyone sees it — no broadcast email, no parent group chat to manage.", link: "/features/planning" },
                      { stop: "The Decisions", desc: "Some choices are imposed by the curriculum. Others are open: which optional museum, which restaurant for the group dinner, which evening activity. Run polls with the chaperones (or, age-permitting, the students) and the result wins without debate.", link: "/features/polls" },
                      { stop: "The Money", desc: "Per-student budget, deposits, balance due. Track payments in the shared budget so you always know who's paid and who hasn't. For optional add-ons (souvenir cash, activity upgrades), let parents tick boxes — the budget recalculates automatically.", link: "/features/budget" },
                      { stop: "The Packing", desc: "A shared list with two columns: mandatory and recommended. Parents see it the moment you publish it, two weeks before departure. They pack accordingly. Fewer panicked emails the night before, fewer kids who forgot their passport at the meeting point.", link: "/features/packing" },
                    ]
                  : [
                      { stop: "La Liste", desc: "Source unique de vérité pour qui part. Chaque participant porte ses restrictions alimentaires, allergies et contacts d'urgence sur son profil. Quand un parent signe l'autorisation, l'effectif se met à jour en direct — pas de tableur à réconcilier.", link: "/features/collaboration" },
                      { stop: "L'Itinéraire", desc: "Jour par jour, heure par heure. Visible par chaque accompagnateur sur son téléphone et par les parents via le lien partagé. Quand le bus a 30 minutes de retard, vous poussez une mise à jour et tout le monde voit — pas de mail groupé, pas de groupe WhatsApp parents à gérer.", link: "/features/planning" },
                      { stop: "Les Décisions", desc: "Certains choix sont imposés par le programme. D'autres sont ouverts : quel musée optionnel, quel resto pour le dîner de groupe, quelle activité du soir. Lancez un sondage avec les accompagnateurs (ou, selon l'âge, les élèves) et le résultat tranche sans débat.", link: "/features/polls" },
                      { stop: "L'Argent", desc: "Budget par élève, acomptes, solde. Suivez les paiements dans le budget partagé pour toujours savoir qui a payé et qui ne l'a pas encore fait. Pour les options (argent souvenir, suppléments d'activité), laissez les parents cocher — le budget se recalcule automatiquement.", link: "/features/budget" },
                      { stop: "Les Bagages", desc: "Une liste partagée en deux colonnes : obligatoire et recommandé. Les parents la voient dès que vous publiez, deux semaines avant le départ. Ils préparent en conséquence. Moins de mails paniqués la veille, moins d'élèves qui oublient leur passeport au point de rendez-vous.", link: "/features/packing" },
                    ]
                ).map((item, i) => (
                  <div key={i} className="grid lg:grid-cols-[200px_1fr] gap-4 lg:gap-8 items-start">
                    <h3 className="text-[#EEF899] text-2xl lg:text-3xl font-londrina-solid">
                      {String(i + 1).padStart(2, "0")} — {item.stop}
                    </h3>
                    <p className="text-[#FFFBF5]/75 text-lg font-karla leading-[1.8]">
                      {item.desc}{" "}
                      <Link href={`/${locale}${item.link}`} className="text-[#EEF899] hover:underline font-semibold">
                        {isEn ? "Learn more →" : "En savoir plus →"}
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ PARENT COMMS ━━━ */}
        <section id="parent-comms" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Parent Communication That Scales" : "Communiquer avec les parents sans crouler sous les mails"}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "The classic failure mode of school-trip communication: 30 parents, 30 emails with slightly different questions, and you typing variations of the same answer 30 times. The fix isn't 'send fewer emails' — it's 'put the answer somewhere they can find it themselves.' A shared itinerary they can consult anytime, with the meeting point, the daily schedule, the accommodation address and the emergency contact, eliminates 80% of the questions before they're asked."
                : "Le mode d'échec classique de la communication parents : 30 familles, 30 mails avec des questions légèrement différentes, et vous rédigez 30 variantes de la même réponse. La solution n'est pas « envoyer moins de mails » mais « mettre la réponse là où les parents peuvent la trouver eux-mêmes ». Un itinéraire partagé qu'ils peuvent consulter à tout moment — avec le point de rendez-vous, le programme quotidien, l'adresse de l'hébergement et le contact d'urgence — élimine 80 % des questions avant qu'elles ne soient posées."}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "For the remaining 20%, the trick is consolidation. Instead of three separate emails (permission, dietary, emergency contact), one form covers all three at signup. Parents fill it once. You see the live data immediately. Trip-day questions go in a single trip-thread, not your personal inbox. Over a 5-day overnight trip, this saves a teacher 4-6 hours of admin time."
                : "Pour les 20 % restants, l'astuce est la consolidation. Au lieu de trois mails séparés (autorisation, régime alimentaire, contact d'urgence), un seul formulaire couvre les trois à l'inscription. Les parents le remplissent une fois. Vous voyez les données en direct. Les questions du jour J vont dans un fil unique, pas dans votre boîte mail personnelle. Sur un séjour de 5 jours, vous économisez 4 à 6 heures de temps administratif."}
            </p>
          </div>
        </section>

        {/* ━━━ SAFETY ━━━ */}
        <FadeIn>
          <section id="safety" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Safety, Ratios and Chaperone Roles" : "Sécurité, Taux d'Encadrement et Rôles des Accompagnateurs"}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Most education ministries publish required adult-to-student ratios — typically 1:10 for primary school overnight trips, 1:15 for secondary. Confirm yours before you commit numbers to the parents. Once you have the chaperone team, assign each of them to a specific subgroup of students and make those assignments visible inside the trip. Each chaperone then sees on their phone exactly which students are theirs, with dietary info and emergency contacts pre-loaded."
                  : "La plupart des autorités éducatives publient des taux d'encadrement obligatoires — typiquement 1:10 pour le primaire en séjour, 1:15 pour le secondaire. Confirmez le vôtre avant d'annoncer un effectif aux parents. Une fois l'équipe d'accompagnateurs constituée, assignez chacun à un sous-groupe d'élèves spécifique et rendez ces assignations visibles dans le voyage. Chaque accompagnateur voit alors sur son téléphone exactement quels élèves sont les siens, avec régimes et contacts d'urgence pré-chargés."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Headcounts at every transition (boarding the bus, entering a venue, leaving an activity) are the single most important habit on a school trip. Build them into the schedule as actual checkpoints, not as something a teacher will improvise. With a shared roster, the count takes 30 seconds and any missing student is flagged immediately, not three stops later."
                  : "Les comptages à chaque transition (montée dans le bus, entrée d'un site, sortie d'activité) sont l'habitude la plus importante d'un voyage scolaire. Inscrivez-les dans le planning comme de vrais points de contrôle, pas comme quelque chose que l'enseignant improvisera. Avec une liste partagée, le comptage prend 30 secondes et tout élève manquant est signalé immédiatement, pas trois arrêts plus tard."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "For severe allergies or medical conditions, attach the documentation directly to the participant. Chaperones can pull it up offline if their phone has cell service — and the on-site venue staff (a hotel, a restaurant, a museum guide) can be shown the relevant info immediately. This single move has prevented more than one mid-trip ER visit."
                  : "Pour les allergies sévères ou conditions médicales, attachez la documentation directement au participant. Les accompagnateurs peuvent y accéder hors ligne, même si leur téléphone n'a pas de réseau — et le personnel sur place (hôtel, restaurant, guide de musée) peut voir l'info pertinente immédiatement. Ce geste tout simple a évité plus d'un passage aux urgences en milieu de séjour."}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ FAQ ━━━ */}
        <section id="faq" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-10 text-center">
              {isEn ? "Frequently Asked Questions" : "Questions Fréquemment Posées"}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <details key={i} className="group bg-[#FFFBF5] border border-[#001E13]/10 rounded-2xl px-6 py-4">
                  <summary className="cursor-pointer list-none flex justify-between items-start gap-4">
                    <span className="text-[#001E13] font-londrina-solid text-lg lg:text-xl">{item.q}</span>
                    <span className="text-[#F6391A] text-2xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-[#001E13]/75 font-karla text-base lg:text-lg leading-[1.7] mt-4">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ DISCOVER MORE ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-[#FFFBF5]">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
              {isEn ? "Discover More" : "Découvrir aussi"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href={`/${locale}/team-building`} className="bg-white border border-[#001E13]/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                  {isEn ? "Team Building" : "Team Building"}
                </h3>
                <p className="text-[#001E13]/70 font-karla text-sm">{isEn ? "For corporate retreats." : "Pour les séminaires d'entreprise."}</p>
              </Link>
              <Link href={`/${locale}/family-trip`} className="bg-white border border-[#001E13]/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                  {isEn ? "Family Trip" : "Voyage en Famille"}
                </h3>
                <p className="text-[#001E13]/70 font-karla text-sm">{isEn ? "For multi-generational getaways." : "Pour les voyages multi-générations."}</p>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="bg-white border border-[#001E13]/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                  {isEn ? "Group Trip Guide" : "Guide Voyage de Groupe"}
                </h3>
                <p className="text-[#001E13]/70 font-karla text-sm">{isEn ? "The full step-by-step guide." : "Le guide complet étape par étape."}</p>
              </Link>
              <Link href={`/${locale}/alternatives`} className="bg-white border border-[#001E13]/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                  {isEn ? "App Comparison" : "Comparatif Apps"}
                </h3>
                <p className="text-[#001E13]/70 font-karla text-sm">{isEn ? "Compared with other planners." : "Face aux autres planificateurs."}</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="bg-[#F6391A] py-20 lg:py-28 px-6 lg:px-12 mx-3 lg:mx-[60px] rounded-[24px] lg:rounded-[40px] mb-6">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
              {isEn ? "Run Your Next School Trip From One Place" : "Pilotez Votre Prochain Voyage Scolaire Depuis un Seul Endroit"}
            </h2>
            <p className="text-[#FFFBF5]/90 font-karla text-base lg:text-lg mb-8">
              {isEn
                ? "Free for teachers. No app for parents to install. Set up your trip in 5 minutes."
                : "Gratuit pour les enseignants. Aucune appli à installer pour les parents. Configurez votre voyage en 5 minutes."}
            </p>
            <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} rel="nofollow">
              <PulsatingButton className="font-karla font-bold">
                {isEn ? "Start a school trip" : "Commencer un voyage scolaire"}
              </PulsatingButton>
            </Link>
          </div>
        </section>

      </main>

      <Footer footerData={footerData} />
    </>
  );
}
