/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        'oxford-blue': {
          DEFAULT: '#041734',
          dark: '#001027',
        },
        'crayola-blue': '#0075FF',
        'off-white': '#F7F9FF',
        alabaster: '#F1F1E6',
        success: '#4FD785',
        error: '#FF4848',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      gridTemplateColumns: {
        '3-featured-schemas': 'repeat(3, minmax(0, 24rem))',
      },
    },
    fontFamily: {
      headings: 'var(--headings-font)',
      body: 'var(--body-font)',
      code: 'var(--code-font)',
    },
  },
  plugins: [require('tailwindcss-animate')],
};
