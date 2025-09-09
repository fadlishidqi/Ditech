import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.ts',
    './resources/js/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        // marquee vertikal untuk gallery
        'marquee-vert': {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        // shiny sweep untuk card
        shiny: {
          '0%':   { transform: 'translateX(-100%) skewX(-20deg)' },
          '100%': { transform: 'translateX(200%)  skewX(-20deg)' },
        },
      },
      animation: {
        'marquee-vert': 'marquee-vert 20s linear infinite',
        shiny: 'shiny 1.1s ease-in-out',
      },
    },
  },
  plugins: [forms],
}
