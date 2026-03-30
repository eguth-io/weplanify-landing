# WePlanify — Strategie SEO Complete

> Document vivant. Derniere mise a jour : 31 mars 2026.

---

## 1. Positionnement & Proposition de valeur SEO

### One-liner

**"Le seul planificateur de voyage de groupe tout-en-un, gratuit et bilingue."**

### Differentiateurs cles (vs concurrence)

| Differentiateur | Pourquoi c'est important en SEO |
|----------------|-------------------------------|
| **Tout-en-un** (itineraire + sondages + budget + bagages + decouverte) | Permet de cibler des requetes transversales, pas juste "itinerary builder" |
| **Gratuit** | "free" est un qualificateur de recherche a fort volume et forte intention |
| **Bilingue EN/FR** | Le marche FR est un ocean bleu — quasi zero concurrence |
| **Fait pour les groupes** | Differencie de Wanderlog/TripIt qui sont d'abord des outils solo |

### Concurrents a surveiller

| Concurrent | Force principale | Notre avantage |
|-----------|-----------------|---------------|
| **Wanderlog** | Notoriete, map interactive, SEO fort | Pas specialise groupe, pas de sondages |
| **SquadTrip** | Paiements, guides SEO solides | Payant, pas de version FR |
| **Troupe** (JetBlue) | Votes/decisions, backing corporate | US-only, pas de budget partage |
| **AvoSquado** | Attribution chambres, activites bookables | Niche, pas de sondages |
| **Cruzmi** | Seul concurrent FR direct | App mobile uniquement, SEO faible |
| **TripIt** | Organisation reservations | Pas collaboratif, pas de sondages |
| **Splitwise** | Gestion depenses | Pas un planificateur de voyage |

---

## 2. Architecture du site & maillage interne

### Structure des URLs

```
weplanify.com/
├── /en (et /fr)                          ← Homepage
├── /en/features/
│   ├── planning                          ← Feature: itineraire collaboratif
│   ├── polls                             ← Feature: sondages de groupe
│   ├── budget                            ← Feature: budget partage
│   ├── packing                           ← Feature: listes de bagages
│   ├── explore                           ← Feature: decouverte activites
│   ├── collaboration                     ← Feature: collaboration temps reel
│   ├── itinerary                         ← Feature: itineraire jour par jour
│   ├── memories                          ← Feature: souvenirs
│   └── transport                         ← Feature: transport
├── /en/trip-with-friends/                ← Use case: voyage entre amis
├── /en/bachelorette-trip/                ← Use case: EVJF / bachelorette
├── /en/guides/
│   └── plan-group-trip/                  ← Guide: comment organiser un voyage de groupe
├── /en/alternatives/                     ← Comparatif apps voyage groupe
├── /en/blog/                             ← Blog (articles Sanity)
│   └── [slug]/                           ← Articles individuels
├── /en/faq/                              ← FAQ
├── /en/contact/                          ← Contact
├── /sitemap.xml                          ← Sitemap dynamique
└── /robots.txt                           ← Robots dynamique
```

### Strategie de maillage interne

Le maillage interne est **critique** pour le SEO. Chaque page doit etre connectee aux autres de maniere logique.

#### Ou placer les liens

##### Footer (visible sur toutes les pages)

Le footer doit contenir des liens vers les pages strategiques. Ajouter dans Sanity ou en dur :

```
Produit                    Ressources                  Use cases
├── Fonctionnalites        ├── Blog                    ├── Voyage entre amis
├── Sondages de groupe     ├── Guide planification     ├── EVJF / Bachelorette
├── Budget partage         ├── Comparatif apps         └── [futurs use cases]
└── Listes de bagages      └── FAQ
```

**Pourquoi dans le footer ?** Les moteurs de recherche voient les liens du footer comme des liens site-wide. Ca donne de l'autorite a ces pages et aide les crawlers a les decouvrir. Les pages use cases et le comparatif beneficient enormement d'etre dans le footer car elles ne sont pas (encore) dans la navigation principale.

##### Navigation principale (header)

Garder la nav simple. Ne PAS ajouter toutes les pages. Suggestion :

```
Fonctionnalites | Blog | FAQ | [Login] | [CTA]
```

Les pages use cases et le comparatif n'ont pas besoin d'etre dans le header. Elles sont des pages d'atterrissage SEO, pas des pages de navigation primaire.

##### Liens contextuels dans le contenu

C'est le maillage le plus puissant pour le SEO. Chaque page doit contenir des liens vers les pages connexes **dans le corps du texte** :

| Page source | Doit linker vers |
|------------|-----------------|
| Homepage | Features, use cases (via sections existantes) |
| `/trip-with-friends` | `/features/polls`, `/features/budget`, `/features/packing`, `/guides/plan-group-trip`, `/bachelorette-trip`, `/alternatives` |
| `/bachelorette-trip` | `/features/polls`, `/features/budget`, `/trip-with-friends`, `/guides/plan-group-trip` |
| `/guides/plan-group-trip` | Toutes les features, `/trip-with-friends`, `/bachelorette-trip`, `/alternatives` |
| `/alternatives` | `/trip-with-friends`, `/bachelorette-trip`, `/guides/plan-group-trip`, features |
| Pages features | `/trip-with-friends`, `/guides/plan-group-trip`, autres features |
| Articles blog | Pages features pertinentes, use cases, guide |

##### Breadcrumbs

Ajouter un fil d'Ariane sur les pages profondes (guide, features, blog articles) :

```
Accueil > Guides > Comment organiser un voyage de groupe
Accueil > Fonctionnalites > Sondages de groupe
Accueil > Blog > [Titre article]
```

Implementer avec le schema `BreadcrumbList` JSON-LD pour les rich snippets Google.

---

## 3. Strategie de mots-cles

### Requetes transactionnelles (pages de conversion)

| Requete EN | Requete FR | Volume | Difficulte | Page cible | Statut |
|-----------|-----------|--------|-----------|-----------|--------|
| group trip planner | organisateur voyage groupe | Fort | Haute | Homepage | Existant |
| group trip planner app free | application voyage groupe gratuit | Moyen | Moyenne | Homepage | Existant |
| plan trip with friends | organiser voyage entre amis | Moyen | Moyenne | `/trip-with-friends` | Cree |
| bachelorette trip planner | organiser evjf | Moyen | Faible (FR) | `/bachelorette-trip` | Cree |
| best group travel app | meilleure app voyage groupe | Moyen | Haute | `/alternatives` | Cree |
| wanderlog alternative | alternative wanderlog | Faible | Faible | `/alternatives` | Cree |
| collaborative travel planner | planificateur voyage collaboratif | Faible | Faible | Homepage / features | Existant |

### Requetes informationnelles (blog / guides)

| Requete EN | Requete FR | Page cible | Statut |
|-----------|-----------|-----------|--------|
| how to plan a group trip | comment organiser voyage groupe | `/guides/plan-group-trip` | Cree |
| group trip budget template | template budget voyage groupe | Blog article | A creer |
| group travel packing list | liste bagages voyage groupe | Blog article | A creer |
| how to split costs group trip | partager frais voyage groupe | Blog article | A creer |
| best destinations group trip | meilleures destinations voyage groupe | Blog article | A creer |
| bachelorette trip ideas | idees evjf | Blog article | A creer |
| how to choose destination with friends | choisir destination entre amis | Blog article | A creer |

### Requetes de comparaison

| Requete | Page cible | Statut |
|---------|-----------|--------|
| wanderlog vs tripit | `/alternatives` | Cree (page generique) |
| best group trip apps 2026 | `/alternatives` | Cree |
| weplanify vs wanderlog | `/alternatives/wanderlog` | A creer (page dediee) |
| cruzmi alternative | `/alternatives` | Cree (FR keywords) |

---

## 4. Plan de contenu editorial

### Phase 1 — Fondations (fait)

- [x] Homepage avec meta tags localises EN/FR
- [x] Pages features (9 pages via Sanity)
- [x] Page FAQ
- [x] Page Contact
- [x] Page use case : voyage entre amis
- [x] Page use case : EVJF / bachelorette
- [x] Guide : comment organiser un voyage de groupe
- [x] Page comparatif / alternatives

### Phase 2 — Contenu blog (a faire)

Objectif : publier 2 articles/mois, alterner EN et FR.

**Articles prioritaires :**

1. "Les meilleures applications pour planifier un voyage entre amis (comparatif 2026)" — FR
   - Cible : "application voyage entre amis comparatif"
   - Pourquoi : requete FR a faible concurrence, positionne WePlanify dans le comparatif

2. "Group Trip Budget: How to Split Costs Without Drama" — EN
   - Cible : "group trip budget split costs"
   - Pourquoi : fort volume, mene naturellement vers la feature budget

3. "Checklist bagages voyage de groupe (template gratuit)" — FR
   - Cible : "liste bagages voyage groupe"
   - Pourquoi : requete utilitaire, lead magnet potentiel, mene vers feature packing

4. "How to Choose a Destination When Everyone Wants Something Different" — EN
   - Cible : "choose destination group trip"
   - Pourquoi : mene vers la feature sondages

5. "10 idees EVJF originales pour tous les budgets" — FR
   - Cible : "idees evjf", "evjf original"
   - Pourquoi : fort volume FR, mene vers la page bachelorette-trip

6. "The Complete Group Trip Packing List (Free Template)" — EN
   - Cible : "group trip packing list template"
   - Pourquoi : contenu utilitaire, fort potentiel de backlinks

### Phase 3 — Pages de comparaison dediees (a faire)

Creer des pages individuelles pour chaque concurrent :

- `/alternatives/wanderlog` — "WePlanify vs Wanderlog"
- `/alternatives/squadtrip` — "WePlanify vs SquadTrip"
- `/alternatives/tripit` — "WePlanify vs TripIt"
- `/alternatives/cruzmi` — "WePlanify vs Cruzmi" (FR surtout)

Chaque page : ~1000 mots, comparaison honnete feature par feature, conclusion orientee.

### Phase 4 — Use cases supplementaires (a faire)

- `/family-trip` — Voyage en famille
- `/team-building` — Team building / voyage corporate
- `/school-trip` — Voyage scolaire
- `/road-trip` — Road trip entre amis

---

## 5. SEO technique

### Checklist technique

| Element | Statut | Notes |
|---------|--------|-------|
| Sitemap XML dynamique | OK | Inclut toutes les pages, locales, blog posts |
| Robots.txt | OK | Allow /, Disallow /studio |
| Canonical URLs | OK | www.weplanify.com uniformise |
| Hreflang EN/FR/x-default | OK | Sur toutes les pages |
| Meta title localise | OK | FR et EN distincts |
| Meta description localisee | OK | FR et EN distincts |
| Open Graph complet | OK | Title, description, image, url, locale |
| Twitter Card | OK | summary_large_image |
| JSON-LD Organization | OK | Schema global |
| JSON-LD WebSite | OK | Schema global |
| JSON-LD SoftwareApplication | OK | Schema global |
| JSON-LD FAQPage | Partiel | Seulement sur le guide |
| JSON-LD BreadcrumbList | A faire | Sur toutes les pages profondes |
| JSON-LD Article | OK | Sur le guide |
| Favicon complet | OK | ico, png 16/32, apple-touch, android-chrome |
| Web App Manifest | OK | PWA-ready |
| Google Search Console | **OK** | Sitemap soumis, 27 pages indexees |
| Google Analytics / GTM | **OK** | GTM-MJHJL7Q2 deploye, Consent Mode v2, 4 key events GA4 configures |

### Performance & Core Web Vitals

| Element | Statut | Action |
|---------|--------|--------|
| Images optimisees (Next.js Image) | OK | Utilise AVIF/WebP |
| Lazy loading images | OK | 11/13 images en lazy |
| Font preloading | A verifier | 5 Google Fonts chargees |
| Preconnect CDN Sanity | OK | Dans le layout |
| Compression | A verifier | Depend de l'hebergement |

---

## 6. Strategie de backlinks (off-site)

### Actions a mener

1. **Se faire lister dans les comparatifs existants**
   - Contacter les auteurs des articles "best group trip planner apps"
   - Proposer WePlanify comme ajout a leur liste
   - Cibles : TripSavvy, PCMag, blogs voyage FR (Decathlon Travel, Routard, Toploc)

2. **Product Hunt launch**
   - Preparer une page Product Hunt soignee
   - Viser un lundi ou mardi pour le lancement
   - Les backlinks Product Hunt sont `dofollow` et apportent de l'autorite

3. **Guest posting sur des blogs voyage**
   - Proposer des articles invites sur des blogs FR (marche sous-exploite)
   - Sujets : "Comment organiser un voyage de groupe sans stress"
   - Inclure un lien vers WePlanify naturellement

4. **Partenariats avec des blogueurs voyage**
   - Offrir l'outil gratuitement (il l'est deja) en echange d'un review
   - Cibler des micro-influenceurs voyage (5-50k followers)

5. **Soumission aux directories d'apps**
   - AlternativeTo.net
   - G2.com
   - Capterra
   - SaaSHub

---

## 7. KPIs & Suivi

### Metriques a suivre (mensuellement)

| Metrique | Outil | Objectif 3 mois | Objectif 6 mois |
|----------|-------|-----------------|-----------------|
| Pages indexees | Google Search Console | 30+ | 50+ |
| Impressions organiques | GSC | 5 000/mois | 20 000/mois |
| Clics organiques | GSC | 200/mois | 1 000/mois |
| Position moyenne | GSC | < 30 | < 15 |
| Mots-cles positionnes | GSC / Ahrefs | 50+ | 200+ |
| Backlinks | Ahrefs / GSC | 20+ | 50+ |
| Taux de rebond pages SEO | GA4 | < 70% | < 60% |
| Conversions depuis organique | GA4 | Tracking en place | 50 signups/mois |

### Snapshot GSC — 21 fev au 21 mars 2026

**Vue d'ensemble :**
- Impressions totales : ~459 (en forte hausse, spike a 52/jour le 19 mars)
- Clics totaux : 7
- CTR moyen : 1.5%
- Position moyenne : ~6
- 14 URLs avec impressions, ~25 requetes detectees

**Par pays :**
| Pays | Impressions | Clics | Position moy. |
|------|------------|-------|---------------|
| France | 81 | 7 | 3.9 |
| Canada | 8 | 0 | 4.75 |
| India | 8 | 0 | 3.5 |
| UK | 7 | 0 | 8 |

**Top pages (non-brande) :**
| Page | Impressions | Clics | Position |
|------|------------|-------|----------|
| `/en/alternatives/best-group-trip-planner-apps` | 37 | 0 | 14.6 |
| `/fr/features/polls` | 30 | 0 | 3.6 |
| `/fr/features/planning` | 26 | 1 | 2.7 |
| `/en/features/collaboration` | 24 | 1 | 5.7 |
| `/en/features/planning` | 19 | 0 | 5.9 |

**Requetes non-brandees detectees :**
| Requete | Page | Position |
|---------|------|----------|
| group trip organizer | /alternatives/best-group-trip-planner-apps | 1 |
| group travel planner | /fr | 2 |
| group trip planner | /fr | 3 |
| best group vacation planner app | /alternatives/best-group-trip-planner-apps | 3 |
| build ai trip planner | / | 5 |
| sondage | /fr/features/polls | 10 |

**Problemes identifies :**
1. Cannibalisation : "group trip planner" apparait sur /fr (pos 3) ET /alternatives (pos 24)
2. /fr/features/polls : 30 imp, pos 3.6, CTR 0% — title/meta a revoir
3. Trafic 100% France — marche anglophone inexploite
4. Spike d'impressions 18-21 mars (x10) — surveiller si tendance durable

### Mots-cles prioritaires a tracker

Creer un suivi de position pour :

**EN :** group trip planner, plan trip with friends, bachelorette trip planner, best group travel app, how to plan a group trip, wanderlog alternative

**FR :** organisateur voyage groupe, voyage entre amis, organiser evjf, application voyage groupe, comment organiser voyage groupe, alternative cruzmi

---

## 8. Actions immediates (par priorite) — Mis a jour 31 mars 2026

### Fait (31 mars 2026)

- [x] **Configurer key events GA4** — sign_up, generate_lead, cta_click, newsletter_subscribe
- [x] **Reecrire les title tags + meta descriptions** — 8 pages (EN+FR), suppression "Free/Gratuit", fix brand duplique
- [x] **Ajouter FAQ + FAQPage schema sur /alternatives/best-group-trip-planner-apps** — 5 questions PAA-targeted
- [x] **Publier 1er article blog FR** — /blog/meilleures-applications-voyage-groupe (comparatif 6 applis, bilingue)
- [x] **Enrichir road-trip, family-trip, team-building** — 2 sections supplementaires chacun, +500 mots/page
- [x] **Maillage interne** — liens croises entre use cases, features, blog, guides dans le contenu + Discover More
- [x] **Mettre a jour dateModified** sur les 3 use cases (freshness signal)
- [x] **Ajouter l'article blog au sitemap**
- [x] **Ajouter le cross-linking** entre les pages + features
- [x] **JSON-LD FAQPage** — deja present sur trip-with-friends, bachelorette-trip, road-trip, family-trip, team-building

### Prochaines etapes (par priorite)

- [ ] **Ajouter les pages use cases dans le footer** — road-trip, family-trip, team-building, bachelorette-trip dans une section "Use cases"
- [ ] **2eme article blog FR** — "Comment organiser un EVJF : guide complet" — zero concurrence web en FR
- [ ] **Schema HowTo** sur road-trip ("Planning Your Route") et team-building ("Planning Timeline") — rich snippets supplementaires
- [ ] **Ajouter des images + alt text optimises** sur les pages use cases — Google Images comme source de trafic
- [ ] **Ajouter une Table of Contents** sur les pages 2500+ mots (road-trip, family-trip, team-building)
- [ ] **Outreach backlinks** — se faire lister dans les articles "best group trip planner apps" (TripIt, JoinMyTrip)
- [ ] **Product Hunt launch** — backlinks dofollow + visibilite
- [ ] **Guest posting blogs voyage FR** — marche quasi vide
- [ ] **Soumission AlternativeTo + G2 + Capterra**

---

## Notes & Decisions

### Pourquoi les pages use cases ne sont PAS dans le header nav

Les pages comme `/trip-with-friends` et `/bachelorette-trip` sont des **pages d'atterrissage SEO**. Leur role est de capter du trafic organique depuis Google, pas d'etre navigues depuis le site. Les mettre dans le header surchargerait la navigation. Elles doivent etre :
- Dans le **footer** (pour le maillage interne et l'autorite)
- **Linkees dans le contenu** des autres pages (maillage contextuel)
- **Accessibles via le sitemap** (pour les crawlers)

### Pourquoi le marche FR est prioritaire

- Quasi zero concurrence sur les requetes FR
- Cruzmi (seul concurrent direct) a un SEO tres faible
- Le volume de recherche FR pour "voyage entre amis" / "organiser EVJF" est significatif
- WePlanify est le seul outil bilingue du marche
- Les articles de blog FR ont un potentiel de positionnement page 1 en quelques semaines

### Contenu hardcode vs Sanity

Les pages SEO actuelles sont en dur dans le code. C'est voulu pour la V1 :
- Plus rapide a deployer
- Pas de dependance au CMS pour le contenu SEO
- Le contenu SEO change rarement

A terme, migrer vers Sanity si le volume de pages augmente ou si des non-devs doivent editer le contenu.
