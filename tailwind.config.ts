import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F17D2B',
        secondary: '#f5f5f5',
        accent: '#F17D2B',
        orange: {
          500: '#F17D2B',
          600: '#E06A1B',
        },
      },
      fontFamily: {
        sans: ['MS Mincho', 'MS 明朝', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config