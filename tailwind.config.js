/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        lg: '-2px -2px 3px rgba(255, 255, 255, 0), 2px 2px 5px rgba(0, 0, 0, 0.09)',
      },
    },
  },
  plugins: [],
}
