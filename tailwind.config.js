/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7E00DF',
      },
      screens: {
        sm: '550px',
        md: '750px',
        lg: '1130px',
        xl: '1640px',
        '2xl': '1880px',
      },
    },
  },
  plugins: [],
};
