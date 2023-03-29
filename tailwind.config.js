/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      red: "#ff607a",
      white: "#ffffff",
      grey: "#5f5f5f",
      lightGrey: "#bfbfbf",
      gray: {
        200: "#efefef",
      },
    },
    fontFamily: {
      sans: ['"Noto Sans"', "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
