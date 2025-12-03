// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        quickblue: "#003087",
        quickgreen: "#00A859",
      },
      // ← ONLY ONE closing brace here, NO extra comma!
    },
  },
  plugins: [],
};

export default config;
