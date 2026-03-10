# davorminchorov.com

Personal portfolio and blog built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [MDX](https://mdxjs.com).

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Hero.astro
│   ├── FeaturedProject.astro
│   ├── ProjectCard.astro
│   ├── Expertise.astro
│   └── Writing.astro
├── content/
│   └── writing/        # Blog posts (Markdown / MDX)
│       └── example-post.md
├── layouts/
│   ├── BaseLayout.astro     # Site shell (nav, footer, meta)
│   └── WritingLayout.astro  # Article page layout with prose styles
├── pages/
│   ├── index.astro          # Homepage
│   └── writing/
│       └── [slug].astro     # Dynamic blog post routes
└── styles/
    └── global.css           # Tailwind directives + custom utilities
```

## Writing Blog Posts

Create a `.md` or `.mdx` file in `src/content/writing/`:

```markdown
---
title: "Your Post Title"
description: "A short description for SEO and social sharing."
date: "2025-04-15"
tags: ["architecture", "laravel"]
draft: false
---

Your article content here. Supports full Markdown and code blocks.
```

- Posts with `draft: true` are excluded from the production build.
- Posts automatically appear on the homepage (latest 5) and get their own URL at `/writing/your-post-slug`.

## Design System

The site uses a professional light-mode palette defined in `tailwind.config.mjs`:

- **Background**: Warm off-white (#FAFAF9)
- **Accent**: Deep forest green (#1A5C3A)
- **Typography**: Source Serif 4 (display), Instrument Sans (body), IBM Plex Mono (code/labels)

## Deployment (Cloudflare Pages)

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub repo
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `20` (set in Environment Variables as `NODE_VERSION=20`)
5. Add custom domain: `davorminchorov.com`

Every push to `main` will auto-deploy. Preview deployments are created for pull requests.

### Alternative: Vercel

1. Import repo at [vercel.com/new](https://vercel.com/new)
2. Framework preset: Astro (auto-detected)
3. Deploy — it handles everything automatically
4. Add custom domain in project settings

## Customization

- **Colors/fonts**: Edit `tailwind.config.mjs`
- **Content**: Edit components in `src/components/`
- **Meta/SEO**: Edit defaults in `src/layouts/BaseLayout.astro`
- **Projects**: Edit project cards directly in `src/pages/index.astro`
