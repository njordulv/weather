/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        lg: '-3px -3px 3px rgba(255, 255, 255, 0), 3px 3px 5px rgba(0, 0, 0, 0.07)',
        inner:
          '-1px -1px 5px rgba(255, 255, 255, 0.5), 1px 1px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 1), inset 2px 2px 4px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
