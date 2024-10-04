/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'my-orange': '#FAF7F0',
        'my-black': '#4A4947',
      },
      fontFamily: {
        customFont: ['Roboto', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

