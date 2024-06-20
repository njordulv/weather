/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        lg: '-5px -5px 5px rgba(255, 255, 255, 0.2), 5px 5px 10px rgba(0, 0, 0, 0.2)',
        inner:
          '-1px -1px 5px rgba(255, 255, 255, 0.5), 1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 1), inset 2px 2px 4px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
