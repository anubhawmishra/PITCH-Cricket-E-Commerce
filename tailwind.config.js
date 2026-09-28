import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#000000',
        carbonRaised: '#111111',
        willow: '#E60000',
        'willow-dim': 'rgba(230, 0, 0, 0.35)',
        seam: '#FF0000',
        pitch: '#0a0a0a',
        bone: '#FFFFFF',
        'bone-dim': 'rgba(255, 255, 255, 0.6)',
        chrome: '#888888'
      },
      fontFamily: {
        display: ['Unbounded', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      }
    }
  },
  plugins: [
    forms,
    containerQueries,
    aspectRatio,
  ],
}
