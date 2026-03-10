/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FAFAF9',
          warm: '#F5F3EF',
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E8E4DD',
          hover: '#D4CFC6',
        },
        text: {
          DEFAULT: '#1A1A1A',
          secondary: '#4A4A4A',
          muted: '#7A7A7A',
          dim: '#A3A3A3',
        },
        accent: {
          DEFAULT: '#1A5C3A',
          light: '#EDF5F0',
        },
        tag: {
          warm: '#F8F0E3',
          'warm-text': '#8B6914',
          blue: '#E8F0FA',
          'blue-text': '#2A5A8C',
          purple: '#F0ECF8',
          'purple-text': '#5B3E96',
        },
      },
      fontFamily: {
        display: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
        body: ['"Instrument Sans Variable"', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.04)',
        md: '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
