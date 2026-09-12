/** @type {import('tailwindcss').Config} */
module.exports = {
  // This line tells Tailwind to look at all your .jsx and .js files in the src folder
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
