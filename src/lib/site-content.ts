// The homepage copy (src/components/HomePage.astro). Case studies, experience,
// skills and talks stay in src/content/*.json.

import { yearsOfExperience } from './career';

export const EMAIL = 'davorminchorov@gmail.com';
export const CV_PDF = '/davor-minchorov-cv.pdf';
export const CODYSSEY_URL = 'https://codyssey.dev';
export const CODYSSEY_PROFILE_URL = 'https://codyssey.dev/author-profile/davor-minchorov';

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
  eyebrow: 'Product Software Engineer · PHP',
  headline: 'I build PHP products that have to keep working for years.',
  intro:
    'I work with founders and product teams on APIs, architecture, and modernising existing codebases. I care about what the software is for, not just whether it compiles.',
  // Rendered as: before + link(Codyssey.dev) + after
  codyssey: { before: 'I also run ', linkText: 'Codyssey.dev', after: ', where I teach engineers to build maintainable software.' },
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
    "I'm Davor, a product software engineer from Macedonia. I've been building software professionally since 2015, from small startups to Fortune 500 companies, across healthcare, fintech, iGaming, entertainment, and non-profit. I have worked in English through Toptal and Adeva with clients in the US, Canada, Switzerland, Italy, Montenegro, and the UAE.",
    'I work with founders, CTOs, and product teams who have a PHP application in production and need it to keep growing without falling over. I ask what the business is trying to achieve before I write code, and I will tell you when a feature is not worth building. Sometimes the work is new APIs and architecture. Sometimes it is taking over an existing codebase and making it safe to change again.',
  ],
};

export const services = {
  label: 'Services',
  title: 'What I Do',
  desc: 'Product engineering for teams that need their PHP application to keep working as it grows.',
  items: [
    {
      num: '01',
      title: 'API and backend development',
      desc: 'REST and GraphQL APIs in PHP (Laravel, Symfony). Built for teams that need the backend to be reliable and easy to extend.',
    },
    {
      num: '02',
      title: 'System architecture',
      desc: 'Designing the structure of an application so it holds up as the team and the requirements grow. Vertical slices, clear boundaries, domain-driven design where it earns its place.',
    },
    {
      num: '03',
      title: 'Refactoring and modernising existing PHP codebases',
      desc: 'Making an existing codebase safe to change again. Adding tests, refactoring in stages, and modernising while the app stays live and features keep shipping.',
    },
    {
      num: '04',
      title: 'Performance and integrations',
      desc: 'Search, caching, and database work on high-traffic systems. Third-party integrations including payments, blockchain, and Web3.',
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
    'I plan before I build and put the plan in writing.',
    'I write tests. If a codebase has none, that is the first thing I fix.',
    'I work directly with product owners and stakeholders, not through a ticket queue.',
    'I will tell you when a feature is not worth building, and suggest what to do instead.',
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
  desc: 'If you have a PHP application that needs new features, a better architecture, or a codebase that has become hard to change, send me a short note about what you are trying to achieve and where the software is getting in the way. I reply within a day.',
  availability: 'Available now for long-term contracts and focused projects.',
  primary: { label: 'Send me an email', href: `mailto:${EMAIL}` },
  links: [
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01284b0e7aa5b9f5a9' },
    { label: 'Toptal', href: 'https://www.toptal.com/developers/resume/davor-minchorov' },
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
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01284b0e7aa5b9f5a9' },
    { label: 'Toptal', href: 'https://www.toptal.com/developers/resume/davor-minchorov' },
  ],
};
