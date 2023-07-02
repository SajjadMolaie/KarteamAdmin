module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    fontFamily: {
      display: ["Vazirmatn", "sans-serif"],
      body: ["Vazirmatn", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#D8DBE0",
        "gray-bg": "#F1F1F1",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        460: "460px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      minHeight: {
        590: "590px",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
