/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // use class-based toggle for theme switch
  content: [
    './*.{html,js}',
    './feed/**/*.{html,js}',
    './profile/**/*.{html,js}',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#3B82F6', // main blue
          dark: '#2563EB', // darker hover blue
          light: '#93C5FD', // soft accent blue
        },
        // refined background system
        lightbg: '#F3F4F6', // subtle light gray (comfortable contrast)
        darkbg: '#0D1117', // elegant deep navy background (GitHub style)
        cardlight: '#FFFFFF', // white for cards in light mode
        carddark: '#1E2532', // lighter slate-blue card background for dark mode
      },
      boxShadow: {
        glow: '0 0 10px rgba(59, 130, 246, 0.4)', // soft brand glow (optional use)
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
