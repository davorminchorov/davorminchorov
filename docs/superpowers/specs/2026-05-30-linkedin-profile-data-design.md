# LinkedIn profile data on davorminchorov.com

**Date:** 2026-05-30
**Status:** Approved (design)
**Project:** davorminchorov.com (Astro 5 + Tailwind + MDX, deployed to Cloudflare Workers)

## Problem

Surface my own LinkedIn profile data (work experience + skills) on my personal
portfolio site, keeping it current with acceptable manual effort.

## Constraint that shapes everything

LinkedIn's official API is effectively closed for profile data. "Sign In with
LinkedIn" (OpenID Connect) returns only name, email, and avatar — not work
history or skills. Full profile access requires being an approved LinkedIn
partner (Talent / Marketing / Compliance programs), which is not attainable for
a personal site. Third-party data APIs (People Data Labs, Apollo, RapidAPI
scrapers) are paid and sit in LinkedIn's ToS gray area. Self-scraping violates
ToS and is brittle.

**Chosen approach:** ToS-safe, manual-refresh. The source of truth is
LinkedIn's official **"Get a copy of your data"** export (Settings → Data
Privacy → Get a copy of your data). That export is a ZIP of CSVs; we use
`Positions.csv` (work history) and `Skills.csv` (skill names). No API, no keys,
no scraping, no recurring cost. The data is re-imported when my career changes
(infrequent).

## Data flow

```
LinkedIn export ZIP ──> scripts/linkedin-to-content.mjs ──> src/content/experience.json
  (Positions.csv,                (parse + transform)         src/content/skills.json
   Skills.csv)                                                      │
                                                                    ▼
                                          Astro content collections (zod-validated at build)
                                                                    │
                                          ┌─────────────────────────┴───────────┐
                                          ▼                                       ▼
                                   Experience.astro                         Skills.astro
                                          └──────────── index.astro ────────────┘
```

## Components

Four units, each with one clear responsibility.

### 1. Content collections — `src/content/config.ts`

Add two collections alongside the existing `writing` collection. Use the Astro 5
`file()` loader (one JSON file per collection) so the import script writes a
single file each and the data is easy to eyeball in git diffs.

- **`experience`** — array of objects:
  - `company` (string, required)
  - `title` (string, required)
  - `location` (string, optional) — where I worked (e.g. "Remote", "Skopje, Macedonia")
  - `companyUrl` (string URL, optional)
  - `startDate` (string, `YYYY-MM` or `YYYY-MM-DD`, required)
  - `endDate` (string or null; `null` = current role)
  - `industry` (string, required) — the domain/industry of the product (e.g. "iGaming", "Nonprofit SaaS platform")
  - `clientLocation` (string, optional) — where the client was based; omitted when the source did not state it or it was my own product
  - `outcomes` (array of strings, required) — achievement/outcome bullets
  - `skills` (array of strings, optional, may be empty) — technologies used, named in the source
  - Validated with zod. Source file: `src/content/experience.json`.
  - Note: the role description is now structured (`industry` + `clientLocation` + `outcomes` + `skills`) rather than a single prose `description` string.

- **`skills`** — array of groups:
  - `category` (string, required) e.g. "Languages", "Frameworks", "Infrastructure"
  - `items` (array of strings, required)
  - Validated with zod. Source file: `src/content/skills.json`.

The existing `writing` collection (legacy `type: 'content'`) stays as-is; the new
collections use the loader API. Mixing legacy and loader collections in one
config file is supported in Astro 5.

### 2. Import script — `scripts/linkedin-to-content.mjs`

Plain ESM Node script, same style as the existing `scripts/generate-og-image.mjs`.

- Takes the path to the unzipped LinkedIn export folder as a CLI argument.
- Parses `Positions.csv` → writes `src/content/experience.json`, sorted by
  `startDate` descending. LinkedIn columns map: `Company Name` → `company`,
  `Title` → `title`, `Location` → `location`, `Started On` → `startDate`,
  `Finished On` → `endDate` (empty → `null`).
- The structured fields `industry`, `clientLocation`, `outcomes`, and `skills`
  are **derived from the free-text `Description` column manually** (the same way
  the initial data was authored from the PDF). The script cannot reliably split
  a prose description into industry/client/outcomes/skills, so it writes the raw
  `Description` into a temporary `_rawDescription` field for a human to rework.
  This manual rework is expected, not a defect.
- Parses `Skills.csv` → writes `src/content/skills.json`. **LinkedIn's skills
  export is a flat list with no categories.** The script drops every skill into a
  single `{ category: "Uncategorized", items: [...] }` group. Categorizing them
  into meaningful groups is a deliberate manual step done after import — the
  script does not guess categories. This manual step is expected, not a defect.
- CSV parsing: a small dependency-free parser is acceptable, or add a tiny CSV
  package as a devDependency. Implementer's choice; prefer no new runtime dep.

### 3. `Experience.astro`

- Reads the `experience` collection via `getCollection('experience')`.
- Sorts by `startDate` descending.
- Renders a timeline/list using the site's existing section conventions:
  `section-label`, `section-title`, `section-desc`, `animate delay-N`,
  `border-t border-border`, `max-w-[1080px] mx-auto px-7`.
- Renders "Present" when `endDate` is `null`.
- `companyUrl`, `location`, `description` render only when present.
- `id="experience"` on the section.

### 4. `Skills.astro`

- Reads the `skills` collection.
- Renders grouped pill lists (group heading + pills) using the same section
  conventions.
- `id="skills"` on the section.
- **Overlap note:** the existing `Expertise` section covers capability *themes*
  (System Design, Mentoring, …). Skills are concrete *tools/technologies*. Keep
  the two visually distinct so the page does not read as duplication.

## Placement

`src/pages/index.astro` order:

```
Hero → About → Expertise → Experience → Skills → Projects → Testimonials → Writing
```

## JSON-LD enrichment (included)

The homepage already embeds a `Person` / `ProfilePage` JSON-LD block. Enrich it
using the new data:

- `worksFor` / `hasOccupation` from the current (null-`endDate`) experience entry.
- `alumniOf` from past roles (or leave to experience only; education is out of
  scope).
- `knowsAbout` extended with the flattened `skills` items.

This is a small SEO improvement since the structured data already exists. Keep it
data-driven from the collections so it stays in sync.

## Testing / verification

The site has no test harness and this change does not warrant introducing one.
Verification is:

1. `npm run build` succeeds — the zod schemas validate `experience.json` and
   `skills.json` at build time, so malformed data fails the build.
2. Visual check via `npm run dev` (http://localhost:4321) — Experience and Skills
   sections render correctly in homepage order.

## Out of scope (YAGNI)

- Live LinkedIn API / OAuth / "Sign in with LinkedIn".
- Automated/scheduled sync, third-party data APIs, scraping.
- Recommendations, education, and certifications import (not requested).
- A dedicated `/resume` page (homepage sections chosen instead).

## Decisions baked in (from brainstorming)

- Skills are **grouped** with **manual categorization** after import (not a flat
  list, not auto-categorized).
- JSON-LD enrichment is **included**.
