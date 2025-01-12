/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "science-technologie": "#B2F2BB", // Vert - Science & Technologie
        "art-culture": "#F4C2C2", // Rose - Art & Culture
        "histoire-geographie": "#A2DDF0", // Bleu - Histoire & Géographie
        "sport-loisir": "#FFD1A8", // Orange - Sport & Loisirs
        "politique-religion": "#D8BFD8", // Violet - Politique & Religion
        "societe-economie": "#FFF3B0", // Jaune - Société & Economie
      },
    },
  },
  plugins: [],
};
