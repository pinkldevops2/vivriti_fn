/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],       // Body font
        heading: ["Poppins", "sans-serif"],  // Heading font
      },
    },
  },
  plugins: [],
};