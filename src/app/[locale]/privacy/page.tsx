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
  const currentUrl = `${SITE_URL}/${locale}/privacy`;

  return {
    title: isFr ? "Politique de confidentialit\u00e9 | WePlanify" : "Privacy Policy | WePlanify",
    description: isFr
      ? "D\u00e9couvrez comment WePlanify collecte, utilise et prot\u00e8ge vos donn\u00e9es personnelles."
      : "Learn how WePlanify collects, uses and protects your personal data.",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/en/privacy`,
        fr: `${SITE_URL}/fr/privacy`,
        "x-default": `${SITE_URL}/en/privacy`,
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
        body: "WePlanify is operated by Eguth SAS. For any questions regarding your personal data, you can contact us at privacy@weplanify.com.",
      },
      {
        title: "2. Data We Collect",
        body: "We collect the following data depending on your interactions with our services:",
        list: [
          "Email address — when you sign up for the beta, subscribe to notifications, or create an account.",
          "Name — when you create an account on the application.",
          "Usage data — anonymous analytics collected via cookies (with your consent) to improve our service.",
          "Trip data — itineraries, polls, budgets and other content you create within the application.",
        ],
      },
      {
        title: "3. How We Use Your Data",
        body: "Your data is used exclusively for the following purposes:",
        list: [
          "To provide and improve our trip planning services.",
          "To notify you about beta access and product launches (only if you opted in).",
          "To analyze anonymous usage patterns and improve the user experience.",
        ],
      },
      {
        title: "4. Legal Basis (GDPR)",
        body: "We process your personal data based on:",
        list: [
          "Your consent — for beta signup notifications, marketing emails, and analytics cookies.",
          "Contractual necessity — for providing the service when you create an account.",
          "Legitimate interest — for security and fraud prevention.",
        ],
      },
      {
        title: "5. Data Sharing",
        body: "We do not sell your personal data to third parties. We may share data with trusted service providers who help us operate our platform (hosting, email delivery, analytics), all bound by data processing agreements.",
      },
      {
        title: "6. Data Retention",
        body: "Beta signup emails are retained until the beta launch and for up to 12 months after. Account data is retained for the duration of your account and deleted within 30 days of account closure. Analytics data is anonymized and retained indefinitely.",
      },
      {
        title: "7. Your Rights",
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
        title: "8. Cookies",
        body: "We use cookies for analytics purposes only (Google Analytics via Google Tag Manager). You can accept or decline cookies via the consent banner displayed on your first visit. No cookies are set before your consent (for EEA visitors). For more details, see our cookie consent banner.",
      },
      {
        title: "9. Security",
        body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
      },
      {
        title: "10. Changes to This Policy",
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
        body: "WePlanify est op\u00e9r\u00e9 par Eguth SAS. Pour toute question relative \u00e0 vos donn\u00e9es personnelles, vous pouvez nous contacter \u00e0 privacy@weplanify.com.",
      },
      {
        title: "2. Donn\u00e9es collect\u00e9es",
        body: "Nous collectons les donn\u00e9es suivantes selon vos interactions avec nos services :",
        list: [
          "Adresse email — lors de votre inscription \u00e0 la beta, \u00e0 la newsletter ou \u00e0 la cr\u00e9ation de compte.",
          "Nom — lors de la cr\u00e9ation d\u2019un compte sur l\u2019application.",
          "Donn\u00e9es d\u2019utilisation — statistiques anonymes collect\u00e9es via cookies (avec votre consentement) pour am\u00e9liorer notre service.",
          "Donn\u00e9es de voyage — itin\u00e9raires, sondages, budgets et autres contenus que vous cr\u00e9ez dans l\u2019application.",
        ],
      },
      {
        title: "3. Utilisation de vos donn\u00e9es",
        body: "Vos donn\u00e9es sont utilis\u00e9es exclusivement pour :",
        list: [
          "Fournir et am\u00e9liorer nos services de planification de voyage.",
          "Vous notifier de l\u2019ouverture de la beta et des lancements produit (uniquement si vous l\u2019avez demand\u00e9).",
          "Analyser les tendances d\u2019utilisation de mani\u00e8re anonyme pour am\u00e9liorer l\u2019exp\u00e9rience utilisateur.",
        ],
      },
      {
        title: "4. Base l\u00e9gale (RGPD)",
        body: "Nous traitons vos donn\u00e9es personnelles sur la base de :",
        list: [
          "Votre consentement — pour les notifications beta, emails marketing et cookies analytiques.",
          "N\u00e9cessit\u00e9 contractuelle — pour fournir le service lorsque vous cr\u00e9ez un compte.",
          "Int\u00e9r\u00eat l\u00e9gitime — pour la s\u00e9curit\u00e9 et la pr\u00e9vention des fraudes.",
        ],
      },
      {
        title: "5. Partage des donn\u00e9es",
        body: "Nous ne vendons pas vos donn\u00e9es personnelles \u00e0 des tiers. Nous pouvons partager des donn\u00e9es avec des prestataires de confiance qui nous aident \u00e0 op\u00e9rer notre plateforme (h\u00e9bergement, envoi d\u2019emails, analytics), tous li\u00e9s par des accords de traitement des donn\u00e9es.",
      },
      {
        title: "6. Conservation des donn\u00e9es",
        body: "Les emails d\u2019inscription beta sont conserv\u00e9s jusqu\u2019au lancement de la beta et jusqu\u2019\u00e0 12 mois apr\u00e8s. Les donn\u00e9es de compte sont conserv\u00e9es pendant la dur\u00e9e de votre compte et supprim\u00e9es dans les 30 jours suivant sa cl\u00f4ture. Les donn\u00e9es analytiques sont anonymis\u00e9es et conserv\u00e9es ind\u00e9finiment.",
      },
      {
        title: "7. Vos droits",
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
        title: "8. Cookies",
        body: "Nous utilisons des cookies uniquement \u00e0 des fins analytiques (Google Analytics via Google Tag Manager). Vous pouvez accepter ou refuser les cookies via la banni\u00e8re de consentement affich\u00e9e lors de votre premi\u00e8re visite. Aucun cookie n\u2019est d\u00e9pos\u00e9 avant votre consentement (pour les visiteurs de l\u2019EEE).",
      },
      {
        title: "9. S\u00e9curit\u00e9",
        body: "Nous mettons en \u0153uvre des mesures techniques et organisationnelles appropri\u00e9es pour prot\u00e9ger vos donn\u00e9es personnelles contre tout acc\u00e8s non autoris\u00e9, modification, divulgation ou destruction.",
      },
      {
        title: "10. Modifications de cette politique",
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
