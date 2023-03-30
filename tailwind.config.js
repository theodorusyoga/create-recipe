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
    screens: {
      sm: "600px",
      md: "600px",
      lg: "600px",
      xl: "600px",
      "2xl": "600px",
    },
    extend: {},
  },
  plugins: [],
};
