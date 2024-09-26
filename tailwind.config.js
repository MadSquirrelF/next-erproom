import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        "eyeShade": "eyeShade 3s infinite",
        "eyeMove": "eyeMove 3s infinite"
      },
      keyframes: {
        "eyeShade": {
          "0%": {
            transform: 'translateY(0)' // Используйте строки для значений
          },
          "20%": {
            transform: 'translateY(5px)'
          },
          "40%": {
            transform: 'translateY(-5px)'
          },
          "50%": {
            transform: 'translateY(-8px)'
          },
          "75%": {
            transform: 'translateY(5px)'
          },
          "100%": {
            transform: 'translateY(10px)'
          },
        },
        "eyeMove": {
          "0%": {
            transform: 'translate(0, 0)'
          },
          "20%": {
            transform: 'translate(0, 5px)'
          },
          "40%": {
            transform: 'translate(0, -5px)'
          },
          "50%": {
            transform: 'translate(-10px, -5px)'
          },
          "75%": {
            transform: 'translate(-20px, 5px)'
          },
          "100%": {
            transform: 'translate(0, 10px)'
          },
        }

      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true,
    themes: {
      light: {
        colors: {
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#0000FF"
          },
        }
      },
      dark: {
        colors: {
          background: "#222128",
        }
      }
    }
  })],
}
