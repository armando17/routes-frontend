import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        powerblue: {
          dark: "#000000",
          light: "#6c7883",
        },

        primary: {
          DEFAULT: "#2195E8",
          foreground: "#000000",
        },
        focus: "#BEF264",
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;


