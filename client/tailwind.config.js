module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': { 'max': '359px' }, // max-width 359px (less than 360)
      },
    },
  },
  plugins: [],
}

