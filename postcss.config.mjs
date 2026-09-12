// Tailwind 3 is wired through PostCSS directly. The @astrojs/tailwind
// integration was deprecated and does not support Astro 6; this is the
// same PostCSS setup it used to register (see src/styles/global.css for
// the @tailwind directives).
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
