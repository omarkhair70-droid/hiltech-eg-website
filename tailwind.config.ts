import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a1630',
          800: '#102446'
        },
        brand: {
          orange: '#f97316'
        }
      }
    },
  },
  plugins: [],
};
export default config;
