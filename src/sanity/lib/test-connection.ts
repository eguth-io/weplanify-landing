import { client } from "./client";
import { blogPostsQuery } from "./query/blog";

export async function testSanityConnection() {
  try {
    console.log("🔍 Test de connexion à Sanity...");
    
    // Test de connexion basique
    const result = await client.fetch(blogPostsQuery);
    
    console.log("✅ Connexion à Sanity réussie !");
    console.log(`📊 Nombre d'articles trouvés : ${result.length}`);
    
    if (result.length > 0) {
      console.log("📝 Premier article :", {
        titre: result[0].title,
        auteur: result[0].author,
        date: result[0].publishedAt,
        tags: result[0].tags || []
      });
    } else {
      console.log("ℹ️ Aucun article trouvé. Vous pouvez créer des articles dans le studio Sanity.");
    }
    
    return {
      success: true,
      articlesCount: result.length,
      articles: result
    };
  } catch (error) {
    console.error("❌ Erreur de connexion à Sanity :", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
}

// Fonction pour tester la création d'un article de test
export async function createTestBlogPost() {
  try {
    console.log("📝 Création d'un article de test...");
    
    const testPost = {
      _type: "blog",
      title: "Test de connexion Sanity - Weplanify",
      slug: {
        current: "test-connexion-sanity-weplanify"
      },
      excerpt: "Cet article de test vérifie que la connexion à Sanity fonctionne correctement pour Weplanify.",
      content: [
        {
          _type: "block",
          _key: "test-block",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "test-span",
              text: "Félicitations ! La connexion à Sanity fonctionne parfaitement. Vous pouvez maintenant créer et gérer vos articles de blog directement depuis le studio Sanity."
            }
          ]
        }
      ],
      author: "Système Weplanify",
      publishedAt: new Date().toISOString(),
      tags: ["test", "connexion", "weplanify"]
    };
    
    const result = await client.create(testPost);
    console.log("✅ Article de test créé avec succès !", result._id);
    
    return {
      success: true,
      articleId: result._id
    };
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'article de test :", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue"
    };
  }
}
