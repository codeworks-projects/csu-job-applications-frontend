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
      primary: "#07418C",
      "primary-hover": "#0852ad",
      secondary: "#F5F5F5",
      "secondary-hover": "#F2F2F2",
      grey: "#888888",
      green: "#31b748",
      red: "#C74F4F",
      placeholder: "#EEEEEE",
      input: "#F5F5F5",
      "input-focus": "#F3F3F3",
      black: "#000000",
      white: "#FFFFFF",
    },
    fontFamily: {
      sans: ["Hind", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
  },
  plugins: [],
};
