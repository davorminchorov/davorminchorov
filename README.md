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
├── components/
│   ├── HomePage.astro       # The whole homepage: summary panel, sections, own nav and footer
│   ├── SiteNav.astro        # Nav for the other pages (404, 500)
│   └── SiteFooter.astro     # Footer for the other pages (404, 500)
├── lib/
│   ├── site-content.ts # Homepage copy: hero, stats, services, section text, contact links
│   ├── codyssey.ts     # Codyssey writing, fetched at build time
│   └── career.ts       # Date formatting, years of experience, skill group order
├── content/
│   ├── experience.json # Work history (Experience section)
│   ├── projects.json   # Case studies (Selected Work section)
│   ├── skills.json     # Skills section
│   └── talks.json      # Talks in the Talks & Writing section
├── layouts/
│   └── BaseLayout.astro     # Site shell (meta; nav and footer except on the homepage)
├── pages/
│   ├── index.astro          # Homepage
│   ├── cv.astro             # Print-first CV, rendered to the downloadable PDF
│   ├── 404.astro
│   └── 500.astro
└── styles/
    └── global.css           # Tailwind directives + custom utilities
```

Articles live on [Codyssey.dev](https://codyssey.dev) and are pulled into the Talks & Writing section at build time. There is no local blog.

## CV PDF

`/cv` is a print-first page built from the same JSON content as the homepage (experience, skills, talks). `pnpm build` runs `astro build` and then `scripts/generate-cv-pdf.mjs`, which opens the built page in headless Chromium and writes `dist/davor-minchorov-cv.pdf`. The "Download CV" links in the hero and contact sections point to that file, and the deploy workflow rebuilds it daily, so the PDF is always in step with the site.

The script needs the Playwright Chromium build:

```bash
pnpm exec playwright install chromium
# or point it at an existing Chrome/Chromium binary
CV_PDF_CHROMIUM_PATH=/path/to/chrome pnpm build
```

The PDF only exists after a build, so `/davor-minchorov-cv.pdf` returns 404 under `pnpm dev`. Use `pnpm build && pnpm preview` to check it.

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

`.github/workflows/deploy.yml` builds the site and deploys it with Wrangler on every push to `main`, and once a day on a schedule so newly published Codyssey content shows up without a push. Pull requests run the same build (including the CV PDF step) without deploying. It needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. Routes and the custom domain are set in `wrangler.toml`.

## Customization

- **Colors/fonts**: Edit `tailwind.config.mjs`
- **Homepage copy**: Edit `src/lib/site-content.ts`
- **Homepage layout**: Edit `src/components/HomePage.astro`
- **Meta/SEO**: Edit defaults in `src/layouts/BaseLayout.astro`
- **Case studies, experience, skills, talks**: Edit the JSON files in `src/content/`
- **CV**: Same JSON files, plus the summary and contact lines in `src/pages/cv.astro`
