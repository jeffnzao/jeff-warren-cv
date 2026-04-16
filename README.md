# 🚀 Jeff Warren — CV en ligne (Next.js)

Site CV interactif, moderne et responsive, déployable sur Vercel en quelques minutes.

**Stack :** Next.js 14 · React · Tailwind CSS · TypeScript · Framer Motion · EmailJS

---

## 📁 Structure du projet

```
jeff-warren-cv/
├── app/
│   ├── globals.css        # Styles globaux + Tailwind
│   ├── layout.tsx         # Layout racine + métadonnées SEO
│   └── page.tsx           # Page principale (gestion langue)
├── components/
│   ├── Navbar.tsx         # Navigation sticky + toggle langue/CV
│   ├── Hero.tsx           # Section d'accueil + code snippet
│   ├── About.tsx          # À propos + stats
│   ├── Skills.tsx         # Grille de compétences
│   ├── Experience.tsx     # Timeline expériences
│   ├── Projects.tsx       # Projets avec filtre par catégorie
│   ├── Contact.tsx        # Formulaire de contact (EmailJS)
│   └── Footer.tsx         # Pied de page + liens sociaux
├── data/
│   └── cv.json            # ⭐ TOUTES vos données CV ici
├── public/
│   ├── photo.jpg          # Votre photo (à ajouter)
│   └── cv-jeff-warren.pdf # Votre CV PDF (à ajouter)
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── vercel.json
```

---

## ⚡ Installation & Lancement local

### Prérequis
- **Node.js** v18+ → [nodejs.org](https://nodejs.org)
- **npm** v9+ (inclus avec Node)
- **VS Code** (recommandé) → [code.visualstudio.com](https://code.visualstudio.com)

### Étapes

**1. Ouvrir le dossier dans VS Code**
```bash
# Dans VS Code : File > Open Folder > sélectionner "jeff-warren-cv"
# Ou en terminal :
code jeff-warren-cv
```

**2. Ouvrir le terminal intégré VS Code**
```
Ctrl+` (backtick) ou Terminal > New Terminal
```

**3. Installer les dépendances**
```bash
npm install
```
> ⏳ Environ 30–60 secondes la première fois.

**4. Lancer le serveur de développement**
```bash
npm run dev
```

**5. Ouvrir dans le navigateur**
```
http://localhost:3000
```

> ✅ Le site se recharge automatiquement à chaque modification de fichier.

---

## 🎨 Personnalisation

### 1. Modifier vos informations
Tout le contenu est dans **`data/cv.json`** — ouvrez-le et modifiez :

```json
{
  "personal": {
    "name": "Votre Nom",
    "email": "votre@email.com",
    "phone": "+33 X XX XX XX XX",
    "linkedin": "https://linkedin.com/in/votre-profil",
    "github": "https://github.com/votre-pseudo"
  }
}
```

### 2. Ajouter votre photo
Placez votre photo dans `public/photo.jpg`
> Format recommandé : 400×400px, JPEG ou PNG

### 3. Ajouter votre CV PDF
Placez votre CV PDF dans `public/cv-jeff-warren.pdf`
> Le bouton "Télécharger CV" dans la navbar pointera automatiquement vers ce fichier.

### 4. Ajouter un projet
Dans `data/cv.json`, dans le tableau `projects` :
```json
{
  "title": { "fr": "Mon Projet", "en": "My Project" },
  "description": {
    "fr": "Description en français.",
    "en": "Description in English."
  },
  "tags": ["Tag1", "Tag2"],
  "category": "servicenow",
  "github": "https://github.com/...",
  "demo": "https://monprojet.com",
  "icon": "layers"
}
```
> **Icônes disponibles :** `layers`, `code`, `box`, `database`, `settings`, `tool`, `clock`

### 5. Ajouter une expérience
Dans `data/cv.json`, dans le tableau `experiences` :
```json
{
  "date": { "fr": "Janvier 2025 - Aujourd'hui", "en": "January 2025 - Present" },
  "title": { "fr": "Mon Poste", "en": "My Role" },
  "company": "Nom de l'entreprise",
  "current": true,
  "missions": {
    "fr": ["Mission 1", "Mission 2"],
    "en": ["Task 1", "Task 2"]
  },
  "tags": ["Tag1", "Tag2"]
}
```

### 6. Changer les couleurs
Dans `tailwind.config.js`, modifiez la couleur `primary` :
```js
primary: {
  500: '#5563f5', // ← Changez cette valeur (hex)
  600: '#4044eb',
  ...
}
```
> Utilisez [coolors.co](https://coolors.co) pour trouver vos couleurs.

---

## 📧 Configurer le formulaire de contact (EmailJS)

1. Créez un compte gratuit sur [emailjs.com](https://www.emailjs.com)
2. Créez un **Service** (Gmail, Outlook, etc.)
3. Créez un **Template** avec les variables : `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Récupérez vos clés dans le Dashboard EmailJS
5. Ouvrez `components/Contact.tsx` et remplacez :
```typescript
const SERVICE_ID  = 'YOUR_SERVICE_ID';   // → votre Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // → votre Template ID
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // → votre Public Key
```

> Sans configuration EmailJS, le formulaire ouvre automatiquement votre client mail (mailto fallback).

---

## 🚀 Déploiement sur Vercel

### Option A — Via GitHub (recommandé)

**Étape 1 : Pousser sur GitHub**
```bash
# Dans le terminal VS Code, dans le dossier jeff-warren-cv :
git init
git add .
git commit -m "feat: initial CV site"

# Créez un repo sur github.com, puis :
git remote add origin https://github.com/VOTRE_PSEUDO/jeff-warren-cv.git
git branch -M main
git push -u origin main
```

**Étape 2 : Déployer sur Vercel**
1. Allez sur [vercel.com](https://vercel.com) → connectez-vous avec GitHub
2. Cliquez **"Add New Project"**
3. Sélectionnez votre repo `jeff-warren-cv`
4. Laissez les paramètres par défaut (Vercel détecte Next.js automatiquement)
5. Cliquez **"Deploy"**

> ✅ En 2 minutes, votre site est en ligne à `https://jeff-warren-cv.vercel.app`

**Déploiements suivants :**
```bash
git add .
git commit -m "update: nouvelle expérience"
git push
```
> Vercel redéploie automatiquement à chaque push sur `main`.

### Option B — Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🔧 Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (localhost:3000) |
| `npm run build` | Build de production |
| `npm run start` | Lancer la version de production en local |
| `npm run lint` | Vérifier les erreurs TypeScript/ESLint |

---

## 🐛 Dépannage fréquent

**Erreur `Module not found`**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

**Port 3000 déjà utilisé**
```bash
npm run dev -- --port 3001
```

**Erreur TypeScript**
```bash
npm run lint
# Lire les messages d'erreur et corriger dans VS Code
```

**Le PDF ne se télécharge pas**
→ Vérifiez que `cv-jeff-warren.pdf` est bien dans le dossier `public/`

---

## 💡 Conseils de personnalisation avancée

- **Police :** Modifiez l'import Google Fonts dans `app/globals.css`
- **Animations :** Ajustez les durées dans `tailwind.config.js` > `animation`
- **SEO :** Mettez à jour les métadonnées dans `app/layout.tsx`
- **Favicon :** Ajoutez `favicon.ico` dans le dossier `public/`
- **Domaine custom :** Dans Vercel > Settings > Domains, ajoutez votre domaine

---

## 📄 Licence

Projet personnel — libre d'utilisation et modification.

---

*Fait avec ❤️ — Stack : Next.js 14 · React · Tailwind CSS · TypeScript*
