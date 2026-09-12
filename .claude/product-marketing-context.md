# Product Marketing Context

*Last updated: 2026-09-12*

This file describes the positioning the site currently uses. Copy on the site is the source of truth; when the two disagree, update this file, not the other way round.

## Product Overview
**One-liner:** Personal portfolio and professional brand website for Davor Minchorov, a product software engineer working in PHP.
**What it does:** Presents client work as anonymised case studies (industry, country, problem, why it mattered, what was done, result), explains how Davor works, and gives prospective clients a direct way to get in touch. Also points visitors to Codyssey.dev, the developer education platform Davor founded.
**Product category:** Professional portfolio / personal brand site
**Product type:** Static website (Astro + Tailwind CSS, deployed to Cloudflare Workers with Wrangler)
**Business model:** Lead generation for contract software engineering work (long-term contracts and focused projects); secondary promotion of Codyssey.dev

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
| "Is one person enough for our project?" | Led a team of 3 developers and 2 QA engineers on the fintech engagement; can work alone or inside an existing team |
| "Will the code be maintainable after the engagement?" | Tests are the first thing added when missing; the iGaming packages and the community platform's component library were built to be reused after he left |

**Anti-persona:** Companies looking for the cheapest hourly rate; teams that need a task-executor rather than a thinking partner; projects with no clear goal or stakeholder buy-in

## Customer Language
**How they describe the problem:**
- "We need someone senior who can hit the ground running"
- "Our codebase is a mess and we need someone to untangle it"
- "We need an engineer who thinks about the product, not just features"
**How they describe us (quotes used on the site):**
- "One of the most engaged and forward-thinking engineers on the team"
- "He didn't just deliver features. He actively shaped the direction of the product."
- "Consistently delivers high-impact features that drive real customer and business impact"
- "Reliable execution on high-impact projects makes him essential to our team's success"
**Words to use:** product, ship, build, design, modernise, refactor, tests, outcome, stakeholders, plain first person ("I ask why before I ask how")
**Words to avoid:** cheap, freelancer (use "contractor" or just "I"), hack, quick fix, offshore, rescue (the site says "modernising existing codebases"), em dashes
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
- 6+ industries, 6 client countries (US, Canada, Switzerland, Italy, Montenegro, UAE)
- Non-profit engagement: GitHub Actions builds cut from 30 to 60 minutes to under 10
- Fintech engagement: led a team of 3 developers and 2 QA engineers under regulatory requirements
**Customers:** Non-profit SaaS, iGaming, healthcare, community platforms, entertainment enterprises, fintech
**Testimonials:** Shown on the case study cards, not in a separate section
> "Davor consistently proved to be one of the most engaged and forward-thinking engineers on the team. He didn't just deliver features. He actively shaped the direction of the product." (Bartosz P., Staff Backend Engineer, iGaming)

> "Davor consistently delivers high-impact features that drive real customer and business impact. He's built foundational capabilities that transformed how our customers manage donor relationships and organizational data." (Kevin R., Product Manager, non-profit)

## Goals
**Business goal:** Attract contract engineering work (long-term contracts and focused projects) and send engineers to Codyssey.dev
**Conversion action:** The "Send me an email" button in the Contact section (mailto), with Upwork, Toptal, LinkedIn, and GitHub as secondary links. The site promises a reply within a day.
**Current metrics:** Plausible Analytics is integrated; no data recorded here
