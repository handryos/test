/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mvst: {
          orange: "#BA8039",
          blue: "#77A9B0",
        },
        ui: {
          bg: "#101011",
          card: "#191919",
          label: "#9B9B9B",
          inputBg: "#2D2D2D",
          inputText: "#938E8E",
          typeText: "#3A383D",
          typeBg: "#383838",
          black: "#0F0F0F",
          white: "#FFFFFF",
        },
        auth: {
          primary: "#BA8039",
          secondary: "#77A9B0",
          background: "#0F0F0F",
        },
        coffee: {
          primary: "#BA8039",
          card: "#191919",
          accent: "#77A9B0",
        },
        dashboard: {
          primary: "#77A9B0",
          secondary: "#BA8039",
          background: "#0F0F0F",
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"],
        title: ['"Bebas Neue"', "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3.125rem", { lineHeight: "1" }],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "filter-pop": "filter-pop 0.22s cubic-bezier(0.4,0,0.2,1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "filter-pop": {
          "0%": { transform: "scale(1)" },
          "60%": { transform: "scale(1.07)" },
          "100%": { transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mvst": "linear-gradient(135deg, #BA8039 0%, #77A9B0 100%)",
      },
    },
  },
  plugins: [],
};
