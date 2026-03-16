export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "ui-sans-serif", "system-ui"],
      },
      colors: {
        ink: "#111118",
        graphite: "#1E1E27",
        sand: "#F5F1EC",
        mist: "#ECE7E1",
        ember: "#F04D32",
        jade: "#18A77C",
        steel: "#5E6472",
        cobalt: "#1C3CF7",
        haze: "#FAF7F3",
      },
      boxShadow: {
        soft: "0 24px 60px rgba(17, 17, 24, 0.12)",
      },
    },
  },
  plugins: [],
};
