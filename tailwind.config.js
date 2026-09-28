/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A2740",
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#bcdbff",
          300: "#8ec3ff",
          400: "#599fff",
          500: "#3277fc",
          600: "#1d58f0",
          700: "#1644dd",
          800: "#1737b3",
          900: "#0A2740",
          950: "#071321",
        },
        accent: {
          DEFAULT: "#00BFFF",
          hover: "#00a3db",
          glow: "#38d4ff",
          light: "#e0f7ff",
        },
        navy: {
          950: "#040911",
          900: "#071321",
          850: "#0B1B2F",
          800: "#0F2642",
          700: "#173860",
          600: "#224e83",
        },
        secondary: "#111111",
        surface: "#FFFFFF",
        darkSurface: "#0d1624",
        cardDark: "#101d30",
        borderDark: "#1e3352"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 191, 255, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 191, 255, 0.5)' },
        }
      }
    }
  },
  plugins: []
};
