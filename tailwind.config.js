/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glacier: '#B8E6E1',
        platinum: '#E5E5E5', 
        'slate-blue': '#6A5ACD'
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(135deg, #B8E6E1 0%, #E5E5E5 50%, #6A5ACD 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(184,230,225,0.8) 0%, rgba(229,229,229,0.8) 100%)'
      }
    },
  },
  plugins: [],
}