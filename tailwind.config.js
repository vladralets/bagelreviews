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
        "border-color": 'rgba(84, 84, 84, 0.7)'
      },
    },
  },
  plugins: [],
}

