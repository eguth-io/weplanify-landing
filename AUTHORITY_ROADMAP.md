# WePlanify — Roadmap Autorite & Backlinks

> Objectif : passer de 0 autorite de domaine a un DR 20+ en 6 mois pour debloquer le ranking sur les requetes competitives.
> Derniere mise a jour : 26 mars 2026.

---

## Etat des lieux (mars 2026)

| Metrique | Valeur actuelle |
|----------|----------------|
| Domain Rating (DR) | ~0 (site neuf) |
| Backlinks | ~0 |
| Pages indexees | ~15/52 soumises |
| Impressions/mois | 760 |
| Clics/mois | 22 |
| Position moyenne | 7.3 |
| Requetes positionnees | ~30 |

**Diagnostic** : Le contenu est au niveau ou superieur a la concurrence. Le SEO technique est solide. Le seul frein majeur est l'autorite de domaine (backlinks, mentions, signaux de confiance).

---

## Phase 1 — Fondations de credibilite (Semaine 1-2)

### 1.1 Auteur fictif credible + E-E-A-T

Creer un profil auteur pour les contenus SEO :

- **Nom** : Alex Martin (ou autre)
- **Titre** : Travel Editor, WePlanify
- **Bio courte** : "Alex has organized 50+ group trips across 30 countries and writes about collaborative travel planning."
- **Photo** : generee par IA ou photo stock avec licence
- **Schema Person** : ajouter sur toutes les pages guides/articles

**Actions :**
- [ ] Choisir le nom et generer la photo
- [ ] Ajouter le composant `AuthorBio` (nom, role, photo, bio courte)
- [ ] Ajouter le schema JSON-LD Person sur les pages : guide, trip-with-friends, bachelorette-trip
- [ ] Ajouter l'auteur dans les meta OG (article:author)

### 1.2 Page "About" / "A propos"

Creer une page `/about` ou `/en/about` qui presente :

- L'equipe (meme si c'est une personne + l'auteur fictif)
- La mission de WePlanify
- Les chiffres cles (nombre de voyages crees, utilisateurs, etc.)
- Liens vers les reseaux sociaux

**Pourquoi** : Google valorise les sites qui montrent qui est derriere. C'est un signal E-E-A-T basique.

- [ ] Creer la page `/about` EN + FR
- [ ] Ajouter dans le footer
- [ ] Ajouter schema Organization avec founders/team

### 1.3 Reseaux sociaux — Presence minimale

Google verifie l'existence de profils sociaux coherents. Creer les comptes suivants (meme avec un contenu minimal) :

- [ ] **Twitter/X** : @weplanify — bio + lien + 3-5 tweets (lancement, tips voyage)
- [ ] **Instagram** : @weplanify — bio + lien + 3-5 posts (visuels app, tips)
- [ ] **LinkedIn** : page entreprise WePlanify — description + lien
- [ ] **Pinterest** : compte + 2-3 boards (travel planning tips, packing lists)

**Lier tous les profils** dans le schema Organization JSON-LD du site (`sameAs`).

---

## Phase 2 — Premiers backlinks faciles (Semaine 2-4)

### 2.1 Directories & listings (backlinks gratuits, DR 30-80)

Soumettre WePlanify sur les directories suivantes :

| Directory | DR estime | Type de lien | Statut |
|-----------|-----------|-------------|--------|
| **AlternativeTo.net** | 70+ | dofollow | [ ] A faire |
| **Product Hunt** | 90+ | dofollow | [ ] A faire (voir Phase 3) |
| **SaaSHub** | 50+ | dofollow | [ ] A faire |
| **BetaList** | 60+ | dofollow | [ ] A faire |
| **Launching Next** | 40+ | dofollow | [ ] A faire |
| **StartupStash** | 45+ | dofollow | [ ] A faire |
| **ToolPilot.ai** | 30+ | dofollow | [ ] A faire |
| **There's An AI For That** | 60+ | dofollow | [ ] A faire |
| **Indie Hackers** (profil + post) | 55+ | nofollow | [ ] A faire |
| **Hacker News** (Show HN) | 90+ | nofollow mais trafic | [ ] A faire |
| **SideProjectors** | 30+ | dofollow | [ ] A faire |
| **MicroLaunch** | 25+ | dofollow | [ ] A faire |

**Action** : Creer un compte sur chaque, rediger une description de 2-3 phrases, soumettre avec lien vers weplanify.com.

### 2.2 Directories voyage specifiques

| Directory | DR estime | Notes |
|-----------|-----------|-------|
| **Capterra** | 90+ | Necessite un produit lance |
| **G2** | 90+ | Necessite un produit lance |
| **TrustPilot** | 95+ | Page business gratuite |
| **AppSumo Marketplace** | 80+ | Si modele freemium |

> Note : Capterra et G2 necessitent que l'app soit lancee publiquement. A faire apres le lancement.

### 2.3 Profils web avec backlinks

Creer des profils sur des plateformes a fort DR avec lien vers le site :

- [ ] **GitHub** : organisation weplanify + lien dans la bio
- [ ] **Medium** : publication @weplanify + 1 article repost
- [ ] **Dev.to** : profil + 1 article technique (ex: "Building a real-time collaborative trip planner with Next.js")
- [ ] **Hashnode** : profil + 1 article
- [ ] **Substack** : newsletter WePlanify (meme avec 0 abonnes, le backlink compte)

---

## Phase 3 — Product Hunt Launch (Semaine 4-6)

Le lancement Product Hunt est le levier backlink le plus puissant pour une startup. Un bon lancement genere :
- 1 backlink dofollow DR 90+
- 50-200 visites le jour du lancement
- Des backlinks secondaires (blogs qui couvrent les produits PH)
- De la credibilite sociale

### Preparation (2 semaines avant)

- [ ] Creer le profil Product Hunt (hunter + maker)
- [ ] Preparer les assets : logo HD, screenshots (5), GIF/video demo (30s)
- [ ] Rediger le tagline : "The free group trip planner with polls, budgets & collaborative itineraries"
- [ ] Rediger la description (200 mots max, focus sur le probleme + la solution)
- [ ] Preparer 3 commentaires du maker (histoire, features cles, roadmap)
- [ ] Recruter 5-10 amis/contacts pour upvoter et commenter le jour J
- [ ] Preparer un post LinkedIn et Twitter pour le jour du lancement

### Jour du lancement

- Publier entre 00:01 et 01:00 PST (mardi, mercredi ou jeudi)
- Poster les commentaires du maker immediatement
- Partager sur tous les reseaux sociaux
- Envoyer par email a votre liste (meme petite)
- Poster sur Indie Hackers, Hacker News (Show HN), Reddit r/startups

### Apres le lancement

- [ ] Ajouter le badge "Featured on Product Hunt" sur la homepage
- [ ] Contacter les blogs qui couvrent les lancements PH pour un article
- [ ] Publier un post-mortem sur Indie Hackers / Medium

---

## Phase 4 — Outreach & Guest Posting (Semaine 4-8)

### 4.1 Guest posts sur blogs voyage

L'objectif est d'obtenir 5-10 articles invites en 2 mois, chacun avec un lien vers WePlanify.

**Cibles FR (ocean bleu, faible concurrence) :**

| Blog | DR | Approche |
|------|-----|----------|
| Blogs voyage FR independants (Voyageurs du Net, Novo-monde, etc.) | 30-50 | Proposer un article "Comment organiser un voyage de groupe sans stress" |
| Le Routard (forum/communaute) | 70+ | Participer aux discussions, lien en signature |
| Toploc blog | 30+ | Article sur les voyages entre amis en France |
| Decathlon Travel blog | 50+ | Partenariat contenu outdoor/group trips |

**Cibles EN :**

| Blog | DR | Approche |
|------|-----|----------|
| Travel blogs mid-tier (Nomadic Matt, Expert Vagabond, etc.) | 50-70 | Guest post "The Complete Guide to Group Trip Budgeting" |
| Tech blogs (dev.to, Hashnode, Medium) | 50-80 | Article technique sur le stack |
| Wedding/bachelorette blogs | 30-50 | Article "How to Plan a Bachelorette Trip Without Losing Your Mind" |

**Template d'approche email :**

```
Subject: Guest post idea — [Topic] for [Blog Name]

Hi [Name],

I'm [Alex/Name] from WePlanify, a free group trip planner. I've been reading [Blog Name] and loved your piece on [recent article].

I'd love to contribute a guest post on "[Proposed Title]" — a practical guide based on my experience organizing 50+ group trips.

The article would cover:
- [Point 1]
- [Point 2]
- [Point 3]

It would be original, actionable, and a great fit for your audience. Happy to adapt the angle to your editorial style.

Would you be open to this?

Best,
[Name]
```

### 4.2 Outreach "Add us to your list"

Contacter les auteurs des articles "best group trip planner apps" pour demander d'ajouter WePlanify :

**Pages cibles :**

- [ ] `avosquado.app/blog/best-group-travel-planning-apps-in-2025` — email l'equipe AvoSquado (ils listent leurs concurrents, on peut etre ajoute)
- [ ] `infinitytransportation.net/blog/group-travel-planning-apps` — blog corporate, accepte souvent les suggestions
- [ ] `joinmytrip.com/blog/en/group-travel-apps/` — communaute voyage, ouvert aux ajouts
- [ ] `travala.com/blog/the-10-best-travel-planning-apps` — blog crypto/voyage
- [ ] `howbout.app/blog/five-apps-to-make-your-group-trips-stress-free` — petit blog, facile a contacter
- [ ] `engine.com/business-travel-guide/group-travel-planning` — corporate travel

**Template :**

```
Subject: Suggestion for your "[Article Title]" article

Hi [Name],

I came across your article on [topic] and found it really helpful. I wanted to suggest adding WePlanify to your list.

WePlanify is a free group trip planner that includes:
- Collaborative itineraries
- Group polls for decisions
- Shared budget tracking
- Smart packing lists

It's specifically built for friend groups (unlike TripIt or Wanderlog which are solo-first), and it's completely free with no limits.

Here's the link: https://www.weplanify.com

Would you consider adding it to your article? Happy to provide screenshots, a description, or any other details you need.

Thanks!
[Name]
```

---

## Phase 5 — Contenu & Link Bait (Semaine 6-12)

### 5.1 Articles de blog avec potentiel backlink

Creer du contenu qui attire naturellement des liens :

| Article | Langue | Pourquoi ca attire des liens |
|---------|--------|----------------------------|
| "Group Trip Budget Calculator (Free Template)" | EN | Templates gratuits = backlinks naturels |
| "The Ultimate Group Trip Packing Checklist (PDF)" | EN+FR | Ressource telechargeable, partageable |
| "Group Travel Statistics 2026: 25 Surprising Facts" | EN | Les articles de stats sont cites par d'autres blogs |
| "Les 15 Meilleures Destinations EVJF en France (2026)" | FR | Fort volume FR, potentiel partage |
| "Group Trip Cost Comparison: 10 Destinations Compared" | EN | Donnees uniques = liens |
| "Comment Organiser un Voyage de Groupe: Checklist Gratuite" | FR | Lead magnet FR |

### 5.2 Infographies

Creer 2-3 infographies partageables :

- "The Anatomy of a Perfect Group Trip" (timeline visuelle)
- "Group Trip Budget Breakdown by Destination" (data viz)
- "How Friends Plan Trips: WhatsApp vs. a Real Tool" (comparaison humoristique)

**Pourquoi** : Les infographies sont le contenu le plus partage et le plus linke. Poster sur Pinterest, soumettre sur Visual.ly et infographic directories.

### 5.3 Etude / sondage original

Realiser un mini-sondage (Google Forms, Twitter poll, ou dans l'app) :

- "We surveyed 500 travelers: here's what makes group trips fail"
- Publier les resultats dans un article
- Pitcher les resultats a des blogs voyage et media

Les donnees originales sont le meilleur aimant a backlinks.

---

## Phase 6 — PR & Media (Semaine 8-16)

### 6.1 HARO / Connectively / Qwoted

S'inscrire comme source experte sur :

- [ ] **Connectively** (ex-HARO) — repondre aux requetes journalistes sur le voyage, la tech, les apps
- [ ] **Qwoted** — meme concept, plus oriente tech
- [ ] **SourceBottle** — version australienne, couvre aussi le marche mondial

Repondre a 3-5 requetes par semaine. Chaque mention dans un article = 1 backlink de qualite.

### 6.2 Press kit

Creer un press kit accessible a `/press` ou `/en/press` :

- [ ] Logo en plusieurs formats (PNG, SVG, light/dark)
- [ ] Screenshots HD de l'app (5-10)
- [ ] Description courte (50 mots) et longue (200 mots)
- [ ] Chiffres cles
- [ ] Citations du fondateur
- [ ] Contact presse

### 6.3 Pitch media

Apres le lancement, pitcher WePlanify a :

| Media | Angle |
|-------|-------|
| TechCrunch / The Verge | "Free group trip planner challenges Wanderlog" |
| Lonely Planet | "New tool makes group travel planning collaborative" |
| Conde Nast Traveler | "The app that saves friendships during group trips" |
| Blogs FR (Madmoizelle, Konbini) | "L'app francaise qui simplifie les voyages entre potes" |
| Wedding media (The Knot, Brides) | "The free bachelorette trip planner bridesmaids actually use" |

---

## Phase 7 — Partenariats strategiques (Mois 3-6)

### 7.1 Micro-influenceurs voyage

- Cibler des comptes Instagram/TikTok 5k-50k followers dans la niche voyage
- Proposition : "Utilisez WePlanify pour votre prochain voyage de groupe, on vous feature sur notre site"
- Pas de budget necessaire — l'outil est gratuit, l'echange est la visibilite

### 7.2 Partenariats croisés avec des apps complementaires

| App | Synergie | Action |
|-----|----------|--------|
| **Splitwise** | Budget/depenses | Article croise, lien mutuel |
| **Rome2Rio** | Transport | Integration ou article |
| **Hostelworld** | Hebergement groupe | Co-marketing |
| **GetYourGuide** | Activites | Affiliation + contenu |

### 7.3 Communautes en ligne

Participer activement (pas spammer) dans :

- [ ] Reddit : r/travel, r/grouptravel, r/bacheloretteparty, r/weddingplanning
- [ ] Facebook Groups : "Travel Planning", "Group Travel", "EVJF France"
- [ ] Discord : serveurs voyage, digital nomads

**Regle** : 80% valeur, 20% mention de WePlanify. Repondre aux questions, partager des tips, mentionner l'outil quand c'est naturel.

---

## KPIs & Suivi

### Objectifs a 3 mois (juin 2026)

| Metrique | Objectif |
|----------|----------|
| Domain Rating (DR) | 10-15 |
| Backlinks totaux | 30+ |
| Backlinks dofollow | 15+ |
| Pages indexees | 40+ / 52 |
| Impressions/mois | 5 000 |
| Clics/mois | 200 |
| Position moyenne | < 15 |

### Objectifs a 6 mois (septembre 2026)

| Metrique | Objectif |
|----------|----------|
| Domain Rating (DR) | 20-25 |
| Backlinks totaux | 80+ |
| Backlinks dofollow | 40+ |
| Pages indexees | 52/52 |
| Impressions/mois | 20 000 |
| Clics/mois | 1 000 |
| Position moyenne | < 10 |
| Conversions depuis organique | 50 signups/mois |

### Outils de suivi

| Outil | Usage | Cout |
|-------|-------|------|
| **Google Search Console** | Impressions, clics, position, indexation | Gratuit |
| **Ahrefs Webmaster Tools** | DR, backlinks, referring domains | Gratuit (version limitee) |
| **Google Analytics 4** | Trafic, conversions, comportement | Gratuit |
| **Ubersuggest** | Suivi de position mots-cles | Gratuit (3 recherches/jour) |

---

## Calendrier resume

| Semaine | Actions cles |
|---------|-------------|
| S1-2 | Auteur fictif + schema, page About, profils sociaux, premiers profils web |
| S2-4 | Soumission directories (10+), profils Medium/Dev.to/Substack |
| S4-6 | Product Hunt launch, premiers guest posts pitches |
| S4-8 | Outreach "add us to your list" (10 emails), guest posts (5 pitches) |
| S6-12 | Articles link bait (budget calculator, stats, checklist PDF), infographies |
| S8-16 | HARO/Connectively, press kit, pitch media |
| M3-6 | Partenariats influenceurs, apps complementaires, communautes |

---

## Notes

- **Pas de PBN, pas de liens achetes** — Google penalise. Tous les liens doivent etre naturels ou editoriaux.
- **La qualite prime sur la quantite** — 1 backlink d'un site DR 60 vaut plus que 50 backlinks de sites DR 5.
- **Le contenu est le meilleur aimant** — les templates, calculateurs et donnees originales attirent des liens sans outreach.
- **Le marche FR est un avantage** — quasi zero concurrence, les blogs FR sont plus accessibles que les US/UK.
- **SquadTrip est DOWN** — c'est une fenetre d'opportunite pour capter leur trafic et leurs mentions.
