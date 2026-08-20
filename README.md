# Faizan Ali  Portfolio Website

A minimalist, animated portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**. Inspired by the sydney-nguyen style reference: cream background, dark charcoal typography, orbiting image ring, and pop-up project cards.

---

## ✦ Features

- **Animated orbit ring** around the hero  9 images rotate in a circle; hover pauses animation and shows a label tooltip
- **Cycling avatar**  add 3–4 of your own PNG images and they cross-fade automatically
- **Custom cursor**  black dot that scales up on hover over interactive elements
- **Project cards**  pop upward on hover (cubic-bezier spring), with arrow reveal
- **Dynamic project pages**  `/projects/[id]` with full case study layout
- **Static export**  deploys to Netlify with zero config
- **Fully responsive**  mobile-first, collapses cleanly to small screens

---

## 📁 Project Structure

```
faizan-portfolio/
├── netlify.toml
├── next.config.js
├── tailwind.config.js
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout + metadata
│   │   ├── page.tsx            ← Home page (Hero + Projects + About)
│   │   ├── globals.css         ← Global styles + cursor + animations
│   │   ├── not-found.tsx       ← 404 page
│   │   └── projects/
│   │       └── [id]/
│   │           └── page.tsx    ← Dynamic project detail page
│   ├── components/
│   │   ├── Navbar.tsx          ← Fixed nav with socials
│   │   ├── HeroOrbit.tsx       ← Orbit ring + cycling avatar
│   │   ├── ProjectsSection.tsx ← Project card grid
│   │   ├── AboutSection.tsx    ← Bio + skills + certs
│   │   ├── Footer.tsx          ← Contact footer
│   │   └── CustomCursor.tsx    ← Black dot cursor
│   └── data/
│       └── projects.ts         ← All project data (edit here)
└── public/
    └── images/
        ├── avatar/             ← YOUR avatar PNGs go here
        │   ├── avatar-1.png
        │   ├── avatar-2.png
        │   ├── avatar-3.png
        │   └── avatar-4.png
        ├── orbit/              ← Orbit ring images (rounded-corner JPGs)
        │   ├── orbit-1.jpg … orbit-9.jpg
        └── projects/           ← Project cover images
            ├── tkstream-cover.jpg
            └── glamgo-cover.jpg
```

---

## 🖼 Cloudinary Media Setup

Media is configured in `src/data/media.ts`. The site uses Cloudinary delivery URLs for the orbit images, four hero avatars, project galleries, and project videos. This keeps large media files out of the Next.js bundle while preserving the existing layout and behavior.

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` to the Cloud Name shown in your Cloudinary dashboard.
3. For each uploaded asset, copy its **Public ID** into the matching variable. Include folders in the Public ID. You may also paste the complete `https://res.cloudinary.com/...` delivery URL.
4. Do not paste only the asset version, such as `v1234567890`; a version is not a Public ID and produces a `404`.
5. Add the same `NEXT_PUBLIC_...` variables in Netlify under **Site configuration** → **Environment variables**, then redeploy.

Images use automatic format and quality optimization. Videos use Cloudinary's automatic format and codec delivery. The app temporarily falls back to the old local paths for any ID that is still empty, so setup can be completed incrementally.

## 🖼 Images You Need to Add

### Avatar (hero center, cycling)
Place **3–4 PNG images** of yourself in `public/images/avatar/`:
- `avatar-1.png` through `avatar-4.png`
- Recommended: **square crop**, 300×300px minimum, transparent or solid background
- They cross-fade every 2.2 seconds

### Orbit ring images
Place **9 images** in `public/images/orbit/`:
- `orbit-1.jpg` through `orbit-9.jpg`
- Recommended: **square**, 120×120px, rounded feel (the site clips them with rounded-2xl)
- Use screenshots of your apps, skills logos, or any visual that represents you

### Project covers
Place cover images in `public/images/projects/`:
- `tkstream-cover.jpg`  a screenshot or mockup of TkStream
- `glamgo-cover.jpg`  a screenshot or mockup of GlamGo
- Recommended: **16:9 aspect ratio**, 1200×675px minimum

### CV / Resume
Place your PDF resume at:
```
public/Faizan_Ali_CV.pdf
```

---

## 🚀 Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Start dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
```
This generates a static `out/` folder ready for Netlify.

---

## 🌐 Deploy to Netlify

### Option A  Netlify UI (easiest)
1. Push the project to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Pick your repo
4. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `out`
5. Click **Deploy site**  done!

### Option B  Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## ✏️ Customizing Content

### Add a new project
Open `src/data/projects.ts` and add an entry to the `projects` array:

```ts
{
  id: 'my-new-project',      // used in the URL: /projects/my-new-project
  title: 'My App',
  tagline: 'Short punchy one-liner',
  tags: ['Flutter', 'Firebase'],
  type: 'Solo',
  description: 'Card subtitle  one sentence',
  longDescription: `Full paragraph for the case study page...`,
  techStack: [
    { name: 'Flutter', usage: 'UI framework' },
  ],
  features: ['Feature one', 'Feature two'],
  coverImage: '/images/projects/my-new-project-cover.jpg',
  year: '2025',
  level: 'Intermediate',
}
```

Then add the cover image and it's live.

### Change orbit labels
In `src/data/media.ts`, edit the `orbitImages` labels. Cloudinary Public IDs belong in `.env.local`, not in the component.

### Update your bio / skills
Edit `src/components/AboutSection.tsx`  the `skills` array and `certifications` array are at the top of the file.

### Update links
- Email, LinkedIn, GitHub: `src/components/Navbar.tsx` and `src/components/Footer.tsx`
- Resume link: `src/components/Navbar.tsx`  href on the Resume button

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| `cream` | `#F0EDEA` | Page background |
| `charcoal` | `#1A1A1A` | Primary text & accents |
| `muted` | `#888888` | Secondary text, tags |
| `tag-bg` | `#E2DFDB` | Pill tag background |
| `font-display` | Playfair Display | Headings |
| `font-sans` | Inter | Body text |
| `font-mono` | JetBrains Mono | Tags, labels, code |

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | 14.2.5 | Framework |
| react | 18 | UI |
| tailwindcss | 3.4.1 | Styling |
| framer-motion | 11 | Animations (optional, ready to use) |
| lucide-react | 0.383.0 | Icons |

---

Built by Faizan Ali · [faizan909552@gmail.com](mailto:faizan909552@gmail.com)
