import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          50:  '#f8f7ff',
          100: '#f0effe',
          200: '#e4e2fd',
          800: '#1a1825',
          900: '#110f1d',
          950: '#0a0812',
        },
        brand: {
          300: '#a78bfa',
          400: '#8b5cf6',
          500: '#7c3aed',
          600: '#6d28d9',
        },
        accent: {
          400: '#34d399',
          500: '#10b981',
        },
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn:   { from: { opacity: '0', transform: 'translateX(-12px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        pulse2:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        shimmer:   { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        blink:     { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        scaleUp:   { from: { transform: 'scale(0.95)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
      },
      animation: {
        fadeIn:  'fadeIn 0.25s ease-out',
        slideIn: 'slideIn 0.2s ease-out',
        pulse2:  'pulse2 1.4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        blink:   'blink 1s step-end infinite',
        scaleUp: 'scaleUp 0.2s ease-out',
      },
    },
  },
  plugins: [typography],
};
