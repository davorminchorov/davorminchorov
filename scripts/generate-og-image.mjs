// Generates public/og-image.jpg, the image shown when the site is shared on
// LinkedIn, X, Slack, and similar. Run it whenever the positioning line
// changes: `node scripts/generate-og-image.mjs`.
//
// The photo and fonts come from the repo itself (src/assets and the
// @fontsource packages), so the image can be regenerated from a fresh clone.

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Register the site fonts with fontconfig before sharp (libvips) loads, so
// the SVG text below renders in the same typefaces as the page.
const fontFiles = [
  'node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2',
  'node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2',
  'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2',
];
const fontDir = fs.mkdtempSync(path.join(os.tmpdir(), 'og-fonts-'));
for (const file of fontFiles) {
  fs.copyFileSync(path.join(root, file), path.join(fontDir, path.basename(file)));
}
const fontsConf = path.join(fontDir, 'fonts.conf');
fs.writeFileSync(
  fontsConf,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontDir}</dir>
  <include ignore_missing="yes">/etc/fonts/fonts.conf</include>
</fontconfig>
`,
);
process.env.FONTCONFIG_FILE = fontsConf;

const { default: sharp } = await import('sharp');

const WIDTH = 1200;
const HEIGHT = 630;

// Site colors (see tailwind.config.mjs)
const BG = '#FAFAF9';
const TEXT = '#1A1A1A';
const TEXT_MUTED = '#5F5F5F';
const ACCENT = '#1A5C3A';

const SERIF = "'Source Serif 4', 'Bitstream Charter', Georgia, serif";
const SANS = "'Instrument Sans', 'Liberation Sans', 'Helvetica Neue', sans-serif";
const MONO = "'IBM Plex Mono', 'Liberation Mono', 'Courier New', monospace";

// Keep these in sync with `hero` in src/lib/site-content.ts.
const ROLE = 'PHP Consultant & Product Engineer';
const HEADLINE = ['I help product teams build and', 'modernise PHP products that', 'have to keep working for years.'];
const SUBLINE = ['Build, modernise, and lead: new products,', 'partner APIs, codebase reviews, tech leadership.'];

// Baseline of the last headline line; the rule and subline sit below it.
const HEADLINE_END = 212 + (HEADLINE.length - 1) * 50;

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

async function generate() {
  const photoSize = 300;
  const photo = await sharp(path.join(root, 'src/assets/davor-minchorov.webp'))
    .resize(photoSize, photoSize, { fit: 'cover', position: 'top' })
    .composite([
      {
        input: Buffer.from(`<svg width="${photoSize}" height="${photoSize}">
        <rect width="${photoSize}" height="${photoSize}" rx="16" ry="16" fill="white"/>
      </svg>`),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const svg = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${WIDTH}" height="4" fill="${ACCENT}"/>

    <text x="80" y="150" font-family="${MONO}" font-size="16" font-weight="500" fill="${ACCENT}" letter-spacing="2">
      ${escape(ROLE.toUpperCase())}
    </text>

    ${HEADLINE.map(
      (line, i) => `<text x="80" y="${212 + i * 50}" font-family="${SERIF}" font-size="40" font-weight="700" fill="${TEXT}" letter-spacing="-1">
      ${escape(line)}
    </text>`,
    ).join('\n')}

    <rect x="80" y="${HEADLINE_END + 43}" width="60" height="3" rx="1.5" fill="${ACCENT}"/>

    ${SUBLINE.map(
      (line, i) => `<text x="80" y="${HEADLINE_END + 96 + i * 30}" font-family="${SANS}" font-size="21" fill="${TEXT_MUTED}">
      ${escape(line)}
    </text>`,
    ).join('\n')}

    <text x="80" y="505" font-family="${SERIF}" font-size="26" font-weight="700" fill="${TEXT}">
      Davor Minchorov
    </text>
    <text x="80" y="540" font-family="${MONO}" font-size="16" font-weight="500" fill="${ACCENT}" letter-spacing="0.5">
      davorminchorov.com
    </text>

    <rect x="0" y="${HEIGHT - 4}" width="${WIDTH}" height="4" fill="${ACCENT}"/>
  </svg>`;

  const out = path.join(root, 'public/og-image.jpg');
  await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 4, background: BG },
  })
    .composite([
      { input: Buffer.from(svg), top: 0, left: 0 },
      { input: photo, top: Math.round((HEIGHT - photoSize) / 2), left: WIDTH - photoSize - 80 },
    ])
    .jpeg({ quality: 85 })
    .toFile(out);

  const { size } = fs.statSync(out);
  console.log(`OG image generated: ${out} (${(size / 1024).toFixed(1)} KB)`);
  fs.rmSync(fontDir, { recursive: true, force: true });
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
