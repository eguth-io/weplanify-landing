import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/Breadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://www.weplanify.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const currentUrl = `${SITE_URL}/${locale}/privacy-policy`;

  return {
    title: isFr ? "Politique de confidentialit\u00e9 | WePlanify" : "Privacy Policy | WePlanify",
    description: isFr
      ? "D\u00e9couvrez comment WePlanify collecte, utilise et prot\u00e8ge vos donn\u00e9es personnelles."
      : "Learn how WePlanify collects, uses and protects your personal data.",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/en/privacy-policy`,
        fr: `${SITE_URL}/fr/privacy-policy`,
        "x-default": `${SITE_URL}/en/privacy-policy`,
      },
    },
  };
}

const content = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 5, 2026",
    sections: [
      {
        title: "1. Data Controller",
        body: "WePlanify is operated by WePlanify SAS. For any questions regarding your personal data, you can contact us at privacy@weplanify.com.",
      },
      {
        title: "2. Data We Collect",
        body: "We collect the following data depending on your interactions with our services:",
        list: [
          "Email address \u2014 when you sign up for the beta or subscribe to launch notifications.",
          "Technical data \u2014 IP address and browser information, collected automatically when you use our AI trip planner or visit our website.",
          "Usage data \u2014 anonymous analytics collected via cookies (with your consent) to improve our service.",
        ],
      },
      {
        title: "3. How We Use Your Data",
        body: "Your data is used exclusively for the following purposes:",
        list: [
          "To notify you about beta access and product launches (only if you opted in).",
          "To protect our services against bots and abuse (via Cloudflare Turnstile).",
          "To analyze anonymous usage patterns and improve the user experience.",
        ],
      },
      {
        title: "4. Legal Basis (GDPR)",
        body: "We process your personal data based on:",
        list: [
          "Your consent \u2014 for beta signup notifications and analytics cookies.",
          "Legitimate interest \u2014 for security, bot prevention, and fraud protection.",
        ],
      },
      {
        title: "5. Data Sharing",
        body: "We never sell your personal data. We share data with the following service providers, all bound by data processing agreements:",
        list: [
          "Resend (USA) \u2014 transactional email delivery (receives your email address).",
          "Google Analytics via Google Tag Manager (USA) \u2014 anonymous usage analytics (with your consent).",
          "Cloudflare Turnstile (USA) \u2014 bot protection (receives your IP address).",
        ],
      },
      {
        title: "6. International Data Transfers",
        body: "Some of our service providers are located in the United States. For these transfers, we rely on the EU-US Data Privacy Framework (adequacy decision of July 2023) where the provider is certified, or Standard Contractual Clauses (Art. 46(2)(c) GDPR) otherwise.",
      },
      {
        title: "7. Data Retention",
        body: "Beta signup emails are retained until the beta launch and for up to 12 months after, then deleted. Technical data (IP addresses) collected via the AI trip planner is automatically deleted after 90 days. Analytics data is anonymized and retained indefinitely.",
      },
      {
        title: "8. Your Rights",
        body: "Under the GDPR, you have the right to:",
        list: [
          "Access your personal data.",
          "Rectify inaccurate data.",
          "Request deletion of your data.",
          "Withdraw consent at any time.",
          "Data portability.",
          "Lodge a complaint with a supervisory authority (CNIL in France).",
        ],
        footer:
          "To exercise any of these rights, contact us at privacy@weplanify.com.",
      },
      {
        title: "9. Cookies and Local Storage",
        body: "We use the following technologies:",
        list: [
          "Google Analytics (via GTM) \u2014 anonymous usage analytics. Duration: up to 13 months. Requires your consent.",
          "Cloudflare Turnstile \u2014 bot protection. Session-only. No consent required (legitimate interest: security).",
          "weplanify_consent (localStorage) \u2014 stores your cookie consent choice. Persistent. No consent required (strictly necessary).",
        ],
        footer: "For visitors in the EEA, no analytics cookies are set before you give consent. You can withdraw consent at any time by clearing your browser storage.",
      },
      {
        title: "10. Security",
        body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
      },
      {
        title: "11. Changes to This Policy",
        body: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.",
      },
    ],
  },
  fr: {
    title: "Politique de confidentialit\u00e9",
    lastUpdated: "Derni\u00e8re mise \u00e0 jour : 5 avril 2026",
    sections: [
      {
        title: "1. Responsable du traitement",
        body: "WePlanify est op\u00e9r\u00e9 par WePlanify SAS. Pour toute question relative \u00e0 vos donn\u00e9es personnelles, vous pouvez nous contacter \u00e0 privacy@weplanify.com.",
      },
      {
        title: "2. Donn\u00e9es collect\u00e9es",
        body: "Nous collectons les donn\u00e9es suivantes selon vos interactions avec nos services :",
        list: [
          "Adresse email \u2014 lors de votre inscription \u00e0 la beta ou \u00e0 la notification de lancement.",
          "Donn\u00e9es techniques \u2014 adresse IP et informations du navigateur, collect\u00e9es automatiquement lors de l\u2019utilisation de notre planificateur IA ou de la visite de notre site.",
          "Donn\u00e9es d\u2019utilisation \u2014 statistiques anonymes collect\u00e9es via cookies (avec votre consentement) pour am\u00e9liorer notre service.",
        ],
      },
      {
        title: "3. Utilisation de vos donn\u00e9es",
        body: "Vos donn\u00e9es sont utilis\u00e9es exclusivement pour :",
        list: [
          "Vous notifier de l\u2019ouverture de la beta et des lancements produit (uniquement si vous l\u2019avez demand\u00e9).",
          "Prot\u00e9ger nos services contre les bots et les abus (via Cloudflare Turnstile).",
          "Analyser les tendances d\u2019utilisation de mani\u00e8re anonyme pour am\u00e9liorer l\u2019exp\u00e9rience utilisateur.",
        ],
      },
      {
        title: "4. Base l\u00e9gale (RGPD)",
        body: "Nous traitons vos donn\u00e9es personnelles sur la base de :",
        list: [
          "Votre consentement \u2014 pour les notifications beta et les cookies analytiques.",
          "Int\u00e9r\u00eat l\u00e9gitime \u2014 pour la s\u00e9curit\u00e9, la pr\u00e9vention des bots et la protection contre la fraude.",
        ],
      },
      {
        title: "5. Partage des donn\u00e9es",
        body: "Nous ne vendons jamais vos donn\u00e9es personnelles. Nous partageons des donn\u00e9es avec les prestataires suivants, tous li\u00e9s par des accords de traitement des donn\u00e9es :",
        list: [
          "Resend (\u00c9tats-Unis) \u2014 envoi d\u2019emails transactionnels (re\u00e7oit votre adresse email).",
          "Google Analytics via Google Tag Manager (\u00c9tats-Unis) \u2014 analytics anonymes (avec votre consentement).",
          "Cloudflare Turnstile (\u00c9tats-Unis) \u2014 protection anti-bots (re\u00e7oit votre adresse IP).",
        ],
      },
      {
        title: "6. Transferts internationaux",
        body: "Certains de nos prestataires sont situ\u00e9s aux \u00c9tats-Unis. Pour ces transferts, nous nous appuyons sur le EU-US Data Privacy Framework (d\u00e9cision d\u2019ad\u00e9quation de juillet 2023) lorsque le prestataire est certifi\u00e9, ou sur les Clauses Contractuelles Types (Art. 46(2)(c) RGPD) dans le cas contraire.",
      },
      {
        title: "7. Conservation des donn\u00e9es",
        body: "Les emails d\u2019inscription beta sont conserv\u00e9s jusqu\u2019au lancement de la beta et jusqu\u2019\u00e0 12 mois apr\u00e8s, puis supprim\u00e9s. Les donn\u00e9es techniques (adresses IP) collect\u00e9es via le planificateur IA sont automatiquement supprim\u00e9es apr\u00e8s 90 jours. Les donn\u00e9es analytiques sont anonymis\u00e9es et conserv\u00e9es ind\u00e9finiment.",
      },
      {
        title: "8. Vos droits",
        body: "Conform\u00e9ment au RGPD, vous disposez des droits suivants :",
        list: [
          "Acc\u00e9der \u00e0 vos donn\u00e9es personnelles.",
          "Rectifier des donn\u00e9es inexactes.",
          "Demander la suppression de vos donn\u00e9es.",
          "Retirer votre consentement \u00e0 tout moment.",
          "Portabilit\u00e9 des donn\u00e9es.",
          "D\u00e9poser une plainte aupr\u00e8s de la CNIL.",
        ],
        footer:
          "Pour exercer ces droits, contactez-nous \u00e0 privacy@weplanify.com.",
      },
      {
        title: "9. Cookies et stockage local",
        body: "Nous utilisons les technologies suivantes :",
        list: [
          "Google Analytics (via GTM) \u2014 analytics anonymes. Dur\u00e9e : jusqu\u2019\u00e0 13 mois. N\u00e9cessite votre consentement.",
          "Cloudflare Turnstile \u2014 protection anti-bots. Session uniquement. Pas de consentement requis (int\u00e9r\u00eat l\u00e9gitime : s\u00e9curit\u00e9).",
          "weplanify_consent (localStorage) \u2014 stocke votre choix de consentement cookies. Persistant. Pas de consentement requis (strictement n\u00e9cessaire).",
        ],
        footer: "Pour les visiteurs de l\u2019EEE, aucun cookie analytique n\u2019est d\u00e9pos\u00e9 avant votre consentement. Vous pouvez retirer votre consentement \u00e0 tout moment en vidant le stockage de votre navigateur.",
      },
      {
        title: "10. S\u00e9curit\u00e9",
        body: "Nous mettons en \u0153uvre des mesures techniques et organisationnelles appropri\u00e9es pour prot\u00e9ger vos donn\u00e9es personnelles contre tout acc\u00e8s non autoris\u00e9, modification, divulgation ou destruction.",
      },
      {
        title: "11. Modifications de cette politique",
        body: "Nous pouvons mettre \u00e0 jour cette politique de confidentialit\u00e9. Toute modification sera publi\u00e9e sur cette page avec une date de r\u00e9vision mise \u00e0 jour.",
      },
    ],
  },
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = locale === "fr" ? content.fr : content.en;

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const breadcrumbItems = [
    { label: locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
    { label: c.title },
  ];

  return (
    <>
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen bg-[#FFFBF5] pt-[100px]">
        <section className="py-12 lg:py-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />

            <h1 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mt-6 mb-2">
              {c.title}
            </h1>
            <p className="font-karla text-sm text-[#001E13]/50 mb-10">{c.lastUpdated}</p>

            <div className="space-y-8">
              {c.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-[#001E13] text-xl font-londrina-solid mb-3">
                    {section.title}
                  </h2>
                  <p className="font-karla text-[#001E13]/75 text-base leading-relaxed">
                    {section.body}
                  </p>
                  {section.list && (
                    <ul className="mt-3 space-y-2 pl-5">
                      {section.list.map((item, j) => (
                        <li
                          key={j}
                          className="font-karla text-[#001E13]/70 text-sm leading-relaxed list-disc"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.footer && (
                    <p className="font-karla text-[#001E13]/75 text-sm mt-3">{section.footer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer footerData={footerData} />
    </>
  );
}
