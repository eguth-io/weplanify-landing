import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery } from "@/sanity/lib/query";
import { NavType } from "@/sanity/lib/type";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  if (slug !== "pourquoi-weplanify-est-plus-efficace") {
    return (
      <>
        <Nav navData={await sanityFetch({ query: navQuery, tags: ["nav"] })} />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-4">
                404
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
                Article non trouvé
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Cet article n&apos;existe pas encore.
              </p>
            </div>
          </div>
        </main>
        <Footer variant="home" />
      </>
    );
  }
  const navData: NavType = await sanityFetch({
    query: navQuery,
    tags: ["nav"],
  });

  const article = {
    title: "Pourquoi une application de voyage comme WePlanify est bien plus efficace que vos outils habituels ?",
    excerpt: "Organiser un voyage en groupe peut vite devenir un casse-tête lorsqu'il faut gérer les hébergements, les activités, les budgets et les préférences de chacun. Avec WePlanify, tout est centralisé en un seul endroit, offrant une expérience fluide et efficace.",
    author: "Valentine Hamon",
    date: "14 Septembre 2025",
    readTime: "8 min de lecture",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    contentImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    content: `
      <p>Organiser un voyage en groupe peut vite devenir un casse-tête lorsqu'il faut gérer les hébergements, les activités, les budgets et les préférences de chacun. Beaucoup utilisent des outils comme WhatsApp, Excel ou encore Google Docs pour structurer leur voyage, mais ces solutions montrent vite leurs limites. Avec WePlanify, tout est centralisé en un seul endroit, offrant une expérience fluide et efficace. Voici pourquoi notre application de voyage surpasse largement les outils classiques.</p>
      
      <h2>💬 Discussion vs. Organisation : pourquoi WhatsApp n'est pas suffisant ?</h2>
      
      <h3>Trop d'infos, pas assez de clarté</h3>
      <p>Les discussions de groupe sur WhatsApp deviennent rapidement un cauchemar organisationnel. Entre les messages perdus au milieu d'émojis et de GIFs, les liens d'hébergement noyés sous une avalanche de réactions et les décisions qui s'égarent dans des centaines de notifications, il est presque impossible de garder une vue d'ensemble sur l'organisation du voyage.</p>
      
      <h3>Aucune gestion des décisions et un manque de suivi</h3>
      <p>Sur WhatsApp, il n'y a ni gestion des tâches, ni suivi des décisions prises. Si un participant oublie de voter pour une activité ou de donner son avis sur le logement, il faut sans cesse relancer tout le monde, créant frustration et perte de temps.</p>
      
      <h3>WePlanify structure la communication pour plus d'efficacité</h3>
      <p>Avec une application de voyage comme WePlanify, chaque information est centralisée et clairement présentée. Les décisions importantes sont mises en avant via des sondages et des notifications ciblées. Plus besoin de fouiller dans un flot de messages : chacun sait précisément ce qu'il doit faire et à quel moment.</p>
      
      <h2>📆 Un tableau Excel ne remplacera jamais un planning interactif</h2>
      
      <h3>Trop rigide et peu intuitif</h3>
      <p>Excel est un bon outil pour suivre un budget, mais il devient rapidement fastidieux lorsqu'il s'agit d'organiser un voyage dynamique. Insérer des horaires, modifier les plans à la dernière minute et faire collaborer plusieurs personnes en temps réel devient une tâche ardue et peu efficace.</p>
      
      <h3>Une gestion collaborative limitée</h3>
      <p>Partager un fichier Excel implique de jongler entre différentes versions, sans véritable suivi des modifications. Qui a modifié quoi ? Quelle est la version la plus récente ? Impossible d'avoir une vision claire et actualisée sans passer son temps à vérifier et croiser les informations.</p>
      
      <h3>Un planning vivant et interactif avec WePlanify</h3>
      <p>Notre application de voyage permet de créer un itinéraire dynamique où chaque membre du groupe peut ajouter ou modifier des activités en temps réel. Le programme est mis à jour instantanément et chacun peut visualiser les changements sans avoir à se demander s'il dispose de la bonne version.</p>
      
      <h2>📌 Collaboration, automatisation et centralisation : une seule app pour tout gérer</h2>
      
      <h3>Une seule application de voyage pour centraliser toutes les infos</h3>
      <p>Plutôt que de jongler entre WhatsApp, Google Docs, Excel et autres applications de notes, WePlanify regroupe toutes les fonctionnalités essentielles en un seul endroit. Vous pouvez gérer les réservations, établir l'itinéraire, suivre les dépenses et organiser les tâches sans dispersion.</p>
      
      <h3>Des sondages et notifications intelligentes pour simplifier les décisions</h3>
      <p>Fini les longs débats interminables ! Avec WePlanify, vous pouvez créer des sondages pour choisir le logement, les restaurants ou les activités. Chaque participant est notifié et vote directement dans l'application, ce qui permet de trancher rapidement et efficacement.</p>
      
      <h3>Une gestion des responsabilités optimisée</h3>
      <p>Attribuez des tâches à chaque membre du groupe et suivez leur avancement en un coup d'œil. Besoin de rappeler à quelqu'un qu'il doit réserver un vol ? Un simple clic suffit pour lui envoyer une notification. Plus de stress et une communication améliorée !</p>
      
      <h2>💡 WePlanify s'adapte à votre voyage, pas l'inverse !</h2>
      
      <h3>Un outil flexible pour tous types de voyages</h3>
      <p>Que vous organisiez un week-end entre amis, un road trip ou des vacances en famille, WePlanify s'adapte à vos besoins. Vous pouvez personnaliser votre itinéraire, modifier les étapes et ajuster le planning en fonction des imprévus.</p>
      
      <h3>Des fonctionnalités intelligentes en temps réel</h3>
      <p>Grâce à plus de 100 API intégrées, WePlanify vous fournit des informations utiles sur votre destination : météo, taux de change, plats locaux, transports en commun et même suggestions d'activités incontournables. Plus besoin de passer d'une application à l'autre, tout est accessible en un clic.</p>
      
      <h3>Une expérience de voyage sans stress</h3>
      <p>Fini les désaccords, les oublis et les prises de tête. Notre application de voyage transforme la planification en une expérience fluide et agréable.</p>
      
      <p>Avec WePlanify, oubliez les discussions interminables, les fichiers Excel chaotiques et les notes dispersées. Une seule application pour tout gérer efficacement et sans vous prendre la tête. Essayez-la dès maintenant et transformez votre manière d'organiser vos voyages !</p>
    `
  };

  return (
    <>
      <Nav navData={navData} />
      <main className="min-h-screen">
        <article className="px-[30px] lg:px-[70px] py-8 lg:py-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mb-4 lg:mb-6">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <span className="font-medium text-gray-900">{article.author}</span>
              <span className="text-gray-500 mx-2">•</span>
              <span className="text-gray-500">{article.date}</span>
              <span className="text-gray-500 mx-2">•</span>
              <span className="text-gray-500">{article.readTime}</span>
            </div>
          </div>

          <div className="mb-8 lg:mb-12">
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-black/20 z-10"></div>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${article.heroImage}')`
                }}
              ></div>
            </div>
          </div>

          <div className="mb-4 lg:mb-6">
            <div 
              className="max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-gray-900 [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
          </div>
        </article>

      </main>
      <Footer variant="home" />
    </>
  );
}