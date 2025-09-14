# Internationalisation (i18n) Implementation

Cette branche implémente l'internationalisation pour le site WePlanify avec support du français et de l'anglais.

## 🌍 Langues supportées

- **Français (fr)** - Langue par défaut
- **Anglais (en)**

## 📁 Structure des fichiers

```
src/
├── app/
│   ├── [locale]/           # Pages localisées
│   │   ├── layout.tsx      # Layout pour les pages localisées
│   │   ├── page.tsx        # Page d'accueil
│   │   ├── blog/           # Pages blog
│   │   ├── contact/        # Page contact
│   │   └── faq/            # Page FAQ
│   ├── layout.tsx          # Layout racine (inchangé)
│   └── sitemap.ts          # Sitemap multi-langues
├── components/
│   └── LanguageSelector.tsx # Sélecteur de langue
├── i18n.ts                 # Configuration i18n
├── middleware.ts           # Middleware pour routing
└── messages/               # Fichiers de traduction
    ├── fr.json             # Traductions françaises
    └── en.json             # Traductions anglaises
```

## 🛠 Technologies utilisées

- **next-intl** - Bibliothèque d'internationalisation pour Next.js
- **Next.js App Router** - Routing avec support i18n

## 🚀 Fonctionnalités

### ✅ Routing automatique
- URLs sans préfixe pour le français (défaut)
- URLs avec préfixe `/en` pour l'anglais
- Exemples :
  - Français : `https://weplanify.com/blog`
  - Anglais : `https://weplanify.com/en/blog`

### ✅ Sitemap multilingue
- Génération automatique des URLs pour chaque langue
- Support des balises `hreflang` pour le SEO
- Alternates languages dans le sitemap

### ✅ Sélecteur de langue
- Composant dropdown avec drapeaux
- Préservation du chemin lors du changement de langue
- Interface utilisateur intuitive

## 📝 Usage

### Dans les composants

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('nav');
  
  return (
    <nav>
      <a href="/blog">{t('blog')}</a>
      <a href="/faq">{t('faq')}</a>
    </nav>
  );
}
```

### Ajouter de nouvelles traductions

1. Éditer `messages/fr.json` et `messages/en.json`
2. Utiliser la clé dans le composant avec `useTranslations`

### Ajouter une nouvelle langue

1. Ajouter le code langue dans `src/i18n.ts`
2. Ajouter le code langue dans `src/middleware.ts`
3. Créer le fichier `messages/{locale}.json`
4. Mettre à jour `LanguageSelector.tsx`
5. Mettre à jour le sitemap dans `src/app/sitemap.ts`

## 🔧 Configuration

### next.config.ts
```typescript
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### middleware.ts
```typescript
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed'
});
```

## 🎯 Prochaines étapes

Pour finaliser l'implémentation :

1. **Migrer les composants existants** pour utiliser `useTranslations`
2. **Compléter les traductions** dans les fichiers JSON
3. **Intégrer le sélecteur de langue** dans la navigation
4. **Tester le routing** sur toutes les pages
5. **Vérifier le SEO** avec les balises hreflang
6. **Ajouter d'autres langues** si nécessaire

## 🚨 Points d'attention

- Le français reste la langue par défaut (pas de préfixe `/fr`)
- Les URLs existantes restent fonctionnelles
- Le sitemap génère automatiquement toutes les variantes
- Les redirections dans `next.config.ts` sont préservées
