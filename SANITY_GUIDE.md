# Guide de configuration Sanity Studio - Weplanify Landing

## Vue d'ensemble

La nouvelle structure Sanity a été mise à jour pour correspondre à la nouvelle refonte de la landing page. Un nouveau schéma `landingPage` a été créé avec des groupes logiques pour faciliter l'édition.

## Accès au Studio

1. Démarrez le serveur de développement : `yarn dev`
2. Accédez à Sanity Studio : `http://localhost:3000/studio`
3. Créez un nouveau document de type "Landing Page"

## Structure des groupes

Le schéma est organisé en 9 groupes thématiques :

### 1. Hero Section
**Groupe : "Hero Section"**

- **Tag Programme d'affiliation** : Texte du petit tag orange en haut
  - Valeur par défaut : "Programme d'affiliation disponible."

- **Titre principal** : Le grand titre de la hero section
  - Exemple : "Planifiez, partagez, partez :\nune seule appli pour tout gérer !"

- **Description** : Paragraphe sous le titre
  - Exemple : "Fini les discussions interminables et les informations dispersées !\nNotre application centralise tout ce dont vous avez besoin pour un voyage réussi."

- **Texte du bouton CTA** : Texte du bouton principal
  - Valeur par défaut : "Commencer mon voyage"

- **Image de fond Hero** : Image de fond de la section hero
  - Format recommandé : 1920x800px minimum

### 2. Testimonial & Stats
**Groupe : "Testimonial & Stats"**

- **Témoignage mis en avant**
  - Citation : "J'utilise WePlanify depuis quelques semaines..."
  - Auteur : "Julian"

- **Titre de la section Stats**
  - Exemple : "Chaque voyage mérite de commencer sereinement"

- **Statistiques** (Array) - Ajouter 2 éléments :
  - Stat 1 :
    - Valeur : "120+"
    - Libellé : "Destination possible"
    - Afficher une étoile : Non
  - Stat 2 :
    - Valeur : "4,8"
    - Libellé : "Satisfaction des voyageurs"
    - Afficher une étoile : Oui

### 3. Section Monde
**Groupe : "Section Monde"**

- **Titre** : "Le monde s'organise autour de votre voyage"
- **Description** : "Des ruelles de Lisbonne aux temples de Kyoto..."
- **Texte du CTA** : "Commencer mon voyage"
- **Images de destinations** : Ajouter 4 images
  - Format recommandé : 480x640px (ratio 3:4)
  - Ces images apparaîtront avec une rotation aléatoire

### 4. Bannière défilante
**Groupe : "Bannière défilante"**

- **Éléments de la bannière** : Array de textes qui défilent
  - "LE MONDE, BIEN PLANIFIÉ"
  - "VOYAGEZ SANS STRESS"
  - "VOTRE ITINÉRAIRE, VOTRE RYTHME"
  - "LA LIBERTÉ DE VOYAGER"

### 5. Fonctionnalités
**Groupe : "Fonctionnalités"**

- **Titre de la section** : "Un logiciel tout-en-un pensé par et pour les voyageurs"
- **Image de la fonctionnalité** : Image principale de la section
  - Format : 864x450px

- **Titre pour les cartes empilées** : "De l'idée au voyage parfait en quelques clics."

- **Cartes de fonctionnalités** : Array de 3 cartes
  - Carte 1 :
    - Titre : "Structure de votre voyage"
    - Description : "Planifiez votre voyage / événement en toute simplicité..."
    - Icône : Image/icône
    - Couleur de fond : "#FFFBF5"

  - Carte 2 :
    - Titre : "Collaborez en équipe"
    - Description : "Invitez vos amis et partagez vos idées..."
    - Icône : Image/icône
    - Couleur de fond : "#EEF899"

  - Carte 3 :
    - Titre : "Restez organisé"
    - Description : "Gardez tous vos documents..."
    - Icône : Image/icône
    - Couleur de fond : "#61DBD5"

### 6. Étapes de voyage
**Groupe : "Étapes de voyage"**

- **Titre de la section** : "Organisez votre voyage\nen 3 étapes"

- **Étapes du voyage** : Array de 3 étapes
  - Étape 1 :
    - Numéro : "01"
    - Titre : "Définissez vos envies"
    - Description : "Destination Weplanify : renseignez les informations..."
    - Icône : Image/icône

  - Étape 2 :
    - Numéro : "02"
    - Titre : "Planifiez intelligemment"
    - Description : "..."
    - Icône : Image/icône

  - Étape 3 :
    - Numéro : "03"
    - Titre : "Partagez et impressionnez"
    - Description : "Exportez ou partagez-le directement..."
    - Icône : Image/icône

### 7. Témoignages
**Groupe : "Témoignages"**

- **Titre de la section** : "Ce que disent nos voyageurs"

- **Liste des témoignages** : Array
  - Témoignage 1 :
    - Citation : "La planification de voyage ne devrait pas être un casse-tête..."
    - Auteur : "Valentine"
    - Rôle : "Fondateur & CEO"
    - Photo : Image du profil
    - Note : 5

### 8. CTA & Support
**Groupe : "CTA & Support"**

**CTA Banner :**
- **Titre** : "Transformez vos idées en voyages inoubliables. Gratuitement."
- **Description** : "Planifiez autant de voyages que vous voulez. Sans rien payer."
- **Texte du bouton** : "Commencer mon voyage"
- **Image de fond** : Image de fond du CTA
  - Format recommandé : 1536x700px

**FAQ Support :**
- **Titre section FAQ** : "Un voyage sans question"
- **Questions fréquentes** : Array de 6 questions
  - Question 1 :
    - Question : "Comment fonctionne WePlanify ?"
    - Réponse : "WePlanify est une plateforme intuitive..."

**Ready Banner :**
- **Titre** : "Prêt à créer des voyages\ninoubliables ?"
- **Description** (optionnel) : Une description sous le titre si nécessaire
- **Badges flottants** : Array de badges animés (max 4 recommandé)
  - Badge 1 :
    - Emoji : "🆕"
    - Texte : "Lancé en 2024"
    - Couleur de fond : "#F6391A"
    - Couleur du texte : "#FFFFFF"
    - Position : "En haut à gauche"
  - Badge 2 :
    - Emoji : "🌍"
    - Texte : "12 destinations phares"
    - Couleur de fond : "#FFFFFF"
    - Couleur du texte : "#001E13"
    - Position : "En haut à droite"
  - Badge 3 :
    - Emoji : "⭐"
    - Texte : "4.9/5 de satisfaction"
    - Couleur de fond : "#61DBD5"
    - Couleur du texte : "#001E13"
    - Position : "En bas à gauche"
  - Badge 4 :
    - Emoji : "✈️"
    - Texte : "500+ itinéraires créés en 2024"
    - Couleur de fond : "#005939"
    - Couleur du texte : "#FFFFFF"
    - Position : "En bas à droite"
- **Texte du bouton** : "Commencer mon voyage"

> **Note**: Les badges suivent le curseur de la souris avec un effet magnétique unique pour chaque badge. Vous pouvez ajouter jusqu'à 4 badges différents avec des positions personnalisables.

### 9. Footer
**Groupe : "Footer"**

- **Colonnes du footer** : Array de 3 colonnes
  - Colonne 1 : "Fonctionnalités"
    - Lien 1 : Planificateur de voyage
    - Lien 2 : Gestion du budget
    - Lien 3 : Collaboration en équipe

  - Colonne 2 : "À propos"
    - Lien 1 : Notre mission
    - Lien 2 : L'équipe
    - Lien 3 : Contact

  - Colonne 3 : "Support"
    - Lien 1 : Guide d'utilisation
    - Lien 2 : FAQ
    - Lien 3 : Blog
    - Lien 4 : Témoignages

- **CTA Footer :**
  - Titre : "Rejoignez nous maintenant !"
  - Description : "Lorem ipsum dolor sit amet..."
  - Texte du bouton : "Commencer mon voyage"

- **Liens réseaux sociaux** : Array
  - Instagram : URL
  - TikTok : URL

- **Liens légaux** : Array
  - Mention légale
  - Politique de confidentialité
  - CGU

## Migration depuis l'ancien schéma

Les anciens schémas (`nav`, `home`, `features`, etc.) sont conservés pour compatibilité mais ne sont plus utilisés dans la nouvelle version de la page.

Pour migrer :
1. Créez un nouveau document "Landing Page" dans Sanity Studio
2. Remplissez toutes les sections avec le contenu approprié
3. Téléchargez les images nécessaires
4. Une fois terminé, la page utilisera automatiquement ces données

## Commandes utiles

- Démarrer le dev : `yarn dev`
- Build : `yarn build`
- Accéder au studio : `http://localhost:3000/studio`

## Support

Pour toute question sur la configuration de Sanity, consultez la documentation officielle : https://www.sanity.io/docs
