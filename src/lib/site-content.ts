// The homepage copy (src/components/HomePage.astro). Case studies, experience,
// skills and talks stay in src/content/*.json.

import { yearsOfExperience } from './career';

export const EMAIL = 'davorminchorov@gmail.com';
export const CV_PDF = '/davor-minchorov-cv.pdf';
export const CODYSSEY_URL = 'https://codyssey.dev';
export const CODYSSEY_PROFILE_URL = 'https://codyssey.dev/author-profile/davor-minchorov';
// Cal.com booking page for intro calls. The button stays hidden while this is empty.
export const BOOKING_URL = '';

export const navLinks = [
  { label: 'About', section: 'about' },
  { label: 'Services', section: 'services' },
  { label: 'Work', section: 'projects' },
  { label: 'Experience', section: 'experience' },
  { label: 'Skills', section: 'skills' },
  { label: 'Talks & Writing', section: 'writing' },
  { label: 'Contact', section: 'contact' },
];

export const hero = {
  eyebrow: 'PHP Consultant & Product Engineer',
  headline: 'I help product teams build and modernise PHP products that have to keep working for years.',
  intro:
    'I join teams as a senior engineer or tech lead, review and modernise existing codebases, and build new products and partner APIs. I care about what the software is for, not just whether it compiles.',
  // Rendered as: before + link(Codyssey.dev) + after
  codyssey: {
    before: 'I also run ',
    linkText: 'Codyssey.dev',
    after: ', where I teach engineers to build maintainable software. I bring the same practices to the teams I work with.',
  },
  ctas: {
    primary: { label: 'Work with me', section: 'contact' },
    secondary: { label: 'See my work', section: 'projects' },
    cv: { label: 'Download CV', href: CV_PDF },
  },
};

export const stats = [
  { value: `${yearsOfExperience()}+`, label: 'Years Experience' },
  { value: '10+', label: 'Industries' },
  { value: '6', label: 'Client Countries' },
];

export const about = {
  label: 'About',
  title: 'Who I Am',
  paragraphs: [
    "I'm Davor, a PHP consultant and product engineer from Macedonia. I've been building software professionally since 2015, from small startups to Fortune 500 companies, across healthcare, fintech, iGaming, entertainment, logistics, and non-profit. I have worked in English with clients in the US, Canada, Switzerland, Italy, Montenegro, and the UAE.",
    'I work with founders, CTOs, and product teams who have a PHP application in production and need it to keep growing without falling over. I ask what the business is trying to achieve before I write code, and I will tell you when a feature is not worth building. Some of the work is hands-on: new products, partner APIs, and making an existing codebase safe to change again. Some of it is about the team: leading the work, reviewing code, and agreeing on the practices that keep the product maintainable.',
  ],
};

export const services = {
  label: 'Services',
  title: 'What I Do',
  desc: 'Three ways to work together. Every engagement starts with a call about what you are trying to achieve.',
  groups: [
    {
      num: '01',
      title: 'Build',
      desc: 'For products that need new capabilities built to last.',
      summary: 'New products, partner and integration APIs',
      items: [
        {
          title: 'New product, zero to production',
          desc: 'For founders building a first version that has to hold up after launch. I choose the stack, set up the structure, and ship it to production.',
        },
        {
          title: 'Partner and integration APIs',
          desc: 'Opening your product to partners and third-party services through REST or GraphQL APIs, with integrations kept in their own packages so the rest of the codebase stays clean.',
        },
      ],
    },
    {
      num: '02',
      title: 'Modernise',
      desc: 'For existing PHP codebases that have become hard to change.',
      summary: 'Codebase reviews, modernisation projects',
      items: [
        {
          title: 'Codebase and architecture review',
          desc: 'I read your code, tests, and delivery pipeline, then write up what is slowing the team down and a staged plan to fix it.',
        },
        {
          title: 'Modernisation project',
          desc: 'Adding tests, refactoring in stages, and speeding up CI while the app stays live and features keep shipping.',
        },
      ],
    },
    {
      num: '03',
      title: 'Lead',
      desc: 'For teams that need someone to lead the technical work, not just do it.',
      summary: 'Embedded or fractional tech lead, team enablement',
      items: [
        {
          title: 'Senior engineer or tech lead in your team',
          desc: 'A long-term contract where I join your team and your process, own features end to end, and review code.',
        },
        {
          title: 'Fractional tech lead',
          desc: 'Part-time technical leadership for founders without a CTO: architecture and stack decisions, planning the roadmap with you, and help hiring engineers.',
        },
        {
          title: 'Team enablement',
          desc: 'Code review practices, coding standards, testing and TDD, and architecture sessions, so the team keeps the product maintainable after I leave.',
        },
      ],
    },
  ],
};

export const work = {
  label: 'Selected Work',
  title: 'Case Studies',
  desc: 'Client names left out. Industry, country, and what changed are what matter.',
  featuredBadge: 'Own product · Founder',
  featuredLinkText: 'Visit Codyssey.dev',
  linkText: 'Visit site',
  // Labels for the parts of each case study, in display order.
  parts: { problem: 'Problem', why: 'Why it mattered', did: 'What I did', result: 'Result' },
};

export const howIWork = {
  label: 'How I Work',
  title: 'Working with me',
  points: [
    'I ask why before I ask how. If the goal is unclear, I say so before building.',
    'Every engagement starts with a call about what you are trying to achieve, then a written plan we agree on before I build.',
    'I write tests. If a codebase has none, that is the first thing I fix.',
    'I work directly with product owners and stakeholders, not through a ticket queue.',
    'I will tell you when a feature is not worth building, and suggest what to do instead.',
    'I plan the handover from the start, so your team can run what I built without me.',
    'Working hours are agreed with each client, around your team and its time zone.',
    'I have led teams and mentored engineers, so I can work alone or inside an existing team.',
  ],
};

export const experience = {
  label: 'Experience',
  title: "Where I've Worked",
  desc: 'Over a decade of building for startups and enterprises across many industries.',
  // Roles shown before the "Show all experience" button.
  visibleCount: 2,
  showAllLabel: (hidden: number) => `Show all experience (${hidden} more)`,
};

export const skills = {
  label: 'Skills',
  title: 'Tools & Technologies',
  desc: 'The tools I use most, and the ones I am comfortable working in.',
};

export const writing = {
  label: 'Talks & Writing',
  title: "What I've Shared",
  desc: 'A meetup talk and articles on building PHP applications that stay maintainable.',
  talksHeading: 'Talks',
  writingHeading: 'Writing',
  empty: 'New content coming soon. Stay tuned.',
  moreLinkText: 'More on Codyssey.dev',
};

export const contact = {
  label: 'Contact',
  title: 'Work with me',
  desc: 'If your PHP application needs new features or a better architecture, your codebase has become hard to change, or your team needs technical leadership, send me a short note about what you are trying to achieve and where the software is getting in the way. I reply within a day.',
  availability: 'Available now for long-term contracts and focused projects.',
  primary: { label: 'Send me an email', href: `mailto:${EMAIL}` },
  booking: { label: 'Book an intro call', href: BOOKING_URL },
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/davorminchorov' },
    { label: 'GitHub', href: 'https://github.com/davorminchorov' },
  ],
  cv: { label: 'Download CV (PDF)', href: CV_PDF },
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} Davor Minchorov. All rights reserved.`,
  links: [
    { label: 'X / Twitter', href: 'https://x.com/davorminchorov' },
    { label: 'Bluesky', href: 'https://bsky.app/profile/davorminchorov.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/davorminchorov' },
    { label: 'GitHub', href: 'https://github.com/davorminchorov' },
  ],
};
