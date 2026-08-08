# Pattern answer-first (GEO)

> Comment écrire une page pour être **citée** par un moteur génératif, pas seulement pour ranker.
> Appliqué la première fois sur `/en/trip-with-friends` (WP-137).

## Pourquoi ce pattern existe

Mesure du 2026-08-08 sur 10 requêtes témoins issues de Search Console (`scripts/geo-baseline.mjs`, `gl=us`) :

| | |
|---|---|
| Requêtes avec un AI Overview | **10 / 10** |
| Où l'AIO **nous cite** | **4 / 10** |
| Où on est dans le **top 20 organique** | **2 / 10** |
| Reddit dans le top 5 | 7 / 10 |

Le constat qui commande tout : **on est cité dans des AI Overviews sans ranker organiquement.** Sur `travel planners with collaborative features for group trips?` et `best apps to plan a group trip with friends`, on est dans les sources de l'AIO alors qu'on est absent du top 20.

Conclusion : sur ce cluster, le levier n'est pas « mieux ranker », c'est **être citable**. Un moteur extractif cherche une réponse courte, autonome et attribuable. Il ne récompense pas une accroche marketing.

## Les cinq règles

**1. La réponse d'abord, l'argumentaire ensuite.**
Un bloc « Quick answer » de 3 à 5 phrases, immédiatement sous le hero, avant toute narration. Il doit se suffire à lui-même : lu hors contexte, il répond à la requête. C'est le bloc qu'un moteur peut extraire tel quel.

**2. Nommer le produit et le prix dans la réponse.**
« WePlanify réunit des sondages…, c'est gratuit » — pas « notre application vous permet de ». Une citation qui ne nomme pas la marque ne nous rapporte rien.

**3. Les questions sont des requêtes réelles, pas des questions inventées.**
Les entrées FAQ se prennent dans GSC, formulées **mot pour mot** comme les utilisateurs les tapent. Exemple appliqué : `how do i split costs for a group trip fairly?` était à la position 2,4 sans qu'aucune page n'y réponde directement.

**4. Une réponse = un fait vérifiable, pas une promesse.**
« solde les comptes avec le minimum de virements » est extractible et vérifiable. « rend vos voyages inoubliables » ne l'est pas.

**5. Balisage systématique.**
`FAQPage` alimenté par la même source que le rendu (jamais deux listes à maintenir), plus `Article` et `BreadcrumbList`. Les tableaux comparatifs restent du HTML sémantique — pas d'image, pas de grille CSS non tabulaire : ce qui n'est pas parsable n'est pas citable.

## Où c'est appliqué

| Page | Bloc réponse | FAQ alimentée par GSC | Schema |
|---|---|---|---|
| `/[locale]/trip-with-friends` | ✅ `quickAnswer` | ✅ 11 entrées | FAQPage + Article + Breadcrumb |
| `/[locale]/alternatives/best-group-trip-planner-apps` | ✅ `quickVerdict` | ✅ | + ItemList + SoftwareApplication |
| `/[locale]/features/*` | ⏳ | ✅ | FAQPage + WebPage + Breadcrumb (via `FeatureJsonLd`) |
| `/[locale]/blog/group-trip-budget` | ⏳ | ✅ | FAQPage + Article |

## Contraintes du repo

- **Les 8 locales, toujours.** Une clé ajoutée en EN seulement casse les 7 autres (next-intl). Vérifier la parité avant de pousser.
- **Pas de nouvelle URL** pour couvrir une intention : on sort d'un problème de cannibalisation (WP-136). Une surface, des sections.
- **`robots.txt`** maintient l'allowlist des crawlers IA (`src/app/robots.ts`, `AI_CRAWLERS`). `Google-Extended` conditionne l'usage du contenu par les AI Overviews — ne pas le retirer.

## Mesurer

```bash
SERPAPI_KEY=… node scripts/geo-baseline.mjs > docs/seo/geo-baseline-$(date +%F).json
```

Le script relève, pour chaque requête témoin, la position organique **et** la citation en AI Overview — les deux se mesurent séparément, puisqu'on peut avoir l'une sans l'autre. Lancer avant et après un changement, et committer le « avant ».

Baseline de référence : `docs/seo/geo-baseline-2026-08-08.json`.
