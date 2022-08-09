/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      spacing: {
        chat: 'calc(100vh - 48px)'
      },
      boxShadow: {
        '3xl': '0px 7px 29px 0px rgba(100, 100, 111, 0.2)'
      },
      keyframes: {
        custom: {
          '0%': { transform: 'translateY(-80px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        custom: 'custom 1s ease-out'
      }
    }
  },
  plugins: []
};
