export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        display: ["Syne", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#00b97c",
          50:  "#e6f9f2",
          100: "#b3eed9",
          200: "#80e3c0",
          300: "#4dd8a7",
          400: "#26cf94",
          500: "#00b97c",
          600: "#00a36d",
          700: "#008a5c",
          800: "#00704a",
          900: "#005739",
        },
        /* Light mode */
        "page-bg":  "#f0faf5",
        "card-bg":  "#ffffff",
        "light-text": "#1a1a1a",
        /* Dark mode */
        "dark-page": "#030c07",
        "dark-card": "#0d1a10",
        "dark-text": "#e8f5ef",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
