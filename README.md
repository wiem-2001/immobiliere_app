# Application Immobilière

Application web de gestion de propriétés permettant de créer, lire, mettre à jour et supprimer des annonces immobilières.

Technologie utilisées :
* Frontend : React 19 + TypeScript 5 + TailwindCSS 4 + Zustand 5
* Backend : Node.js 20 + Express 5 + Prisma 5 + PostgreSQL


## Lancer le projet 
1- Cloner le projet
```bash
git clone https://github.com/wiem-2001/immobiliere_app.git
cd immobiliere-app
```
2- Backend (installer les dépendances,Configurer la base de données PostgreSQL dans le fichier ```.env ```que vous créez sur la racine du ```backend```, générer le client Prisma,lancer les migrations finalement démarrer le serveur )
```bash
cd backend
npm install
# Configurer .env avec DATABASE_URL
npx prisma generate
npx prisma migrate dev
npm run dev
```
3-Frontend (installer les dépendances aprés démarrer le serveur ):
```bash
cd ../frontend
npm install
npm run dev
```

## Architecture Frontend
```
src/
├── api/           # Couche de communication avec le backend (API HTTP) isolée
├── assets/        # Fichiers statiques
├── components/    # Composants UI réutilisables (PropertyForm, ItemCard, ConfirmModal)
├── constants/     # Constantes de l’application (routes, etc.)
├── lib/           # Configuration globale et utilitaires (instance Axios réutilisable pour toutes les requêtes du frontend,etc)
├── pages/         # Pages liées aux routes (CRUD)
├── routes/        # Définition et configuration des routes de l’application
├── store/         # Gestion centralisée de l’état avec Zustand
├── types/         # Types TypeScript
├── App.tsx        # Composant racine de l’application
├── main.tsx       # Point d’entrée de l’application
└── .env.example   # Exemple de variables d’environnement
```
## Architecture Backend
```
backend/
├── prisma/
│   └── schema.prisma          # Modèle de données Prisma (tables, relations, types)
├── src/
│   ├── controllers/           # Logique métier et gestion des réponses HTTP
│   ├── middlewares/           # Middlewares Express (ex: validate.js pour valider les requêtes)
│   ├── routes/                # Définition des endpoints Express (itemRoutes.js)
│   ├── schemas/               # Schémas de validation avec Zod (itemSchema.js)
│   ├── services/              # Opérations sur la base de données (itemService.js)
│   └── utils/                 # Fonctions utilitaires, gestion centralisée des erreurs (errorHandler.js)
├── app.js                      # Configuration Express (middlewares, routes principales)
├── prisma.js                   # Instance partagée de Prisma Client
├── server.js                   # Point d’entrée du serveur, démarre l’application
├── .env.example                # Variables d’environnement 
├── package.json                # Dépendances et scripts
└── prisma.config.ts            # Configuration TypeScript pour Prisma
```
## Pourquoi cette architecture
Cette architecture est conçue pour séparer clairement les responsabilités, améliorer la maintenabilité et la scalabilité, tout en rendant le code prévisible et réutilisable :

### Frontend

```components/``` : composants UI réutilisables.

```store/ ``` (Zustand) : état centralisé, partagé entre pages et composants sans prop drilling.

```api/ ```: Couche d’abstraction pour toutes les requêtes HTTP vers le backend facilitant la maintenance et l’évolution des endpoints sans impacter les composants.

```constants/routes.ts```: permet de ne pas hardcoder les URLs.

```pages/ ``` et ``` routes/ ```: organisent les vues selon les endpoints et la navigation.

```types/``` et ```lib/ ```: typage strict et utilitaires réutilisables, assurant cohérence et sécurité.

### Backend

```routes/``` : définit les endpoints Express.

```services/``` : les opérations sur la base via Prisma.

```schemas/ ```: validation des données entrantes avec Zod avant qu’elles n’atteignent le controller, évitant les erreurs et sécurisant l’API.

```middlewares/``` : Intercepte les requêtes entrantes avant qu’elles n’atteignent les controllers ou les réponses sortantes avant qu’elles ne soient envoyées.

```utils/ ```: contient le errorHandler, centralisant la gestion des erreurs pour éviter la duplication et garantir une réponse uniforme et utilisé pour les utilié.

```prisma.js```: exporte une instance partagée de Prisma Client, optimisant les connexions à la base et évitant de créer plusieurs instances.

## Ce que j'aurais ajouté si j'avais plus de temps
Si j’avais eu plus de temps, j’aurais envisagé d’intégrer React Query pour gérer les requêtes et le cache côté frontend, ce qui aurait permis une meilleure gestion des états asynchrones et des performances optimisées. Je n’ai pas voulu l’utiliser dans ce projet afin d’éviter de livrer un mauvais code sans avoir eu le temps de bien l’apprendre et le maîtriser.

De plus, j’avais prévu d’ajouter des fonctionnalités avancées côté frontend, mais pour cette version, j’ai implémenté un filtre simple permettant de rechercher les propriétés par titre ou ville, afin de proposer au moins un outil de tri et de recherche.
