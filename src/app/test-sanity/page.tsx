"use client";

import { useEffect, useState } from "react";
import { testSanityConnection } from "@/sanity/lib/test-connection";

interface TestResult {
  success: boolean;
  articlesCount?: number;
  articles?: any[];
  error?: string;
}

export default function TestSanityPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await testSanityConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue"
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test de connexion Sanity - Weplanify
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test de connexion</h2>
          <p className="text-gray-600 mb-4">
            Cliquez sur le bouton ci-dessous pour tester la connexion à Sanity et récupérer les articles de blog.
          </p>
          
          <button
            onClick={runTest}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Test en cours..." : "Tester la connexion"}
          </button>
        </div>

        {testResult && (
          <div className={`rounded-lg p-6 mb-6 ${
            testResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              testResult.success ? "text-green-800" : "text-red-800"
            }`}>
              {testResult.success ? "✅ Connexion réussie !" : "❌ Erreur de connexion"}
            </h3>
            
            {testResult.success ? (
              <div>
                <p className="text-green-700 mb-2">
                  Nombre d'articles trouvés : <strong>{testResult.articlesCount}</strong>
                </p>
                
                {testResult.articles && testResult.articles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-green-800 mb-2">Articles disponibles :</h4>
                    <div className="space-y-2">
                      {testResult.articles.map((article, index) => (
                        <div key={article._id} className="bg-white p-3 rounded border">
                          <h5 className="font-medium">{article.title}</h5>
                          <p className="text-sm text-gray-600">Par {article.author}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                          </p>
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {article.tags.map((tag: string, tagIndex: number) => (
                                <span key={tagIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-700">{testResult.error}</p>
            )}
          </div>
        )}


        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Prochaines étapes</h3>
          <ul className="text-blue-700 space-y-1">
            <li>• Accédez au studio Sanity à <code>/studio</code></li>
            <li>• Créez des articles de blog dans la section "Article de Blog"</li>
            <li>• Utilisez les requêtes GROQ pour récupérer les articles dans votre application</li>
            <li>• Implémentez les pages de blog et de détail d'article</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
