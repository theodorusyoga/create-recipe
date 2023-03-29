/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      red: {
        200: "#ff607a",
        300: "#ff0037",
      },
      white: "#ffffff",
      grey: "#5f5f5f",
      lightGrey: "#bfbfbf",
      gray: {
        700: "#efefef",
        400: "#8f8f8f",
      },
    },
    fontFamily: {
      sans: ['"Noto Sans"', "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
