# 🎓 StudentPanel

**StudentPanel** est une application web conçue pour centraliser et gérer efficacement un annuaire d'étudiants au sein d'une formation ou d'un établissement.

> **Contexte du projet :** > Cette application a été entièrement réalisée dans un **cadre scolaire**. Il s'agit d'un projet d'étude visant à mettre en pratique le développement d'interfaces dynamiques, la gestion d'un état global et l'application des bonnes pratiques.

### À quoi sert l'application ? (Présentation Métier)

L'objectif est d'offrir une interface fluide et intuitive pour suivre la vie de la promotion. Elle permet aux utilisateurs de :

- **Consulter la liste** complète des étudiants et rechercher des profils spécifiques.
- **Consulter des fiches détaillées** (biographies, compétences, coordonnées, réseaux professionnels).
- **Piloter les données** en créant, modifiant ou supprimant des profils en temps réel.
- **Personnaliser l'expérience** en mettant en valeur certains profils grâce à un système de favoris (étoiles).

### Comment ça marche ? (Présentation Technique)

D'un point de vue architectural, l'application repose sur la **Composition API de Vue 3** combinée à **Vite** pour un build ultra-rapide. Elle applique les meilleures pratiques de développement actuelles :

- **Centralisation des données :** Tout le traitement des étudiants et des requêtes réseau est isolé dans un magasin d'état global avec **Pinia** (`StudentsStore`).
- **Modularité (Composables) :** La logique métier répétitive, comme le système d'alertes de succès ou d'échec, est externalisée dans des fonctions JavaScript réutilisables (`useNotification`).

---

## Fonctionnalités principales

- **CRUD Étudiants :** Affichage, création, modification et suppression complète des fiches étudiants.
- **Profils enrichis :** Intégration des informations clés (avatar, spécialité, classe, biographie et lien LinkedIn personnalisé).
- **Système de Favoris :** Mise en avant de profils spécifiques, mémorisée de manière réactive à l'échelle de l'application.
- **Notifications Toasts :** Messages d'alerte discrets et épurés apparaissant en bas de l'écran lors des actions de l'utilisateur (création, suppression).

---

## Stack Technique

- **Framework :** Vue 3 (Composition API, `<script setup>`)
- **Build Tool :** Vite
- **Gestion d'état :** Pinia
- **Routage :** Vue Router
- **Base de données / API :** Supabase

---

## Architecture des fichiers clés

- `src/Admin-view/StudentView.vue` : Vue détaillée de la fiche étudiant, gestion de la suppression et affichage du bandeau de notification.
- `src/composables/useNotification.js` : Composable gérant l'état et la durée de visibilité des messages d'alerte.
- `src/stores/StudentsStore.js` : Store unique gérant le tableau des étudiants, le statut de chargement (`loading`), les erreurs et la persistance des favoris.

---

## Installation et Configuration

### 1. Installer les dépendances

```sh
npm install
```

### 2. Lancer le serveur

```sh
npm run dev
```

### 3. Compiler pour la production

```sh
npm run build
```
