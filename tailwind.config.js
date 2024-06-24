/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#cfece9",
        "on-primary": "#4db8b1",
        secondary: "#ffece7",
        "on-secondary": "#ff5d39",
        "on-background": "#333",
      },
      screens: {
        xs: "500px",
        "xs-2": "460px",
        "xs-3": "420px",
        "xs-4": "380px",
        "xs-5": "340px",
      },
    },
  },
  plugins: [],
};
