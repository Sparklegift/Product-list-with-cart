/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm': '320px',    // Small screens
        'tablet': '728px', // Tablet screens
        'desktop': '1024px', // Desktop screens
      },

      fontFamily: {
        'redhat': ['"Red Hat Text"', 'sans-serif'],
      },

      colors: {
        'Red': 'hsl(14, 86%, 42%)',
        'Red-dark': 'hsl(14, 91%, 17%);',
        'Green': 'hsl(159, 69%, 38%)',
        'Rose-50': 'hsl(20, 50%, 98%)',
        'Rose-100': 'hsl(13, 31%, 94%)',
        'Rose-300': 'hsl(14, 25%, 72%)',
        'Rose-400': 'hsl(7, 20%, 60%)',
        'Rose-500': 'hsl(12, 20%, 44%)',
        'Rose-900': 'hsl(14, 65%, 9%)',
      },

      fontSize: {
        '0.5xl': '16px',
      }

    },
  },
  plugins: [],
}

