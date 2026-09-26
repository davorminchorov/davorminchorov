# Product Marketing Context

*Last updated: 2026-09-26*

This file describes the positioning the site currently uses. Copy on the site is the source of truth; when the two disagree, update this file, not the other way round.

## Product Overview
**One-liner:** Personal portfolio and professional brand website for Davor Minchorov, a PHP consultant and product engineer.
**What it does:** Presents client work as anonymised case studies (industry, country, problem, why it mattered, what was done, result), explains how Davor works, and gives prospective clients a direct way to get in touch. Also points visitors to Codyssey.dev, the developer education platform Davor founded.
**Product category:** Professional portfolio / personal brand site
**Product type:** Static website (Astro + Tailwind CSS, deployed to Cloudflare Workers with Wrangler)
**Business model:** Lead generation for consulting and contract engineering work, offered in three groups: Build (new product zero to production, partner and integration APIs), Modernise (codebase and architecture review, modernisation project), Lead (senior engineer or tech lead in the client's team, fractional tech lead, team enablement). No prices, engagement lengths or invoicing details on the site. Secondary promotion of Codyssey.dev

## Target Audience
**Target companies:** Founders, growth-stage companies, and enterprises that have a PHP application in production and need it to keep growing
**Decision-makers:** Founders, CTOs, VPs of Engineering, product managers
**Primary use case:** Finding a senior engineer who thinks about what the product is for, not just whether the code compiles, and who can own APIs, architecture, and modernisation work
**Jobs to be done:**
- Check that Davor has shipped in a comparable industry and setting before reaching out
- See proof of outcomes, not just a list of technologies
- Understand how he works with product owners and stakeholders
**Use cases:**
- A team needs new features and APIs on an existing PHP product
- An application has grown past its original architecture and needs a structure that holds up
- An existing codebase has become hard to change and needs tests, refactoring, and modernising while it stays live

## Problems & Pain Points
**Core problem:** Teams struggle to find engineers who combine deep PHP skills with product judgement and can own work end to end without hand-holding.
**Why alternatives fall short:**
- Junior contractors need heavy oversight and produce fragile code
- Agencies rotate engineers and do not own the outcome
- Full-time hires take months to recruit and onboard
**What it costs them:** Delayed releases, technical debt, features that were not worth building, wasted engineering budget
**Emotional tension:** Fear of hiring the wrong person and losing months; anxiety about whether a contractor will care about the product

## Differentiation
**Key differentiators:**
- Consultant and engineer in one: leads and advises teams (led 3 devs and 2 QA on the fintech bank API, proposed coding standards the non-profit team partly adopted) and still ships the code
- Product judgement: asks why before how, and says when a feature is not worth building
- 10+ years across startups and Fortune 500 companies in six client countries
- Architecture-level thinking (vertical slices, clear boundaries, domain-driven design where it earns its place)
- Educator mindset: founder of Codyssey.dev, has led teams and mentored engineers
**How we do it differently:** Works directly with product owners and stakeholders, plans in writing, and ships with tests
**Why customers choose us:** Case studies show shipped outcomes, and client quotes speak to shaping product direction and business impact

## Objections
| Objection | Response |
|-----------|----------|
| "Can a contractor truly own complex work?" | Quotes on the case study cards: "actively shaped the direction of the product", "essential to our team's success" |
| "Is one person enough for our project?" | Led a team of 3 developers and 2 QA engineers on the fintech bank API; can work alone or inside an existing team |
| "Will the code be maintainable after the engagement?" | Tests are the first thing added when missing; handover is planned from the start; the iGaming packages and the community platform's component library were built for the team to reuse; the Routyx structure grew without a rewrite |

**Anti-persona:** Companies looking for the cheapest hourly rate; teams that need a task-executor rather than a thinking partner; projects with no clear goal or stakeholder buy-in

## Customer Language
**How they describe the problem:**
- "We need someone senior who can hit the ground running"
- "Our codebase is a mess and we need someone to untangle it"
- "We need an engineer who thinks about the product, not just features"
**How they describe us (quotes used on the site):**
- "He didn't just deliver features — he actively shaped the direction of the product."
- "Davor brought a steady stream of valuable ideas, from conceptual improvements to meaningful architectural suggestions."
- "contributes to the bigger picture"
- "Davor's reliable execution on high-impact projects makes him essential to our team's success"
**Words to use:** consultant, product engineer, build, modernise, lead, ship, design, refactor, tests, outcome, stakeholders, plain first person ("I ask why before I ask how")
**Words to avoid:** cheap, freelancer (use "contractor" or just "I"), hack, quick fix, offshore, rescue (the site says "modernising existing codebases"), em dashes (except inside verbatim quotes)
**Glossary:**
| Term | Meaning |
|------|---------|
| Codyssey.dev | Davor's educational platform that teaches engineers to build maintainable software |
| Case study | A card in Selected Work: industry and country instead of a client name, then problem, why it mattered, what I did, result |
| Modernising existing codebases | Adding tests, refactoring in stages, and updating an app while it stays live |

## Brand Voice
**Tone:** Plain, direct, first person. Formal enough for enterprise clients, warm enough to feel human.
**Style:** Short sentences. Facts over adjectives. Say what changed for the client, not what technology was used, unless the technology is the point.
**Personality:** Confident, thoughtful, experienced, honest about trade-offs

## Proof Points
**Metrics on the site:**
- Years of professional experience, computed at build time from June 2015 (11+ at the time of writing)
- 10+ industries, 6 client countries (US, Canada, Switzerland, Italy, Montenegro, UAE)
- Non-profit engagement: GitHub Actions builds cut from 30 to 60 minutes to under 10 with parallel test runs; faster merges and deploys, lower CI costs
- Non-profit engagement: primary backend developer for Workflows and Company Contacts, on a team of 5 to 10 engineers
- Fintech engagement: led 3 developers and 2 QA engineers on a REST API letting banks use the loan origination flow; on schedule at handover before launch
- Routyx: chose the stack and set up the structure for a logistics dispatch ERP and driver app API; both grew without a rewrite
**Customers:** Non-profit SaaS, fintech, community platforms, iGaming, logistics, entertainment enterprises (healthcare stays in Experience only)
**Testimonials:** Shown on the case study cards, not in a separate section
Quotes are verbatim, including the authors' em dashes and word choices. The client's product name is redacted as [the platform]. Sources: Kevin's is a company values award nomination (he agreed to publication); Bartosz's is a LinkedIn recommendation (he managed Davor directly).

> "He didn't just deliver features — he actively shaped the direction of the product." (Bartosz P., Staff Backend Engineer, iGaming)

> "As the primary backend developer for both Workflows and Company Contacts, he's built foundational capabilities that transformed how our customers manage donor relationships and organizational data." (Kevin R., Product Manager, non-profit)

## Goals
**Business goal:** Attract contract engineering work (long-term contracts and focused projects) and send engineers to Codyssey.dev
**Conversion action:** The "Send me an email" button in the Contact section (mailto), a "Book an intro call" Cal.com link (shown once `BOOKING_URL` is set in `site-content.ts`), and LinkedIn and GitHub as secondary links. Upwork and Toptal are not linked anywhere on the site. The site promises a reply within a day. A "Download CV" link in the hero and contact sections serves a PDF generated at build time from the same experience, skills, and talks data as the site (also viewable at /cv).
**Current metrics:** Plausible Analytics is integrated; no data recorded here
