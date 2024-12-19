/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "md": {"max": "1300px"},
      "sm": {"max": "900px"},
    },
    fontFamily: {
      "harmony": ["Harmony Sans", "sans-serif"]
    },
    extend: {
      colors: {
        "main": "var(--main)",
        "main-light": "var(--main-light)",
        "secondary": "var(--secondary)",
        "text": "var(--text)",
        "highlight": "var(--highlight)",
        "description": "var(--description)",
        "ssr": "var(--ssr)",
        "sr": "var(--sr)",
        "r": "var(--r)"
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}
