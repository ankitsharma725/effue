/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'effue-black': '#0A0A0A',
        'effue-dark': '#1A1A1A',
        'effue-gold': '#D4AF37',
        'effue-gold-light': '#F4E4BA',
        'effue-rose': '#C4A484',
        'effue-cream': '#F5F5DC',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4E4BA 50%, #D4AF37 100%)',
      }
    },
  },
  plugins: [],
}
