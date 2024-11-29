/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        worksans: ['Work Sans', 'sans-serif'],
        stylescript: ['"Style Script"', 'cursive'],
      },
      backgroundImage: (theme) => ({
        'primary-linear-dark': 'linear-gradient(to right, #25DAAB, #1A96CB)',
        'primary-linear': 'linear-gradient(to right, #1A96CB, #25DAAB)',
        'primary-linear-dark-opacity':
          'linear-gradient(to bottom, rgba(5, 191, 135, 0.3), rgba(22, 124, 93, 0.3))',
      }),
    },
  },
  plugins: [],
};

