module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  prefix: "tw-",
  important: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Rubik", "sans-serif"],
      body: ['"Rubik"', "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
