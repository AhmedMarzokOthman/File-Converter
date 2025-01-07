/** @type {import('tailwindcss').Config} */
module.exports = {
  devtool: false,
  content: ['./index.html', './main.js'],
  theme: {
    extend: {
      fontFamily: {
        'alexandria': ['Alexandria', 'sans-serif'],
      },
    },
  },
  plugins: [],
}