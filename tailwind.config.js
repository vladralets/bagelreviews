/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light': '#ffffff',
        'dark': '#1a1a1a',
        "bagel": '#8CCBBA',
        "bagel-dark": "rgb(65, 181, 150)"
      },
    },
  },
  plugins: [],
}

