import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/about";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const aboutMeta = {
  en: {
    title: "About WePlanify — Our Mission & Team | WePlanify",
    description:
      "WePlanify is the group trip planner built for friends, families, and teams. Learn about our mission, our team, and why we're building the future of collaborative travel planning.",
  },
  fr: {
    title: "À Propos de WePlanify — Notre Mission & Équipe | WePlanify",
    description:
      "WePlanify est le planificateur de voyage de groupe conçu pour les amis, les familles et les équipes. Découvrez notre mission, notre équipe et pourquoi nous construisons le futur de la planification collaborative.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "fr" ? aboutMeta.fr : aboutMeta.en;
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    title: l.title,
    description: l.description,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title: l.title,
      description: l.description,
    },
    twitter: { card: "summary_large_image", title: l.title, description: l.description },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/en${PATHNAME}`,
        fr: `${SITE_URL}/fr${PATHNAME}`,
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === "en";

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WePlanify",
    url: SITE_URL,
    description: isEn ? aboutMeta.en.description : aboutMeta.fr.description,
    foundingDate: "2025",
    founder: { "@type": "Person", name: "WePlanify Team" },
    sameAs: [
      "https://www.instagram.com/weplanify",
      "https://www.tiktok.com/@weplanify",
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Accueil", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEn ? "About" : "À Propos", item: `${SITE_URL}/${locale}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ OPENING ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-24 lg:pb-40 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-8">
              {isEn ? "About WePlanify" : "À propos de WePlanify"}
            </p>
            <h1 className="text-[#001E13] text-[40px] lg:text-[72px] xl:text-[88px] font-londrina-solid leading-[1.0] mb-0">
              {isEn
                ? "We make group trips happen."
                : "On fait que les voyages de groupe se réalisent."}
            </h1>
          </div>
        </section>

        {/* ━━━ THE FRUSTRATION ━━━ */}
        <section className="pb-20 lg:pb-32 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8] mb-8">
              {isEn
                ? "It starts the same way every time. Someone drops \"we should do a trip\" in the group chat. Everyone gets excited. Then comes the hard part: actually making it happen."
                : "Ça commence toujours de la même façon. Quelqu'un lâche « on devrait partir en voyage » dans le groupe. Tout le monde s'emballe. Et puis vient la partie difficile : le faire vraiment."}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8] mb-8">
              {isEn
                ? "Dates don't align. Budgets clash. Decisions get lost in WhatsApp. One person ends up doing all the work. The trip gets postponed. Again."
                : "Les dates ne collent pas. Les budgets divergent. Les décisions se perdent dans WhatsApp. Une personne finit par tout organiser. Le voyage est repoussé. Encore."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "We built WePlanify because we got tired of watching good trips die in group chats."
                : "On a construit WePlanify parce qu'on en avait marre de voir de bons voyages mourir dans des chats de groupe."}
            </p>
          </div>
        </section>

        {/* ━━━ PULL QUOTE ━━━ */}
        <section className="bg-[#001E13] py-24 lg:py-36 px-6 lg:px-12">
          <div className="max-w-[1100px] mx-auto">
            <p className="text-[#EEF899] text-[32px] lg:text-[56px] xl:text-[68px] font-londrina-solid leading-[1.08]">
              {isEn
                ? "One place to vote, plan, budget, and pack — so that the person who organizes doesn't have to carry it alone."
                : "Un seul endroit pour voter, planifier, budgéter et préparer — pour que celui qui organise n'ait pas à tout porter seul."}
            </p>
          </div>
        </section>

        {/* ━━━ WHAT WE DO ━━━ */}
        <section className="py-24 lg:py-36 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[32px] lg:text-[52px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {isEn ? "What WePlanify does" : "Ce que fait WePlanify"}
            </h2>
            <div className="space-y-6">
              {(isEn
                ? [
                    ["Collaborative itineraries", "Everyone adds ideas. The group builds the plan together, day by day."],
                    ["Group polls", "Can't agree? Vote. Destination, dates, restaurants — democracy wins."],
                    ["Shared budgets", "Track who paid what. Split costs. No spreadsheets, no awkward conversations after."],
                    ["Packing lists", "Coordinate who brings what. Stop showing up with three corkscrews and no first-aid kit."],
                    ["4 languages", "English, French, Spanish, Italian. Your group speaks different languages? So do we."],
                  ]
                : [
                    ["Itinéraires collaboratifs", "Chacun ajoute ses idées. Le groupe construit le plan ensemble, jour par jour."],
                    ["Sondages de groupe", "Pas d'accord ? Votez. Destination, dates, restos — la démocratie l'emporte."],
                    ["Budgets partagés", "Suivez qui a payé quoi. Répartissez les frais. Sans tableur, sans conversation gênante après."],
                    ["Listes de bagages", "Coordonnez qui apporte quoi. Fini les trois tire-bouchons et zéro trousse de secours."],
                    ["4 langues", "Anglais, français, espagnol, italien. Votre groupe parle différentes langues ? Nous aussi."],
                  ]
              ).map(([title, desc], i) => (
                <div key={i} className="flex gap-5 lg:gap-8 items-baseline">
                  <span className="text-[#F6391A] font-londrina-solid text-[28px] lg:text-[36px] leading-none flex-shrink-0 w-8 lg:w-10 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-[#001E13]/10 pt-5 flex-1">
                    <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-1.5">
                      {title}
                    </h3>
                    <p className="text-[#001E13]/65 text-base lg:text-lg font-karla leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ LANGUAGES STRIP ━━━ */}
        <section className="bg-[#61DBD5] py-10 lg:py-12 px-6 lg:px-12">
          <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-6 lg:gap-14">
            {[
              { flag: "🇬🇧", name: "English" },
              { flag: "🇫🇷", name: "Français" },
              { flag: "🇪🇸", name: "Español" },
              { flag: "🇮🇹", name: "Italiano" },
            ].map((lang) => (
              <span key={lang.name} className="flex items-center gap-2.5">
                <span className="text-2xl lg:text-3xl">{lang.flag}</span>
                <span className="text-[#001E13] font-karla font-bold text-base lg:text-lg">
                  {lang.name}
                </span>
              </span>
            ))}
          </div>
        </section>

        {/* ━━━ WHY NOT THE OTHERS ━━━ */}
        <section className="py-24 lg:py-36 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[32px] lg:text-[52px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {isEn
                ? "Why not just use WhatsApp?"
                : "Pourquoi ne pas juste utiliser WhatsApp ?"}
            </h2>
            <div className="space-y-8">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Because WhatsApp is for chatting, not for planning. Decisions get buried. Links get lost. The person who scrolls back to find \"that restaurant someone mentioned Tuesday\" shouldn't need to be an archaeologist."
                  : "Parce que WhatsApp, c'est fait pour discuter, pas pour planifier. Les décisions se perdent. Les liens disparaissent. La personne qui remonte le fil pour retrouver « ce resto dont quelqu'un a parlé mardi » ne devrait pas avoir besoin d'être archéologue."}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Google Sheets is powerful but nobody opens it. Splitwise tracks money but not plans. TripIt is built for solo travelers. None of them solve the real problem: getting a group of people to make decisions together and stick to them."
                  : "Google Sheets est puissant mais personne ne l'ouvre. Splitwise suit l'argent mais pas les plans. TripIt est fait pour les voyageurs solo. Aucun d'entre eux ne résout le vrai problème : amener un groupe de personnes à prendre des décisions ensemble et à s'y tenir."}
              </p>
              <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
                {isEn
                  ? "WePlanify is the only tool built for groups from day one. Not adapted for groups. Built for them."
                  : "WePlanify est le seul outil conçu pour les groupes depuis le premier jour. Pas adapté aux groupes. Construit pour eux."}
              </p>
            </div>
          </div>
        </section>


        {/* ━━━ CTA ━━━ */}
        <section className="py-28 lg:py-40 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="text-[#001E13] text-[36px] lg:text-[60px] font-londrina-solid leading-[1.05] mb-6">
              {isEn
                ? "Your next trip is waiting."
                : "Votre prochain voyage vous attend."}
            </h2>
            <p className="text-[#001E13]/60 text-base lg:text-lg font-karla leading-relaxed mb-10 max-w-[500px] mx-auto">
              {isEn
                ? "Stop planning in group chats. Start planning together."
                : "Arrêtez de planifier dans des chats de groupe. Commencez à planifier ensemble."}
            </p>
            <div className="flex justify-center">
              <Link href="https://app.weplanify.com/register">
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-10 py-3.5">
                  {isEn ? "Start planning" : "Commencer"}
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer footerData={footerData} />
    </>
  );
}
