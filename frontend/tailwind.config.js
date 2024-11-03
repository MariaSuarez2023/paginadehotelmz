/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html', 
      './src/**/*.{js,ts,jsx,tsx}', 
    ],
    theme: {
      extend: {
        colors: {
          primary: '#720A6A', // Colores personalizados
          secondary: '#c49c7c',
  
        },
      },
    },
    plugins: [],
  }