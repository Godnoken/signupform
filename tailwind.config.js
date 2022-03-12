module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      fontSize: {
        main: "clamp(12px, 5 * (1vw + 1vh) / 2, 100px)",
        form: "clamp(12px, 2 * (1vw + 1vh) / 2, 100px)",
        formError: "clamp(12px, 1 * (1vw + 1vh) / 2, 100px)",
        desktopMain: "clamp(12px, 2 * (1vw + 1vh) / 2, 100px)",
        desktopForm: "clamp(12px, 1.2 * (1vw + 1vh) / 2, 100px)",
      },
      backgroundImage: {
        heroTitle: "linear-gradient(to left, #970076 50%, black 50%)",
        heroTitleDark: "linear-gradient(to left, #ff46d7 50%, #f8f8ff 50%)"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  darkMode: "class"
}