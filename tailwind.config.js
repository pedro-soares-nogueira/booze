/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif',],
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),require('tailwind-scrollbar')({ nocompatible: true }),
],
}
