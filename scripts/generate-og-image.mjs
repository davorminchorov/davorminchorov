import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;

// Site colors
const BG = '#FAFAF9';
const TEXT = '#1A1A1A';
const TEXT_MUTED = '#7A7A7A';
const ACCENT = '#1A5C3A';
const BORDER = '#E8E4DD';

async function generate() {
  // Load and resize the profile photo to fit nicely on the right side
  const photoSize = 320;
  const photo = await sharp(path.join(root, 'originals-backup/davor-minchorov-original.jpg'))
    .resize(photoSize, photoSize, { fit: 'cover', position: 'top' })
    .composite([{
      input: Buffer.from(`<svg width="${photoSize}" height="${photoSize}">
        <rect width="${photoSize}" height="${photoSize}" rx="16" ry="16" fill="white"/>
      </svg>`),
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  // Create the SVG overlay with text
  const svg = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <!-- Subtle accent bar at top -->
    <rect x="0" y="0" width="${WIDTH}" height="4" fill="${ACCENT}"/>

    <!-- Left side text content -->
    <text x="80" y="220" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="700" fill="${TEXT}" letter-spacing="-1">
      Davor Minchorov
    </text>
    <text x="80" y="275" font-family="-apple-system, 'Helvetica Neue', sans-serif" font-size="26" fill="${TEXT_MUTED}" font-weight="400">
      Software Engineer
    </text>

    <!-- Separator line -->
    <rect x="80" y="305" width="60" height="3" rx="1.5" fill="${ACCENT}"/>

    <!-- Description -->
    <text x="80" y="360" font-family="-apple-system, 'Helvetica Neue', sans-serif" font-size="19" fill="${TEXT_MUTED}" font-weight="400">
      Partnering with startups and enterprises to
    </text>
    <text x="80" y="388" font-family="-apple-system, 'Helvetica Neue', sans-serif" font-size="19" fill="${TEXT_MUTED}" font-weight="400">
      design and build custom software solutions.
    </text>

    <!-- URL -->
    <text x="80" y="540" font-family="'Courier New', monospace" font-size="16" fill="${ACCENT}" font-weight="600" letter-spacing="0.5">
      davorminchorov.com
    </text>

    <!-- Subtle border bottom -->
    <rect x="0" y="${HEIGHT - 4}" width="${WIDTH}" height="4" fill="${ACCENT}"/>
  </svg>`;

  // Create the base image and composite everything
  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: BG,
    }
  })
    .composite([
      // SVG text overlay
      { input: Buffer.from(svg), top: 0, left: 0 },
      // Profile photo on the right
      { input: photo, top: Math.round((HEIGHT - photoSize) / 2), left: WIDTH - photoSize - 100 },
    ])
    .jpeg({ quality: 85 })
    .toFile(path.join(root, 'public/og-image.jpg'));

  console.log('OG image generated successfully!');

  // Check file size
  const { size } = await import('fs').then(fs =>
    fs.promises.stat(path.join(root, 'public/og-image.jpg'))
  );
  console.log(`File size: ${(size / 1024).toFixed(1)} KB`);
}

generate().catch(console.error);
