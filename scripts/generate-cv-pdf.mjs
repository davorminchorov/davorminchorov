// Renders the built /cv page to dist/davor-minchorov-cv.pdf with headless
// Chromium. It runs as part of `pnpm build` (see package.json), after
// `astro build`, so the PDF is always generated from the same content JSON
// as the site and deploys with everything else in dist/.
//
// Requirements: the Playwright Chromium build (`pnpm exec playwright install
// chromium`), or a Chromium/Chrome binary named in CV_PDF_CHROMIUM_PATH.

import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const CV_PATH = '/cv/';
const OUTPUT = path.join(dist, 'davor-minchorov-cv.pdf');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Fonts and stylesheets are referenced by absolute URLs (/_astro/...), which
// a file:// page cannot resolve, so serve dist/ over a throwaway local server.
const serveDist = () =>
  new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let file = path.normalize(path.join(dist, pathname));
      if (!file.startsWith(dist)) {
        res.writeHead(403).end();
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        file = path.join(file, 'index.html');
      }
      if (!fs.existsSync(file)) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { 'Content-Type': CONTENT_TYPES[path.extname(file)] ?? 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });

async function generate() {
  if (!fs.existsSync(path.join(dist, CV_PATH, 'index.html'))) {
    throw new Error(`dist${CV_PATH}index.html not found. Run \`astro build\` first.`);
  }

  const server = await serveDist();
  const { port } = server.address();
  const browser = await chromium.launch({
    executablePath: process.env.CV_PDF_CHROMIUM_PATH || undefined,
  });

  try {
    const page = await browser.newPage();
    // Plausible is not reachable (and not wanted) here; block it so the page
    // does not wait on it and the build does not count as a visit.
    await page.route(/plausible\.io/, (route) => route.abort());
    await page.goto(`http://127.0.0.1:${port}${CV_PATH}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: OUTPUT,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '14mm', right: '15mm', bottom: '16mm', left: '15mm' },
    });
  } finally {
    await browser.close();
    server.close();
  }

  const { size } = fs.statSync(OUTPUT);
  console.log(`CV PDF generated: ${OUTPUT} (${(size / 1024).toFixed(1)} KB)`);
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
