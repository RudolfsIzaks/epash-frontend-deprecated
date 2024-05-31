/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Inter', 'sans-serif'] // Replace 'YourFontName'
      },
      colors: {
        'epash-green': '#32C58D',
        'gree-hover': '#2dd4bf'
      },
      fontSize: {
        'turbo-small': '6px',
      },
    },
  },
  plugins: [],
}

