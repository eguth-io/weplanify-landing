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

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/family-trip";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "Plan a Family Trip — Vacation Planner for Families | WePlanify"
    : "Voyage en Famille — Planificateur de Vacances Familiales | WePlanify";
  const description = isEn
    ? "Plan your next family vacation with WePlanify. Coordinate across generations, manage shared budgets, vote on activities, and build an itinerary everyone agrees on."
    : "Organisez vos vacances en famille avec WePlanify. Coordonnez entre les générations, gérez le budget commun, votez pour les activités et créez un itinéraire qui convient à tous.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    ...metadata,
    title,
    description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: {
      canonical: currentUrl,
      languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` },
    },
  };
}

export default async function FamilyTripPage({ params }: Props) {
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
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Accueil", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEn ? "Family Trip" : "Voyage en Famille", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn ? "Plan a Family Trip Everyone Will Love" : "Organisez un Voyage en Famille que Tout le Monde Adorera",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-03-19",
    dateModified: "2026-03-31",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const faqItems = isEn
    ? [
        { q: "What's the best age to start family group trips?", a: "Any age works, but the logistics change significantly. Under 5, keep destinations close and schedules flexible. Ages 5-12 are the sweet spot for adventure — kids are curious and adaptable. Teenagers prefer more independence, so build in free time. WePlanify lets you structure the itinerary differently for each age group within the same trip." },
        { q: "How do you handle different budgets within a family?", a: "Extended family trips often mean very different financial situations. The key is transparency. Use WePlanify's budget tracker to separate shared costs (accommodation, transport) from optional activities. Some families create a shared kitty for group meals while letting individual households handle their own extras." },
        { q: "How far ahead should we plan a family vacation?", a: "For domestic trips, 2-3 months is usually enough. International trips with extended family need 4-6 months minimum — everyone needs time to request leave, budget, and handle passports. Start a WePlanify trip early even if details aren't final. Having a shared space keeps momentum alive." },
        { q: "How do we pick a destination that works for all ages?", a: "Use polls. Seriously. Let each household suggest two options, then vote. WePlanify's group polls remove the social pressure of in-person debates. Focus on destinations with variety — places where grandparents can relax while kids explore and parents get a mix of both." },
        { q: "What if family members disagree on the itinerary?", a: "Build the 70/30 rule into your plan: 70% structured group activities, 30% free time where each sub-group does their own thing. Not every moment needs to be together. A morning at the pool for the kids while grandparents visit a museum is perfectly fine — and often better for everyone." },
        { q: "Can WePlanify handle multi-household family trips?", a: "Yes. Every family member joins the same trip with a shared link. Everyone can see the itinerary, vote in polls, and track shared expenses. You can organize the itinerary by day with both group activities and sub-group options clearly marked." },
      ]
    : [
        { q: "À quel âge commencer les voyages de groupe en famille ?", a: "Tous les âges fonctionnent, mais la logistique change. Moins de 5 ans, restez proches et gardez un planning flexible. De 5 à 12 ans, c'est le moment idéal — les enfants sont curieux et adaptables. Les ados préfèrent plus d'indépendance, prévoyez du temps libre. WePlanify vous permet de structurer l'itinéraire différemment pour chaque tranche d'âge." },
        { q: "Comment gérer les budgets différents au sein d'une famille ?", a: "Les voyages en famille élargie impliquent souvent des situations financières très différentes. La clé est la transparence. Utilisez le suivi de budget WePlanify pour séparer les frais communs (hébergement, transport) des activités optionnelles. Certaines familles créent une cagnotte pour les repas de groupe tout en laissant chaque foyer gérer ses extras." },
        { q: "Combien de temps avant faut-il planifier ?", a: "Pour les voyages nationaux, 2-3 mois suffisent. Les voyages internationaux en famille élargie nécessitent 4-6 mois minimum — chacun a besoin de temps pour poser ses congés, budgéter et gérer les passeports. Créez un voyage WePlanify tôt, même si les détails ne sont pas finalisés." },
        { q: "Comment choisir une destination pour tous les âges ?", a: "Utilisez les sondages. Laissez chaque foyer proposer deux options, puis votez. Les sondages WePlanify suppriment la pression sociale des débats en personne. Privilégiez les destinations variées — des endroits où les grands-parents peuvent se détendre pendant que les enfants explorent." },
        { q: "Et si des membres de la famille ne sont pas d'accord sur le programme ?", a: "Appliquez la règle du 70/30 : 70% d'activités de groupe structurées, 30% de temps libre où chaque sous-groupe fait ce qu'il veut. Une matinée à la piscine pour les enfants pendant que les grands-parents visitent un musée, c'est parfaitement normal — et souvent mieux pour tout le monde." },
        { q: "WePlanify gère-t-il les voyages familiaux multi-foyers ?", a: "Oui. Chaque membre de la famille rejoint le même voyage avec un lien partagé. Tout le monde peut voir l'itinéraire, voter et suivre les dépenses communes. Vous pouvez organiser le programme par jour avec les activités de groupe et les options par sous-groupe clairement marquées." },
      ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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
                { label: isEn ? "Family Trip" : "Voyage en Famille" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "Family Travel" : "Voyage en Famille"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "Plan a Family Trip Everyone Will Actually Love"
                : "Organisez un Voyage en Famille que Tout le Monde Adorera Vraiment"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? "From grandparents to toddlers, family trips mean different needs, different budgets, and different ideas of fun. Here's how to make it work without losing your mind."
                : "Des grands-parents aux tout-petits, les voyages en famille signifient des besoins différents, des budgets différents et des idées de fun très différentes. Voici comment y arriver sans perdre la tête."}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">
              {isEn ? "8 min read" : "8 min de lecture"}
            </p>
            <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-31" />
          </div>
        </section>

        {/* ━━━ THE CHALLENGE ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8] mb-8">
              {isEn
                ? "Family trips are the best kind of travel — and the hardest to organize. Dad wants hiking, Mom wants the beach, the teenagers want Wi-Fi, the kids want a water park, and grandma just wants everyone in the same room for dinner. Finding a plan that works across three generations without spreadsheets and a group chat meltdown? That's the real vacation challenge."
                : "Les voyages en famille sont les meilleurs — et les plus difficiles à organiser. Papa veut de la rando, Maman veut la plage, les ados veulent du Wi-Fi, les enfants veulent un parc aquatique, et mamie veut juste que tout le monde soit à table pour le dîner. Trouver un plan qui convient à trois générations sans tableurs et sans explosion du chat de groupe ? C'est le vrai défi des vacances."}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8] mb-8">
              {isEn
                ? "Then there's the money. Accommodation for 10+ people. Activities for all ages. Meals that satisfy everyone from the picky five-year-old to the vegan aunt. When multiple households share costs, tracking who paid what becomes a full-time job — and nobody wants to be the one asking Uncle Marc for his share of the Airbnb."
                : "Et puis il y a l'argent. L'hébergement pour plus de 10 personnes. Les activités pour tous les âges. Les repas qui satisfont tout le monde, du gamin de cinq ans difficile à la tante végane. Quand plusieurs foyers partagent les frais, suivre qui a payé quoi devient un boulot à plein temps — et personne ne veut être celui qui réclame sa part de l'Airbnb à l'oncle Marc."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify gives your family one shared space to plan, vote, budget, and pack — so the organizer doesn't burn out before the trip even starts."
                : "WePlanify donne à votre famille un seul espace partagé pour planifier, voter, budgéter et préparer les bagages — pour que l'organisateur ne craque pas avant même le départ."}
            </p>
            <p className="text-[#001E13]/70 text-base font-karla leading-[1.8] mt-6">
              {isEn ? (
                <>Need a structured approach? Our <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#F6391A] hover:underline underline-offset-4">step-by-step guide to planning a group trip</Link> covers the full process from first idea to departure day.</>
              ) : (
                <>Besoin d'une méthode structurée ? Notre <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#F6391A] hover:underline underline-offset-4">guide étape par étape pour organiser un voyage de groupe</Link> couvre tout le processus, de la première idée au jour du départ.</>
              )}
            </p>
          </div>
        </section>

        {/* ━━━ PLANNING BY AGE GROUP ━━━ */}
        <FadeIn>
          <section className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-12 lg:mb-16">
                {isEn ? "Planning by Age Group" : "Planifier par Tranche d'Âge"}
              </h2>
              <div className="space-y-10 lg:space-y-14">
                {(isEn
                  ? [
                      { age: "0–4", title: "Babies & Toddlers", text: "Keep it close, keep it flexible. Short flights or drives, accommodation with kitchen access, and a schedule with generous nap windows. The packing list is critical — shared lists prevent you from forgetting the one thing you actually need.", color: "bg-[#61DBD5]" },
                      { age: "5–12", title: "Kids", text: "The golden age of family travel. They're curious, adaptable, and excited about everything. Mix structured activities (water parks, museums, boat trips) with free exploration. Use polls to let them vote on activities — they'll feel included and you'll avoid meltdowns.", color: "bg-[#EEF899]" },
                      { age: "13–17", title: "Teenagers", text: "They want independence but still need structure. Build free time into the itinerary where they can explore on their own. Give them a voice in planning — if they helped choose the restaurant, they're far less likely to complain about it.", color: "bg-[#F6391A]" },
                      { age: "60+", title: "Grandparents", text: "Comfort, pace, and accessibility matter. Avoid over-packed days. Include restful options alongside group activities — a morning at a café while others hike is perfectly fine. Having the full itinerary visible in advance helps them prepare mentally and physically.", color: "bg-[#61DBD5]" },
                    ]
                  : [
                      { age: "0–4", title: "Bébés & Tout-petits", text: "Restez proche, restez flexible. Vols courts ou route, hébergement avec cuisine et un planning avec de généreuses fenêtres de sieste. La liste de bagages est critique — les listes partagées évitent d'oublier la seule chose dont vous avez vraiment besoin.", color: "bg-[#61DBD5]" },
                      { age: "5–12", title: "Enfants", text: "L'âge d'or du voyage en famille. Ils sont curieux, adaptables et enthousiastes. Mélangez activités structurées (parcs aquatiques, musées, sorties bateau) avec de l'exploration libre. Utilisez les sondages pour les laisser voter — ils se sentiront inclus et vous éviterez les crises.", color: "bg-[#EEF899]" },
                      { age: "13–17", title: "Adolescents", text: "Ils veulent de l'indépendance mais ont encore besoin de structure. Intégrez du temps libre dans l'itinéraire. Donnez-leur une voix dans la planification — s'ils ont aidé à choisir le restaurant, ils se plaindront beaucoup moins.", color: "bg-[#F6391A]" },
                      { age: "60+", title: "Grands-parents", text: "Le confort, le rythme et l'accessibilité comptent. Évitez les journées surchargées. Incluez des options reposantes à côté des activités de groupe — une matinée au café pendant que les autres randonnent, c'est très bien. Avoir l'itinéraire complet visible à l'avance les aide à se préparer.", color: "bg-[#61DBD5]" },
                    ]
                ).map((group, i) => (
                  <div key={i} className="flex gap-5 lg:gap-8 items-start">
                    <div className={`${group.color} w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[#001E13] text-sm lg:text-base font-londrina-solid">{group.age}</span>
                    </div>
                    <div>
                      <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-2">{group.title}</h3>
                      <p className="text-[#FFFBF5]/60 text-sm lg:text-base font-karla leading-[1.8]">{group.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ HOW WEPLANIFY HELPS ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {isEn ? "How WePlanify Helps Families" : "Comment WePlanify Aide les Familles"}
            </h2>
            <div className="space-y-6">
              {(isEn
                ? [
                    ["Everyone gets a vote", "Destination, activities, restaurants — create polls and let each family member (yes, even the kids) have a say. Results are instant and final. No more circular dinner-table debates.", "/features/polls"],
                    ["One shared itinerary", "Build the day-by-day plan together. Mark activities by age suitability so everyone knows what's for the whole family vs. what's optional. Changes sync in real time — no outdated PDFs.", "/features/planning"],
                    ["Budget without the awkwardness", "Track shared expenses across households. Log who paid for what, split costs however you want, and see the balance in real time. The money conversation happens once, not twenty times.", "/features/budget"],
                    ["Packing coordination", "Create shared packing lists so three families don't show up with five bottles of sunscreen and no first-aid kit. Assign group items to specific people and check them off as you pack.", "/features/packing"],
                  ]
                : [
                    ["Chacun a droit de vote", "Destination, activités, restaurants — créez des sondages et laissez chaque membre de la famille (oui, même les enfants) s'exprimer. Les résultats sont instantanés et définitifs. Fini les débats sans fin à table.", "/features/polls"],
                    ["Un seul itinéraire partagé", "Construisez le programme jour par jour ensemble. Marquez les activités par tranche d'âge pour que chacun sache ce qui est pour toute la famille vs. optionnel. Les modifications se synchronisent en temps réel.", "/features/planning"],
                    ["Le budget sans la gêne", "Suivez les dépenses partagées entre foyers. Enregistrez qui a payé quoi, répartissez les coûts comme vous voulez et voyez le solde en temps réel. La conversation sur l'argent a lieu une seule fois, pas vingt.", "/features/budget"],
                    ["Coordination des bagages", "Créez des listes de bagages partagées pour que trois familles n'arrivent pas avec cinq bouteilles de crème solaire et zéro trousse de secours. Assignez les objets communs à des personnes précises.", "/features/packing"],
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

        {/* ━━━ PULL QUOTE ━━━ */}
        <section className="bg-[#EEF899] py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-[#001E13] text-[24px] lg:text-[44px] font-londrina-solid leading-[1.12]">
              {isEn
                ? "The best family vacations aren't the ones where everything goes perfectly — they're the ones where everyone felt included in the planning."
                : "Les meilleures vacances en famille ne sont pas celles où tout se passe parfaitement — ce sont celles où tout le monde s'est senti inclus dans la planification."}
            </p>
          </div>
        </section>

        {/* ━━━ CHOOSING THE RIGHT DESTINATION ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {isEn ? "Choosing the Right Destination for Families" : "Choisir la Bonne Destination en Famille"}
            </h2>
            <div className="space-y-6">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Picking a destination when you're travelling as a couple is one thing. Picking one that works for a baby, two teenagers, and grandparents with bad knees is a completely different game. The first filter should always be practical: how long is the flight? Anything over four hours with a toddler deserves serious consideration. If half the group has limited mobility, a city built on hills or cobblestones may look charming in photos but feel miserable on day two."
                  : "Choisir une destination à deux, c'est une chose. En trouver une qui convient à un bébé, deux ados et des grands-parents avec des genoux fragiles, c'est un tout autre exercice. Le premier filtre doit toujours être pratique : combien de temps dure le vol ? Au-delà de quatre heures avec un tout-petit, il faut bien peser le pour et le contre. Si une partie du groupe a des difficultés de mobilité, une ville construite sur des collines pavées aura beau être charmante en photo, elle deviendra pénible dès le deuxième jour."}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Healthcare access matters more than most people think. Travelling with young children or elderly relatives means you need to know where the nearest hospital is and whether your insurance covers the country. Destinations with good tourism infrastructure — Portugal, Japan, Croatia — tend to score well on both family-friendliness and medical accessibility."
                  : "L'accès aux soins médicaux compte plus qu'on ne le croit. Voyager avec de jeunes enfants ou des parents âgés implique de savoir où se trouve l'hôpital le plus proche et si votre assurance couvre le pays. Les destinations avec une bonne infrastructure touristique — le Portugal, le Japon, la Croatie — cochent généralement les deux cases : accueil des familles et accessibilité médicale."}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Think about accommodation early. Families need space — not just rooms, but common areas where the group can gather without sitting on each other. A villa with a pool, a large gîte, or adjoining apartments often work better than a block of hotel rooms. Look for places with kitchen access: eating out three meals a day with kids gets expensive and exhausting fast."
                  : "Pensez à l'hébergement tôt. Les familles ont besoin d'espace — pas seulement des chambres, mais des espaces communs où le groupe peut se retrouver sans se marcher dessus. Une villa avec piscine, un grand gîte ou des appartements mitoyens fonctionnent souvent mieux qu'un bloc de chambres d'hôtel. Cherchez des logements avec cuisine : manger au restaurant trois fois par jour avec des enfants, ça devient vite épuisant et coûteux."}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn ? (
                  <>Finally, prioritize destinations that offer activities for all ages. A beach resort with nearby hiking trails, cultural sites, and a town centre gives everyone options without requiring a car for every outing. When the destination itself is versatile, the <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline underline-offset-4">day-by-day planning</Link> becomes much easier — and there are fewer arguments about what to do. If you can't agree on the destination itself, <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline underline-offset-4">group polls</Link> take the pressure off and let everyone weigh in fairly.</>
                ) : (
                  <>Enfin, privilégiez les destinations qui proposent des activités pour tous les âges. Une station balnéaire avec des sentiers de randonnée à proximité, des sites culturels et un centre-ville offre des options à chacun sans nécessiter une voiture pour chaque sortie. Quand la destination elle-même est polyvalente, la <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline underline-offset-4">planification jour par jour</Link> devient bien plus simple — et il y a moins de disputes sur le programme. Si vous n'arrivez pas à vous mettre d'accord sur la destination, les <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline underline-offset-4">sondages de groupe</Link> désamorcent la pression et permettent à chacun de s'exprimer.</>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ BUDGETING A MULTI-GENERATIONAL TRIP ━━━ */}
        <FadeIn>
          <section className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12">
            <div className="max-w-[900px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
                {isEn ? "Budgeting a Multi-Generational Trip" : "Gérer le Budget d'un Voyage Multi-Générationnel"}
              </h2>
              <div className="space-y-6">
                <p className="text-[#FFFBF5]/70 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn
                    ? "Money is where family trips get uncomfortable. Grandparents may want a nice hotel with breakfast included. Parents are watching every euro because they've just paid for school fees. Young couples without kids don't understand why the villa needs to cost that much. And nobody wants to be the one who brings up the budget — so it festers until someone passive-aggressively Venmos the wrong amount. The fix is simple: talk about money before you book anything, and use a shared tool so the numbers are visible to everyone."
                    : "L'argent, c'est là que les voyages en famille deviennent gênants. Les grands-parents veulent un bel hôtel avec petit-déjeuner inclus. Les parents surveillent chaque euro parce qu'ils viennent de payer les frais scolaires. Les jeunes couples sans enfants ne comprennent pas pourquoi la villa doit coûter autant. Et personne ne veut être celui qui aborde la question du budget — alors ça mijote jusqu'à ce que quelqu'un fasse un virement passif-agressif du mauvais montant. La solution est simple : parlez d'argent avant de réserver quoi que ce soit, et utilisez un outil partagé pour que les chiffres soient visibles par tous."}
                </p>
                <p className="text-[#FFFBF5]/70 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn ? (
                    <>Start by separating shared costs from personal ones. Accommodation and transport are usually split equally (or proportionally by household size). Meals can go either way — some families prefer a shared food kitty, others pay separately. Activities should be opt-in: don't force the grandparents to pay for the zip-lining they'll never do. A <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">shared budget tracker</Link> makes these splits transparent and avoids the dreaded end-of-trip reckoning.</>
                  ) : (
                    <>Commencez par séparer les frais communs des dépenses personnelles. L'hébergement et le transport se partagent généralement à parts égales (ou proportionnellement à la taille du foyer). Les repas, ça dépend — certaines familles préfèrent une cagnotte commune, d'autres paient séparément. Les activités devraient être optionnelles : n'obligez pas les grands-parents à payer la tyrolienne qu'ils ne feront jamais. Un <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">suivi de budget partagé</Link> rend ces répartitions transparentes et évite le règlement de comptes redouté en fin de voyage.</>
                  )}
                </p>
                <p className="text-[#FFFBF5]/70 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn ? (
                    <>One approach that works well for multi-generational trips: let each household set their own comfort level, then find overlap. If grandparents want a nicer room, they pay the difference. If parents want to cook half the meals to save money, build that into the itinerary. The goal isn't to make everyone spend the same — it's to make sure nobody feels resentful. For a deeper look at how other groups handle this, check out our article on the <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline underline-offset-4">best apps for group travel planning</Link>.</>
                  ) : (
                    <>Une approche qui fonctionne bien pour les voyages multi-générations : laissez chaque foyer définir son niveau de confort, puis trouvez le terrain d'entente. Si les grands-parents veulent une plus belle chambre, ils paient la différence. Si les parents veulent cuisiner la moitié des repas pour économiser, intégrez ça dans le programme. L'objectif n'est pas que tout le monde dépense pareil — c'est que personne ne se sente lésé. Pour aller plus loin sur la façon dont d'autres groupes gèrent ça, consultez notre article sur les <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline underline-offset-4">meilleures applications de voyage en groupe</Link>.</>
                  )}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

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
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
              {isEn ? "Discover More" : "Découvrir aussi"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Trip with Friends" : "Voyage entre Amis"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan a group trip with friends effortlessly." : "Organisez un voyage entre amis facilement."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/road-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Road Trip" : "Road Trip"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan a group road trip with shared routes and budgets." : "Organisez un road trip de groupe avec itinéraire et budget partagés."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Group Trip Guide" : "Guide Voyage de Groupe"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "The complete step-by-step guide." : "Le guide complet étape par étape."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read the guide →" : "Lire le guide →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Best Group Travel Apps" : "Meilleures Applis Voyage de Groupe"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "The top tools for planning trips together." : "Les meilleurs outils pour planifier un voyage ensemble."}</p>
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
                {isEn ? "Your Family Trip Starts Here" : "Votre Voyage en Famille Commence Ici"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn
                  ? "Get everyone on the same page — literally. Start planning your next family vacation together."
                  : "Mettez tout le monde sur la même page — littéralement. Commencez à planifier vos prochaines vacances en famille ensemble."}
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
