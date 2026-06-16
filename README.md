# FFMM — Documentation technique

Portail web pour professionnels de la musique et de l'événementiel. Articles de blog, sections éditables par le client, ressources téléchargeables (PDF, pictogrammes, plans).

---

## Sommaire

1. [Architecture](#1-architecture)
2. [Prérequis](#2-prérequis)
3. [Démarrage rapide](#3-démarrage-rapide)
4. [Structure du projet](#4-structure-du-projet)
5. [Payload CMS — mode d'emploi](#5-payload-cms--mode-demploi)
6. [Infrastructure Docker](#6-infrastructure-docker)
7. [Gestion des utilisateurs](#7-gestion-des-utilisateurs)
8. [Ajouter une collection](#8-ajouter-une-collection)
9. [Déploiement](#9-déploiement)

---

## 1. Architecture

Ce projet adopte une architecture **monorepo** : le CMS (back-office) et le site public (front-end) cohabitent dans le même dépôt et la même application Next.js.

```
Site public          →  /           (Next.js, React, Tailwind)
Back-office client   →  /admin      (Payload CMS Admin UI)
API REST             →  /api        (Payload CMS REST API)
```

**Pourquoi ce choix ?**

- **Souveraineté des données** : tout est self-hosted, rien ne passe par un SaaS tiers.
- **Un seul déploiement** : une image Docker, un VPS — pas de services séparés à maintenir.
- **Payload CMS** est un CMS open-source TypeScript-first. Il génère automatiquement une API REST, une interface d'administration, et des types TypeScript depuis les définitions de collections.

**Stack :**

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Langage | TypeScript 5 |
| CMS | Payload CMS v3 |
| Base de données | PostgreSQL 16 (via Docker) |
| Stockage fichiers | MinIO (S3 self-hosted, via Docker) |
| Styles | Tailwind CSS v4 |
| Package manager | pnpm |

---

## 2. Prérequis

- **Node.js** ≥ 20 (recommandé : 22 LTS)
- **pnpm** ≥ 9 — `npm install -g pnpm`
- **Docker Desktop** (ou Docker Engine + Compose v2)

---

## 3. Démarrage rapide

### 3.1 Cloner et installer

```bash
git clone <url-du-repo>
cd FMM-25-26
pnpm install
```

### 3.2 Variables d'environnement

```bash
cp .env.example .env
# Éditer .env si nécessaire (les valeurs par défaut fonctionnent en local)
```

### 3.3 Démarrer l'infrastructure

```bash
docker compose up -d
```

Cela lance :
- PostgreSQL sur `localhost:5433`
- MinIO sur `localhost:9000` (API S3) et `localhost:9001` (console web)

### 3.4 Créer le bucket MinIO

À la première installation, le bucket S3 doit être créé manuellement :

1. Ouvrir `http://localhost:9001` (console MinIO)
2. Se connecter avec `minioadmin` / `minioadmin`
3. Créer un bucket nommé `ffmm-media`
4. Le passer en **public** (Access Policy → Public)

### 3.5 Lancer le serveur de développement

```bash
pnpm dev
```

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Site public |
| `http://localhost:3000/admin` | Back-office Payload |
| `http://localhost:9001` | Console MinIO |

### 3.6 Créer le premier compte administrateur

À la première visite de `/admin`, Payload redirige vers `/admin/create-first-user`. Créer un compte — ce compte sera le `super-admin`. Après création, exécuter :

```bash
docker exec -it fmm-25-26-postgres-1 psql -U payload -d ffmm \
  -c "UPDATE users SET role = 'super-admin' WHERE email = 'votre@email.com';"
```

---

## 4. Structure du projet

```
FMM-25-26/
├── src/
│   ├── app/
│   │   ├── layout.tsx                     # Root layout minimal (pass-through)
│   │   ├── (front-end)/                   # Route group — site public
│   │   │   ├── layout.tsx                 # Layout HTML/CSS du site
│   │   │   ├── globals.css                # Styles globaux + Tailwind
│   │   │   └── page.tsx                   # Page d'accueil
│   │   └── (payload)/                     # Route group — Payload CMS
│   │       ├── admin/
│   │       │   ├── importMap.js           # Auto-généré par Payload (ne pas modifier)
│   │       │   └── [[...segments]]/
│   │       │       ├── layout.tsx         # Layout admin Payload
│   │       │       ├── page.tsx           # Pages admin Payload
│   │       │       ├── not-found.tsx      # 404 admin
│   │       │       └── actions.ts         # Server actions Payload
│   │       └── api/
│   │           └── [...slug]/
│   │               └── route.ts           # Routes API REST Payload
│   ├── collections/                       # Définitions des collections Payload
│   │   ├── Users.ts                       # Collection utilisateurs + auth
│   │   └── Media.ts                       # Collection médias (images, PDF…)
│   ├── payload.config.ts                  # Configuration centrale Payload
│   ├── payload-types.ts                   # Types auto-générés (ne pas modifier)
│   └── server/
│       └── env.ts                         # Variables d'env serveur (server-only)
├── docker-compose.yml                     # PostgreSQL + MinIO
├── next.config.ts                         # Config Next.js (withPayload wrapper)
├── .env                                   # Variables d'environnement locales (gitignore)
├── .env.example                           # Template des variables d'environnement
└── tsconfig.json
```

### Route groups Next.js

Les parenthèses dans les noms de dossiers (`(front-end)`, `(payload)`) sont une fonctionnalité Next.js App Router. Elles permettent de grouper des routes sans affecter l'URL, et surtout d'avoir des **layouts différents** pour le site public et l'admin.

---

## 5. Payload CMS — mode d'emploi

### 5.1 Concept : les collections

Une **collection** est un type de contenu. Chaque collection correspond à une table PostgreSQL et génère automatiquement :
- Des routes API REST (`GET /api/media`, `POST /api/media`, etc.)
- Une interface d'administration dans `/admin`
- Des types TypeScript dans `payload-types.ts`

Les collections sont définies dans `src/collections/` et enregistrées dans `src/payload.config.ts`.

### 5.2 Collections actuelles

| Collection | Slug | Description |
|-----------|------|-------------|
| Users | `users` | Comptes administrateurs avec authentification |
| Media | `media` | Fichiers uploadés (images, PDF, pictogrammes, plans) |

> Les collections métier (articles de blog, sections éditables, etc.) seront ajoutées après validation de la maquette.

### 5.3 Interface d'administration (`/admin`)

L'interface admin est réservée aux utilisateurs authentifiés. Elle permet de :
- Créer, lire, modifier et supprimer des entrées dans chaque collection
- Uploader des fichiers vers MinIO
- Gérer les utilisateurs (super-admin uniquement)

### 5.4 API REST

Payload expose une API REST complète accessible sous `/api` :

```
GET    /api/media          → liste des médias
POST   /api/media          → créer un média
GET    /api/media/:id      → un média par ID
PATCH  /api/media/:id      → modifier un média
DELETE /api/media/:id      → supprimer un média

POST   /api/users/login    → authentification
POST   /api/users/logout   → déconnexion
GET    /api/users/me       → utilisateur courant
```

Documentation complète : [https://payloadcms.com/docs/rest-api/overview](https://payloadcms.com/docs/rest-api/overview)

### 5.5 Fichier `payload.config.ts`

C'est le point d'entrée central de Payload. Il configure :

```typescript
buildConfig({
  collections: [...],     // collections enregistrées
  db: postgresAdapter(),  // adaptateur base de données
  plugins: [s3Storage()], // stockage des fichiers
  editor: lexicalEditor(), // éditeur rich text
  secret: '...',          // clé JWT (ne jamais exposer)
})
```

### 5.6 Types auto-générés

Payload génère automatiquement `src/payload-types.ts` au démarrage du serveur de développement. Ce fichier contient les types TypeScript de toutes les collections. **Ne pas modifier ce fichier manuellement.**

---

## 6. Infrastructure Docker

### 6.1 PostgreSQL

Base de données principale. Toutes les données structurées (collections, utilisateurs, etc.) sont stockées ici.

```bash
# Démarrer uniquement PostgreSQL
docker compose up -d postgres

# Se connecter à la base
docker exec -it fmm-25-26-postgres-1 psql -U payload -d ffmm

# Arrêter et supprimer les données (reset complet)
docker compose down -v
```

**Port local :** `5433` (et non 5432, pour éviter les conflits avec une installation PostgreSQL locale)

### 6.2 MinIO (stockage S3 self-hosted)

Stockage des fichiers uploadés (images, PDF, etc.). Compatible avec l'API Amazon S3.

```bash
# Démarrer uniquement MinIO
docker compose up -d minio
```

| URL | Description |
|-----|-------------|
| `http://localhost:9000` | API S3 (utilisée par Payload) |
| `http://localhost:9001` | Console d'administration web |

**Credentials par défaut (développement) :** `minioadmin` / `minioadmin`

> En production, utiliser des credentials forts via les variables `MINIO_ROOT_USER` et `MINIO_ROOT_PASSWORD`.

### 6.3 Persistance des données

Les données sont persistées dans des volumes Docker nommés (`postgres_data`, `minio_data`). Elles survivent aux redémarrages de containers.

```bash
# Voir les volumes existants
docker volume ls | grep fmm

# Supprimer toutes les données (reset complet)
docker compose down -v
```

---

## 7. Gestion des utilisateurs

### 7.1 Rôles

| Rôle | Accès |
|------|-------|
| `super-admin` | Accès complet — gestion des utilisateurs, de tout le contenu |
| `admin` | Accès au contenu uniquement — ne peut pas gérer les utilisateurs |

### 7.2 Premier compte

Le premier compte est créé via `/admin/create-first-user`. Son rôle par défaut est `admin`. Le passer en `super-admin` immédiatement :

```bash
docker exec -it fmm-25-26-postgres-1 psql -U payload -d ffmm \
  -c "UPDATE users SET role = 'super-admin' WHERE email = 'votre@email.com';"
```

### 7.3 Créer des comptes supplémentaires

Depuis `/admin` (connecté en super-admin) → Collections → Users → Créer.

---

## 8. Ajouter une collection

1. Créer `src/collections/MaCollection.ts` :

```typescript
import type { CollectionConfig } from 'payload';

export const MaCollection: CollectionConfig = {
  slug: 'ma-collection',
  admin: {
    useAsTitle: 'titre',
  },
  fields: [
    {
      name: 'titre',
      type: 'text',
      required: true,
    },
    {
      name: 'contenu',
      type: 'richText',
    },
  ],
};
```

2. L'enregistrer dans `src/payload.config.ts` :

```typescript
import { MaCollection } from '@/collections/MaCollection';

export default buildConfig({
  collections: [Users, Media, MaCollection], // ← ajouter ici
  // ...
});
```

3. Redémarrer le serveur de développement — Payload crée la table PostgreSQL et génère les types TypeScript automatiquement.

**Types de champs disponibles :** `text`, `richText`, `number`, `date`, `select`, `checkbox`, `relationship`, `upload`, `array`, `blocks`…
Documentation : [https://payloadcms.com/docs/fields/overview](https://payloadcms.com/docs/fields/overview)

---

## 9. Déploiement

> Cible : VPS Scaleway (France), Docker Compose.

### Variables d'environnement production

Copier `.env.example` et remplir avec les valeurs de production. Les secrets ne doivent **jamais** être commités dans le dépôt.

Points importants pour la production :
- `NEXT_PUBLIC_SERVER_URL` → domaine public (ex: `https://ffmm.fr`)
- `PAYLOAD_SECRET` → générer avec `openssl rand -base64 32`
- `DATABASE_URI` → `postgresql://payload:PASSWORD@postgres:5432/ffmm` (réseau Docker interne)
- `S3_ENDPOINT` → `http://minio:9000` (réseau Docker interne)
- `S3_FORCE_PATH_STYLE` → `true` pour MinIO, `false` pour AWS S3

### Commandes

```bash
# Build de l'image
docker build -t ffmm .

# Démarrer en production
docker compose -f docker-compose.prod.yml up -d
```

> Le `Dockerfile` multi-stage et le `docker-compose.prod.yml` sont à créer avant le premier déploiement.

---

## Commandes de référence

```bash
# Développement
pnpm dev                           # démarrer le serveur
docker compose up -d               # démarrer PostgreSQL + MinIO
docker compose down                # arrêter les containers
docker compose down -v             # arrêter + supprimer les données

# Base de données
docker exec -it fmm-25-26-postgres-1 psql -U payload -d ffmm

# Logs
docker compose logs -f postgres
docker compose logs -f minio
```
