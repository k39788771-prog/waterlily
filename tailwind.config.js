/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-brand': '#231123',
        'medium-brand': '#684CAC',
        'light-brand': '#7759C9',
      },
      backgroundImage: {
        'Birthday': "url('/src/assets/birthday.jpg')",
        'Gender': "url('/src/assets/gender.jpg')",
        'Health': "url('/src/assets/health.jpg')",
        'Money': "url('/src/assets/money.jpg')",
        'Waterlily': "url('/src/assets/waterlily.jpg')",
      }
    },
 
  },
  plugins: [],
}
