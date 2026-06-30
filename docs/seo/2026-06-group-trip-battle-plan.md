# Plan de bataille SEO — Territoire « voyage de groupe » (juin 2026)

> Daté : 30 juin 2026.
> Complète (ne remplace pas) [`SEO_STRATEGY.md`](../../SEO_STRATEGY.md). Ce document tranche **un seul axe** à attaquer et donne les preuves + le plan d'exécution. Décisions tracées dans [`DECISION_LOG.md`](./DECISION_LOG.md).

---

## TL;DR

Il n'y a **pas de trafic SEO facile à capter** (cf. audit GSC ci-dessous : notre plus grosse requête en impressions est un mirage AI Overview). En revanche il existe **un terrain dur mais légitimement gagnable** : **le territoire « voyage de groupe entre potes »**, et plus précisément **les galères de groupe** (qui paie quoi, personne ne décide, untel se désiste, splitter les frais).

Pourquoi c'est gagnable : les SERPs de ce territoire ne sont **pas verrouillées par des géants** — Reddit est #1 sur 3 requêtes sur 4, le reste est composé de petits blogs et d'apps **génériques** (Wanderlog/TripIt) qui rankent au DA, pas à la pertinence « groupe ». Un produit nativement group-first peut les battre en pertinence. **Et on a déjà un pied dedans** (`/alternatives/best-group-trip-planner-apps` à pos 9,3).

Le combat = **profondeur de contenu + maillage + backlinks + optimisation AIO** sur 3-6 mois. Pas un quick win — un terrain à conquérir.

---

## 1. Audit GSC — où on en est vraiment (fenêtre 90 j, au 29/06/2026)

Source : Google Search Console `sc-domain:weplanify.com`. Totaux 90 j : **1,15k clics / 97,5k impressions / CTR 1,2% / pos. moy. 9,3**.

### 1.1 Le mirage à ne PAS chasser

| Requête | Impr. | Pos. | Clics | Diagnostic |
|---|---|---|---|---|
| how to plan a road trip | **7 522** | 1,6 | **0** | Page `/en/road-trip` bien optimisée, mais impressions venant du Brésil (2 977), Émirats (1 553), Bahreïn, Pakistan, Philippines… **jamais US/UK**. AI Overview présente → cités en pos 1 mais 0 clic. Ni captable ni qualifié. |

**À retenir : ignorer ce chiffre dans les rapports.** Il gonfle les impressions totales et fausse la lecture « on a de la visibilité ».

### 1.2 Le qualifié mais coincé — cluster commercial « group … planner »

129 requêtes, **~2 070 impressions, position moyenne 32,5** (page 3-5), ~7 clics. Intention d'achat = exactement le produit.

| Requête | Impr. | Pos. |
|---|---|---|
| group trip planner | 453 | 32,4 |
| group travel planner | 363 | 41,7 |
| group holiday planner | 113 | 49,7 |
| **group travel planners** | 66 | **19,4** ← page 2 |
| **best group vacation planner apps 2025 2026** | 56 | **15,9** ← page 2 |
| group vacation planner | 51 | 37,4 |
| family travel planner | 42 | 38,3 |

### 1.3 Diagnostic central : « créée ≠ rankée »

Le `SEO_STRATEGY.md` liste ces pages comme « Créées ». **Elles existent mais rankent pos 30-50.** Le problème n'est donc PAS de produire plus de pages — c'est de **faire monter celles qui existent** : profondeur, maillage, backlinks, et l'angle pain-points que les concurrents n'ont pas. La seule page qui perce (best-group-trip-planner-apps, pos 9,3) le prouve : c'est faisable, mais ça demande de l'off-page.

---

## 2. Recon SERP live (SerpAPI, US, 30/06/2026) — pourquoi ce terrain est gagnable

Top organique réel des 4 requêtes pivots :

| Requête | #1 | Reste du top 10 | AIO |
|---|---|---|---|
| group trip planner | **Reddit** | JamboGuides (blog), Wanderlog, TripIt, Sue Where Why What (blog), Map Happy (blog) | ✅ |
| how to plan a group trip | **Reddit** | JamboGuides, Condé Nast, Medium, WeTravel, blog perso, SquadTrip | ✅ |
| best app to plan a trip with friends | Sue (blog) | **Reddit**, AvoSquado, TripIt, WhenAvailable, FB, IG | ✅ |
| how to plan a trip with friends | **Reddit** | JamboGuides, Medium, blog perso, Sarah Sees The World, Quora | ✅ |

**Lecture stratégique :**

1. **Reddit #1 sur 3/4** → Google n'a pas de contenu autoritatif à remonter, il rabat sur de l'UGC. C'est un trou.
2. Les rankers sont des **petits blogs perso** (JamboGuides, Sue Where Why What, Corey Haines, Sarah Sees The World) → battables avec un contenu sérieusement meilleur.
3. Wanderlog/TripIt rankent au **DA/marque**, pas à la pertinence « groupe ». Un produit group-first peut les surclasser en pertinence sémantique.
4. Concurrents de niche (SquadTrip, AvoSquado, WhenAvailable, Stippl, Troupe) = **petits, aucun dominant**.
5. **Vent contraire : AI Overview sur les 4.** Il faut donc viser aussi la **citation dans l'AIO** (réponses directes, contenu structuré, listicles datées 2026) et capter le clic résiduel + la longue traîne sans AIO.

> Contraste : sur `trip planner` / `travel planner` génériques, c'est Wanderlog/TripIt/Roadtrippers/Google (DA 80-90). **On n'y va pas.** On gagne en se spécialisant, pas en généralisant.

---

## 3. L'axe à attaquer

**Devenir LA référence du « voyage de groupe entre potes », via l'angle des galères de groupe.**

C'est défendable car à la croisée de :
- **la demande** (Reddit #1 = besoin réel non satisfait par du contenu pro),
- **la différenciation produit** (sondages, budget partagé, split des dépenses, coordination) — ce que Wanderlog/TripIt ne peuvent pas écrire sans trahir leur positionnement solo.

### Trois fronts

**Front A — Commercial / comparatif (renforcer l'existant qui ranke déjà)**
Cible : `group trip planner`, `best app to plan a trip with friends`, `group trip planning app`, `best group vacation planner apps 2026`.
Action : approfondir + mailler + backlinker `/alternatives/best-group-trip-planner-apps` (pos 9,3) et la page produit. On est déjà pos 9-19 → push le plus rentable.

**Front B — Cluster « pain-points » (le wedge unique, contre des blogs faibles)**
Le contenu que les apps génériques n'écrivent pas. Chaque pièce répond à une douleur de groupe et pointe vers la feature qui la résout.

**Front C — Capture concurrentielle / branded (faible concurrence, haute intention)**
Pages d'alternative dédiées. Déjà en place : `squadtrip`, `stippl`, `tripit`, `wanderlog`, `cruzmi`. **Manquantes et à fort potentiel : Splitwise, Troupe, AvoSquado.**

---

## 4. Roadmap priorisée

Légende canal : **[S]** = article blog Sanity (CMS, pas de PR de code) · **[P]** = page codée (React + i18n 8 langues, via PR).

### P0 — Maintenant (impact × faisabilité max)

| # | Action | Cible mot-clé | Canal | Pourquoi |
|---|---|---|---|---|
| 1 | **Backlinks vers `/alternatives/best-group-trip-planner-apps`** (annuaires AlternativeTo/G2/Capterra/SaaSHub/ProductHunt) | best group trip apps 2026 | off-page | Seule page qui perce (pos 9,3, 27k impr). Pousser sur top 5 = le meilleur ROI absolu. |
| 2 | **Approfondir `/guides/plan-group-trip`** + viser le featured snippet (étapes numérotées, réponse directe en intro, FAQ schema) | how to plan a group trip | [P] | #1 actuel = Reddit. Aucun snippet pris. Une page structurée peut le rafler. |
| 3 | **Page `/alternatives/splitwise`** — « WePlanify vs Splitwise pour les voyages de groupe » | splitwise alternative for trips, split costs group trip app | [P] | Splitwise = grosse marque, mais ne planifie pas. On a budget + split + planning. Intention très qualifiée. |

### P1 — Ensuite (le wedge pain-points)

| # | Action | Cible mot-clé | Canal |
|---|---|---|---|
| 4 | Article « How to Plan a Trip With Friends Without Ruining the Friendship » | plan a trip with friends without ruining friendship | [S] |
| 5 | Article « How to Split Costs on a Group Trip (Who Pays What) » | how to split costs group trip, who pays what group trip | [S] |
| 6 | Article « How to Plan a Group Trip When No One Will Commit » | group trip no one commits / flaky friends trip | [S] |
| 7 | Page outil « Group Trip Checklist / Template (Free) » (lead magnet) | group trip planning checklist / spreadsheet / template | [P] |
| 8 | Pages `/alternatives/troupe` + `/alternatives/avosquado` | troupe alternative, avosquado alternative | [P] |

### P2 — Consolidation

| # | Action | Cible | Canal |
|---|---|---|---|
| 9 | Versions FR des P1 (océan bleu FR : « organiser voyage entre amis sans prise de tête », « partager les frais voyage groupe ») | longue traîne FR | [S] |
| 10 | Hub/pilier « Group Trip Planning » qui maille A+B+C et capte la requête tête `group trip planning` | group trip planning | [P] |

---

## 5. Tactique AI Overview (transversal, obligatoire)

Toutes les SERPs cibles ont une AIO. Pour chaque page/article :
- **Réponse directe en 40-60 mots dès l'intro** (format que l'AIO aime citer).
- **Titres en questions** alignés sur les PAA observés (« What is the best trip planner for a group? », « Is there an app to organise a group trip? », « How to create an itinerary for a group trip? »).
- **Données structurées** : `FAQPage`, `HowTo`, `SoftwareApplication` selon la page.
- **Listicles datées** (« …in 2026 ») — c'est le format que Google remonte sur les requêtes « best app… ».
- Objectif double : être **cité dans l'AIO** (visibilité de marque) **et** capter le clic résiduel + la longue traîne sans AIO.

---

## 6. Maillage interne

```
                 [Pilier: Group Trip Planning]  (#10)
                  /          |           \
   /guides/plan-group-trip  /alternatives/best-…  /trip-with-friends
        |  (Front B)            | (Front C)            |
   ┌────┴─────────────┐   ┌─────┴──────────┐      page produit
   split-costs (S#5)  │   splitwise (P#3)  │
   no-one-commits(S#6)│   troupe/avosquado │
   without-ruining(S#4)   squadtrip/wanderlog/tripit/stippl/cruzmi
   checklist (P#7)
```
Règle : chaque article pain-points (Front B) pointe vers (a) le guide pilier, (b) la feature produit qui résout la douleur, (c) `/alternatives`. Chaque page alternative pointe vers le guide + la home.

---

## 7. KPIs à suivre (mensuel, dans GSC)

- Position moyenne du **cluster « group … planner »** (baseline 30/06 : **32,5**). Cible 3 mois : < 20. Cible 6 mois : < 12.
- Position de `/alternatives/best-group-trip-planner-apps` (baseline **9,3**). Cible : top 5.
- Featured snippet obtenu sur `how to plan a group trip` (O/N).
- Clics issus du cluster (baseline ~7 / 90 j). Cible 6 mois : > 150.
- **Ne pas** compter `how to plan a road trip` dans les KPIs (mirage AIO).

---

## Annexe — méthode

- GSC pull via navigateur (le SA MCP `claude-gsc@…` n'est pas autorisé sur la propriété → 403).
- Recon SERP : SerpAPI, `gl=us&hl=en`, 30/06/2026.
- Inventaire des pages existantes vérifié sur `origin/main` au 30/06/2026.
