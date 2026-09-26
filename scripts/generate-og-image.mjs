// Generates public/og-image.jpg, the image shown when the site is shared on
// LinkedIn, X, Slack, and similar. Run it whenever the positioning line
// changes: `node scripts/generate-og-image.mjs`.
//
// The card is an HTML page rendered by headless Chromium (the same Playwright
// build that renders the CV PDF). Chromium reads the site's WOFF2 fonts
// directly; the previous SVG render through sharp could not, and fell back to
// system fonts. The photo and fonts come from the repo itself, so the image
// can be regenerated from a fresh clone.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;

// Keep these in sync with `hero` and `services` in src/lib/site-content.ts.
const ROLE = 'PHP Consultant & Product Engineer';
const HEADLINE = 'I help product teams build and modernise PHP products that have to keep working for years.';
const OFFERS = ['Build', 'Modernise', 'Lead'];

const dataUri = (file, type) =>
  `data:${type};base64,${fs.readFileSync(path.join(root, file)).toString('base64')}`;

const fonts = {
  serif: dataUri('node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2', 'font/woff2'),
  sans: dataUri('node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2', 'font/woff2'),
  mono: dataUri('node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2', 'font/woff2'),
};
const photo = dataUri('src/assets/davor-minchorov.webp', 'image/webp');

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Colours and type follow the homepage (src/components/HomePage.astro).
const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
  @font-face { font-family: 'OG Serif'; src: url(${fonts.serif}) format('woff2'); font-weight: 200 900; }
  @font-face { font-family: 'OG Sans'; src: url(${fonts.sans}) format('woff2'); font-weight: 400 700; }
  @font-face { font-family: 'OG Mono'; src: url(${fonts.mono}) format('woff2'); font-weight: 500; }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: ${WIDTH}px; height: ${HEIGHT}px; background: #FFFFFF; color: #101828; font-family: 'OG Sans', sans-serif; -webkit-font-smoothing: antialiased; }

  .frame { position: absolute; inset: 48px; display: grid; grid-template-columns: 1fr 300px; grid-template-rows: 1fr auto; gap: 1px; background: #E3E6EC; border: 1px solid #E3E6EC; }
  .cell { background: #FFFFFF; }
  .main { padding: 44px 48px 40px; display: flex; flex-direction: column; }
  .marker { font-family: 'OG Mono', monospace; font-size: 15px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #1E4FD1; }
  h1 { font-family: 'OG Serif', serif; font-size: 50px; line-height: 1.14; font-weight: 600; letter-spacing: -0.01em; margin-top: 22px; }
  .offers { margin-top: auto; display: flex; gap: 28px; font-size: 21px; font-weight: 600; }
  .offers span + span::before { content: '·'; color: #5B6472; margin-right: 28px; font-weight: 400; }
  .photo { background: #F7F8FA; }
  .photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
  .bar { grid-column: 1 / -1; background: #F7F8FA; padding: 22px 48px 22px 44px; display: flex; align-items: baseline; justify-content: space-between; border-left: 4px solid #1E4FD1; }
  .name { font-size: 24px; font-weight: 700; }
  .url { font-family: 'OG Mono', monospace; font-size: 17px; font-weight: 500; letter-spacing: 0.04em; color: #5B6472; }
</style>
</head>
<body>
  <div class="frame">
    <div class="cell main">
      <p class="marker">${escape(ROLE)}</p>
      <h1>${escape(HEADLINE)}</h1>
      <p class="offers">${OFFERS.map((offer) => `<span>${escape(offer)}</span>`).join('')}</p>
    </div>
    <div class="cell photo"><img src="${photo}" alt="" /></div>
    <div class="bar">
      <span class="name">Davor Minchorov</span>
      <span class="url">davorminchorov.com</span>
    </div>
  </div>
</body>
</html>`;

const out = path.join(root, 'public/og-image.jpg');
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, type: 'jpeg', quality: 85 });
} finally {
  await browser.close();
}

const { size } = fs.statSync(out);
console.log(`OG image generated: ${out} (${(size / 1024).toFixed(1)} KB)`);
