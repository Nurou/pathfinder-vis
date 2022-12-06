/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        snow0: '#ECEFF4',
        snow1: '#E5E9F0',
        snow2: '#D8DEE9',
        polar0: '#4C566A',
        polar1: '#434C5E',
        polar2: '#3B4252',
        polar3: '#2E3440'
      }
    },
    fontFamily: {
      sans: ['Space Mono', ...defaultTheme.fontFamily.sans]
    }
  },

  plugins: []
};
