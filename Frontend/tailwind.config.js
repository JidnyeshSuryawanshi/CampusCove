/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ Enable dark mode using a class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll 15s linear infinite',
        fadeIn: 'fade-in 0.5s ease-in-out', // ✅ Fixed animation declaration
        slideDown: 'slide-down 0.5s ease-in-out',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
    
  },
  plugins: [],
};
