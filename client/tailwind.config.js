/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    // Include all JS/JSX/TS/TSX files within the main 'src' directory
    // but EXCLUDE anything within 'src/server/node_modules'
    // Using process.cwd() for robustness as discussed before
    `${process.cwd()}/src/**/*.{js,jsx,ts,tsx}`,
    // --- EXCLUSION PATTERN ---
    //`!${process.cwd()}/src/server/**/*.{js,jsx,ts,tsx}`, // Exclude server module
    //`!${process.cwd()}/src/server/**/*.json`, // Also good to exclude json/other files from modules
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

