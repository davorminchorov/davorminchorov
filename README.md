# davorminchorov.com

Personal portfolio built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [MDX](https://mdxjs.com).

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
│   ├── Expertise.astro      # "Services" section
│   ├── HowIWork.astro
│   ├── Contact.astro
│   └── Writing.astro        # Talks (talks.json) + Codyssey writing, fetched at build time
├── content/
│   ├── experience.json # Work history (Experience section)
│   ├── projects.json   # Case studies (Selected Work section)
│   ├── skills.json     # Skills section
│   └── talks.json      # Talks in the Talks & Writing section
├── layouts/
│   └── BaseLayout.astro     # Site shell (nav, footer, meta)
├── pages/
│   ├── index.astro          # Homepage
│   ├── 404.astro
│   └── 500.astro
└── styles/
    └── global.css           # Tailwind directives + custom utilities
```

Articles live on [Codyssey.dev](https://codyssey.dev) and are pulled into the Talks & Writing section at build time. There is no local blog.

## Social Share Image

`public/og-image.jpg` is generated from `src/assets/davor-minchorov.webp` and the site fonts. Regenerate it whenever the positioning line changes:

```bash
node scripts/generate-og-image.mjs
```

## Design System

The site uses a professional light-mode palette defined in `tailwind.config.mjs`:

- **Background**: Warm off-white (#FAFAF9)
- **Accent**: Deep forest green (#1A5C3A)
- **Typography**: Source Serif 4 (display), Instrument Sans (body), IBM Plex Mono (code/labels)

## Deployment (Cloudflare Workers)

`.github/workflows/deploy.yml` builds the site and deploys it with Wrangler on every push to `main`, and once a day on a schedule so newly published Codyssey content shows up without a push. It needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. Routes and the custom domain are set in `wrangler.toml`.

## Customization

- **Colors/fonts**: Edit `tailwind.config.mjs`
- **Content**: Edit components in `src/components/`
- **Meta/SEO**: Edit defaults in `src/layouts/BaseLayout.astro`
- **Case studies, experience, skills, talks**: Edit the JSON files in `src/content/`
