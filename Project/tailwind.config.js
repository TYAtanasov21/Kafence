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
        'my-purple': '#8181FF',
        'my-purple-darker': '4C4CB0',
        'my-beige': '#D8D2C2',
        'my-brown': "#B17457",
        'my-brown-darker': '#562F1C'
      },
      fontFamily: {
        customFont: ['Roboto', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}

