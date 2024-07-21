import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        'axis-label-light': 'text-gray-700 dark:text-gray-200', // Light theme color
        'axis-label-dark': 'text-gray-200 dark:text-gray-700', // Dark theme color
      },
    },
  },
  plugins: [],
};
export default config;
