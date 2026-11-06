/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#03020A',
        'space-dark': '#060412',
        'space-deep': '#0B071F',
        'brand-orange': '#FF7A00',
        'brand-amber': '#FFA028',
        'brand-coral': '#FF3838',
        'brand-magenta': '#E02696',
        'brand-purple': '#7B2CBF',
        'brand-violet': '#5A189A',
        'brand-cyan': '#00E5FF',
        'glass-surface': 'rgba(18, 14, 38, 0.55)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-highlight': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 40, 200, 0.25), transparent)',
        'accent-gradient': 'linear-gradient(135deg, #FF8A00 0%, #FF3366 50%, #C41AC9 100%)',
        'orange-pink-gradient': 'linear-gradient(90deg, #FF7A00 0%, #FF385C 55%, #DE28A5 100%)',
        'card-glass': 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      boxShadow: {
        'glow-orange': '0 0 35px -5px rgba(255, 122, 0, 0.45)',
        'glow-magenta': '0 0 35px -5px rgba(224, 38, 150, 0.45)',
        'glow-purple': '0 0 40px -8px rgba(123, 44, 191, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
