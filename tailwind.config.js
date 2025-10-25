/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#206192',
        'blue-level-3': '#89cbe7',
        'amber-accent': '#ffbf00',
      },
    },
  },
  plugins: [],
}