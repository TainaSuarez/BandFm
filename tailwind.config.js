/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'helvetica-black': ['Helvetica Neue 93 Black Extended', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'bandfm-green': {
          50: '#f0f9e8',
          100: '#e1f2d1',
          200: '#c3e5a3',
          300: '#a5d875',
          400: '#87cb47',
          500: '#7CB342', // Color principal verde Band FM
          600: '#6a9938',
          700: '#58802e',
          800: '#466624',
          900: '#344d1a',
        },
        'bandfm-orange': {
          50: '#fff3e0',
          100: '#ffe7c1',
          200: '#ffcf83',
          300: '#ffb745',
          400: '#ff9f07',
          500: '#FF6D00', // Color principal naranja Band FM
          600: '#e65a00',
          700: '#cc4700',
          800: '#b33400',
          900: '#992100',
        }
      }
    },
  },
  plugins: [],
}
