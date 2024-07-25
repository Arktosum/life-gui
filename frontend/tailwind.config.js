/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        neutral: 'var(--neutral-color)',
        success: 'var(--success-color)',
        failure: 'var(--failure-color)',
        warning: 'var(--warning-color)',
        info: 'var(--info-color)',
        light: 'var(--light-color)',
        dark: 'var(--dark-color)',
        text: 'var(--text-color)',
      },
    },
  },
  plugins: [],
}