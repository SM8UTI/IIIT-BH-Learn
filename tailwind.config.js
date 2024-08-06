import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#E6FAF9",
        primary: "#0E7F5D",
        secondary: "#FFC224",
        darkPrimary: "#013928",
        text: "#1E1E1E",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
});
