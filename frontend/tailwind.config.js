// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/*.tff",
    ],
    theme: {
        extend: {
          colors: {
            textcolor: '#044739', // Example primary color
            pink_main: '#F7D2DB', // Example secondary color
            beige_main: '#FFF9EC',
            purple_main:'#CABAF2',
            orange_main:'#FA9E05',
            blue_main: '#E8F2F6',
          }
        },
        fontFamily: {
          'overlock': ['Overlock SC', 'sans-serif'],
          'baloo': ['Baloo', 'sans-serif'],
        },
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }
  
            md: '768px',
            // => @media (min-width: 768px) { ... }
  
            lg: '1024px',
            // => @media (min-width: 1024px) { ... }
  
            xl: '1280px',
            // => @media (min-width: 1280px) { ... }
  
            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    variants: {},
    plugins: [],
  }
  