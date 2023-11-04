/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Sora', sans-serif"],
    },
    extend: {
      colors: {
        primary: "#1F3A5F",
      },
    },
  },
  plugins: [],
};
