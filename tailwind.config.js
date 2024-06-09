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
        },
        backgroundColor : '#f4f4fc',
      },
      height: {
        '90p': '90%',
        '10p': '10%',
        '5p'  : '5%',
        '80p' : '80%',
        '95p' : '95%',
        '85p' : '85%',
        '30p' : '30%',
        '70p' : '70%',
        '50p' : '50%',
        '40p' : '40%',
      },
    },
  },
  plugins: [],
}
