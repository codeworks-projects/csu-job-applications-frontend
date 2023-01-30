/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    colors: {
      primary: "#E57334",
      "primary-hover": "#E57334",
      // secondary: "#F5F5F5",
      // "secondary-hover": "#F2F2F2",
      grey: "#b3b3b3",
      // green: "#31b748",
      // red: "#C74F4F",
      placeholder: "#EEEEEE",
      input: "#F5F5F5",
      "input-focus": "#F3F3F3",
      black: "#000000",
      white: "#FFFFFF",
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [],
};
