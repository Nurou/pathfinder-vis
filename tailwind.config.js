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
        polar3: '#2E3440',
        grass: '#22c55e',
        source: '#8fbcbb',
        success: '#22c55e',
        danger: '#dc2626',
        destination: '#dc2626'
      }
    },
    fontFamily: {
      sans: ['Space Mono', ...defaultTheme.fontFamily.sans]
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-1deg)' },
        '50%': { transform: 'rotate(1deg)' }
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite'
    }
  },

  plugins: []
};
