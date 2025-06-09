import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
// const colors = require("./src/colors");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  // content: [
  //   "./src/**/*.{js,jsx,ts,tsx}",
  //   "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  // ],
  // darkMode: ["selector"],
  // theme: {
  //   extend: {
  //     screen: {
  //       xs: 0,
  //       sm: 600,
  //       md: 900,
  //       lg: 1200,
  //       xl: 1536,
  //     },
  //     font: {},
  //     fontFamily: {
  //       "upag-open-sans": "Open Sans",
  //       segoe: ["'Segoe UI'"],
  //       sanspro: ["'Simplified Regular'", "'Segoe UI'"],
  //     },
  //     colors: {
  //       ...colors,
  //     },
  //     height: {
  //       "fill-window": "100vh",
  //       "upag-60": "60px",
  //       "upag-main-container": "calc(100% - 60px)",
  //       "fixed-container-height": "calc(100vh - 140px)",
  //     },
  //     minWidth: {
  //       "upag-input": "300px",
  //       "upag-60": "60px",
  //       "upag-200": "200px",
  //     },
  //     minHeight: {
  //       "upag-60": "240px",
  //     },
  //     fontSize: {
  //       "8x": "0.5rem",
  //       "9x": "0.5625rem",
  //       xxs: "0.6875rem", //11px
  //       xxxs: "0.625rem", // 10px
  //       xxss: "0.8125rem", // 13px
  //       subtitle: "0.875rem/1.875rem", // 14px / 30px
  //     },
  //   },
  // },
})



