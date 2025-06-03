module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
      },
    },
    colors: {
      primary: {
        light: "var(--primary-light)",
        DEFAULT: "var(--primary)",
        dark: "var(--primary-dark)",
      },
      contrast: "var(--contrast)",
      transparent: "transparent",
      black: "#101111",
      white: "#fff",
      gray: {
        50: "#f8f8f8",
        100: "#EDEEEE",
        200: "#E6E7E7",
        300: "#DBDCDC",
        400: "#878888",
        500: "#686E6E",
        600: "#404141",
        700: "#343535",
        800: "#282929",
        900: "#1D1E1E",
      },
      red: {
        50: "#ffe0e1",
        400: "#FF656B",
        500: "#cc5156",
      },
      green: {
        400: "#1FDA8A",
      },
      orange: {
        400: "#FFAB2E",
      },
    },
    fontFamily: {
      sans: ["Manrope", "ui-sans-serif", "sans-serif"],
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.200", "currentColor"),
    }),
    extend: {
      fontSize: {
        xxl: "1.625rem",
        md: "0.938rem",
        ss: "0.813rem",
        xxs: "0.75rem",
        "3xs": "0.6875rem",
      },
      backgroundSize: {
        16: "1rem",
      },
      width: {
        22: "5.75rem",
        sidebar: "240px",
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "33.33333%",
        "2/3": "66.66667%",
      },
      minWidth: {
        "1/3": "33.33333%",
        "2/3": "66.66667%",
      },
      height: {
        21: "5.325rem",
      },
      minHeight: {
        inherit: "inherit",
      },
      inset: {
        19: "4.7rem",
        38: "38rem",
      },
      flex: {
        75: "0 0 75px",
        85: "0 0 85px",
      },
      margin: {
        30: "7.5rem",
      },
      boxShadow: {
        bottom: "0 2px 0 0 rgba(0, 0, 0, 0.05)",
        inner: "0 0 0 1000px rgba(255, 255, 255, 1) inset",
        "sm-primary": "0 1px 2px 0 var(--primary-light)",
        top: "0px -4px 1px 0px rgb(0, 0, 0, 0.025)",
        alert: "2px 2px 10px #EDEEEE",
      },
      transitionProperty: {
        bg: "background",
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
      },
      gridRowStart: {
        10: "10",
      },
      gridRowEnd: {
        9: "9",
        10: "10",
      },
      rotate: {
        135: "135deg",
      },
      spacing: {
        15: "3.75rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
