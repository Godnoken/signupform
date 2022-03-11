module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      fontSize: {
        main: "clamp(10px, 5 * (1vw + 1vh) / 2, 100px)",
        form: "clamp(10px, 2 * (1vw + 1vh) / 2, 100px)",
        formError: "clamp(10px, 1 * (1vw + 1vh) / 2, 100px)",
        desktopMain: "clamp(10px, 2 * (1vw + 1vh) / 2, 100px)",
        desktopForm: "clamp(10px, 1 * (1vw + 1vh) / 2, 100px)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  darkMode: "class"
}