/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kawaii': {
          'pink': { 
            50: '#FFF0F5', 100: '#FFE5EC', 200: '#FFB6C1', 300: '#FF9AB5', 
            400: '#FF7FA9', 500: '#FF6B9D', 600: '#E85A8A', 700: '#D14977'
          },
          'blue': { 
            50: '#E0F4FF', 100: '#B3E5FF', 200: '#87CEEB', 300: '#5CB8E0', 
            400: '#3AA3D4', 500: '#1E8FC8', 600: '#1A7AB0', 700: '#156698'
          },
          'yellow': { 
            50: '#FFFEF0', 100: '#FFF8DC', 200: '#FFEAA7', 300: '#FFDC7A', 
            400: '#FFCE4D', 500: '#FFC107', 600: '#E6AC00', 700: '#CC9900'
          },
          'purple': { 
            50: '#F5F0FF', 100: '#E6D9FF', 200: '#D4B4FF', 300: '#C299FF', 
            400: '#B07FFF', 500: '#9D66FF', 600: '#8A4DFF', 700: '#7733FF'
          },
          'green': { 
            50: '#F0FFF4', 100: '#D9FFE5', 200: '#B4FFD4', 300: '#8FFFC3', 
            400: '#6AFFB2', 500: '#45FFA1', 600: '#2EE68A', 700: '#1ACC73'
          },
        },
      },
      fontFamily: {
        'cute': ['Fredoka', 'sans-serif'],
        'bubble': ['Bubblegum Sans', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      boxShadow: {
        'cute': '0 10px 40px rgba(255, 182, 193, 0.4)',
        'cute-lg': '0 20px 60px rgba(255, 182, 193, 0.5)',
        'inner-cute': 'inset 0 2px 4px 0 rgba(255, 182, 193, 0.3)',
      },
      borderRadius: {
        'cute': '2rem',
        'super': '3rem',
      },
    },
  },
  plugins: [],
}
