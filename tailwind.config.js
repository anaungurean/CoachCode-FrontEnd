/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        extend: {
    colors:{
      'twilight': {
          '100': '#a193d9',
          '200': '#7a6aa9',
          '300': '#56437c',
          '400': '#331f51',
          '500': '#140029',
}
  },

  },
  },
  plugins: [],
}

 