/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'Rubik-Gemstones': ['"Rubik Gemstones"', 'cursive'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
