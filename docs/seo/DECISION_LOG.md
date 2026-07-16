# Journal des décisions SEO

> Append-only. Chaque décision : date, contexte, décision, preuve. La plus récente en haut.

---

## 2026-07-16 — Étendre le cluster `/events` sur H2 2026 + 2027 (5 nouvelles landings)

**Contexte.** Le cluster event existant est daté : la Coupe du monde FIFA se termine le 19/07, la finale UCL (30/05), Hellfest (juin), Ultra Europe (10-12/07) et Tomorrowland (17-26/07) sont passés ou en cours. Seule `solar-eclipse-2026` reste devant nous. Besoin de réamorcer le cluster sur des events dont la **fenêtre de planification est encore ouverte**.

**Décision.** 5 nouvelles landings, même pattern que `world-cup-2026` (variante sans image) :
`oktoberfest-2026`, `christmas-markets-2026`, `ski-season-2027`, `solar-eclipse-2027`, `rugby-world-cup-2027`.

**Priorisation, par demande de recherche réelle (et non par fit produit) :**

| Rang | Landing | Signal Trends | Verdict |
|---|---|---|---|
| 1 | `christmas-markets-2026` | `christmas markets` GB avg **21**, pic 100 (16-22 nov) ; `marché de noël` FR avg **10**, pic 100 (7-13 déc) | Plus gros volume des 5. Pic dans ~4 mois → temps d'indexer. **Meilleur ROI.** |
| 2 | `oktoberfest-2026` | `oktoberfest` FR avg **13**, pic 100 (28/09-04/10) ; GB avg 7 | Solide, saisonnier. Fenêtre de planif = maintenant. |
| 3 | `rugby-world-cup-2027` | `rugby world cup` GB avg **16** (pic 100 = tournoi 2025, pas 2027) | Volume réel mais SERP la plus verrouillée. |
| 4 | `solar-eclipse-2027` | `eclipse 2027` FR = **1** vs `marché de noël` = 100 | Quasi nul aujourd'hui. Pari 12 mois assumé : la rampe va jusqu'à août 2027. |
| 5 | `ski-season-2027` | `week end au ski` FR = **1** vs `oktoberfest` = 100 ; `location ski` = 100 (avg 29, pic février) | **Head-term inexistant.** Le volume ski est transactionnel (`location ski`), pas planification. Joué sur le long tail only. |

**Constat qui a corrigé l'intuition.** Le voyage au ski est le trip le plus « WePlanify-shaped » qui existe (cagnotte, forfaits, niveaux mixtes) — mais **le fit produit ne crée pas de demande de recherche**. Ne pas confondre les deux. La landing ski est conservée pour le long tail qualifié (`organiser un week-end au ski entre potes`), pas pour un head-term.

**Difficulté SERP (SerpAPI, 16/07).**
- **Gagnable** : `ski trip with friends planner` (US) → **Reddit #1**, related searches = `planner template` / `planner app` → SERP faible, intention produit explicite. Cohérent avec le constat du 30/06 (territoire group trip non verrouillé).
- **Moyen** : Oktoberfest → tour-opérateurs (`oktoberfest-guide.com`, `oktoberfesttours`, `stoketravel`) + Reddit dans le top 5 sur 2 requêtes /3. SERP FR mince (`lespassionnes.fr`, `tui.fr`) → attaquable.
- **Dur** : Éclipse 2027 → SERP 100 % commerciale haut de gamme (Viking River Cruises, Smithsonian Journeys, Road Scholar). Angle informationnel ouvert (`nationaleclipse.com` ranke).
- **Le plus dur** : Rugby 2027 → `experiences.rugbyworldcup.com` (partenaire voyage officiel) tient le top ; FR verrouillé par `groupecouleur.com` (TO officiel).

**Correctifs SEO embarqués.**
- Les pages event existantes font `isEn ? EN : FR` → **de/es/it/pl/pt/zh servent du texte français**. Les 5 nouvelles utilisent `t.rich()` sur les 8 locales.
- Les pages existantes ne déclarent que `en`+`fr` dans `alternates.languages` alors que `generateStaticParams` génère les 8 → hreflang incomplet. Les 5 nouvelles déclarent les 8 + `x-default`.
- `ski-season-2027` **n'émet pas de JSON-LD `Event`** (c'est une saison, pas une date) ; `christmas-markets-2026` émet un `ItemList` d'`Event` (un par marché, dates vérifiées) plutôt qu'un faux Event parapluie.
- Hub `/events` : titre élargi de « 2026 Event Trip Planners » à 2026-2027, sinon il ment sur son propre contenu.
- **Suffixe de titre dupliqué** : `src/lib/metadata.ts:101` applique `template: "%s | WePlanify"`, donc tout `meta.title` contenant déjà « | WePlanify » sort en `… | WePlanify | WePlanify`. Corrigé sur les 4 nouveaux namespaces concernés (32 fichiers). **Bug pré-existant non corrigé ici** : `world-cup-2026` (et probablement d'autres) le dupliquent toujours → à traiter séparément.

**Dette SEO identifiée, non traitée (mérite un ticket).**
1. `AuthorBio.tsx` n'a que la copy `en`/`fr` → sur de/es/it/pl/pt/zh la bio s'affiche en anglais avec la date formatée `en-US` (« Veröffentlicht July 16, 2026 »). Touche **toutes** les pages localisées, pas seulement les events.
2. Titres > 60 caractères une fois le « | WePlanify » ajouté (le template ne laisse que ~48 car. utiles) → troncature SERP sur la majorité des nouvelles pages et des anciennes.
3. `StickyCTA.tsx` déduit la locale via `pathname.split("/")[1] === "fr" ? "fr" : "en"` → les 6 autres locales tombent sur `en`.

**Limite méthodo assumée.** SerpAPI ne donne **pas** de volume de recherche absolu (`total_results` ≠ volume). Google Trends est **relatif au max du groupe comparé** — d'où le double run pour éviter d'écraser les petits termes. Aucun chiffre de volume absolu ici : il faudrait Keyword Planner ou GSC (SA MCP toujours 403 au 16/07).

**Preuve.** SerpAPI `engine=google` (12 requêtes, `gl=us`/`gl=fr`) + `engine=google_trends` TIMESERIES `today 12-m` (geo FR/GB/US), 16/07/2026. Inventaire pages sur `origin/main` @ `2d6de49`.

---

## 2026-06-30 — Concentrer l'effort SEO sur le territoire « voyage de groupe », angle pain-points

**Contexte.** Audit GSC + recon SERP demandés pour trouver du trafic « facile et qualifié ».

**Constat.**
- Pas de trafic facile : la plus grosse requête en impressions (`how to plan a road trip`, 7 522 impr, pos 1,6) est un **mirage AI Overview** (impressions BR/UAE/PK, 0 clic). À exclure des rapports.
- Le trafic qualifié (`group … planner`, ~2 070 impr) est coincé pos 32,5 — « créée ≠ rankée ».
- **Recon SERP : le territoire « group trip » n'est pas verrouillé** (Reddit #1 sur 3/4, blogs faibles, apps génériques battables) → gagnable mais dur.

**Décision.** Attaquer un seul axe : **« voyage de groupe entre potes » via l'angle des galères de groupe**. 3 fronts : (A) renforcer/backlinker `/alternatives/best-group-trip-planner-apps` (pos 9,3), (B) cluster pain-points (split costs, drama-free, flaky friends, checklist), (C) capture concurrentielle — ajouter **Splitwise, Troupe, AvoSquado** aux alternatives existantes.

**Détail + roadmap priorisée :** [`2026-06-group-trip-battle-plan.md`](./2026-06-group-trip-battle-plan.md).

**Preuve.** GSC `sc-domain:weplanify.com` 90 j au 29/06 ; SerpAPI `gl=us` 30/06 ; inventaire pages sur `origin/main`.
