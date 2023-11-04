import withMT from '@material-tailwind/react/utils/withMT';
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'light-grey': '#F6F6F6',
        'moderate-blue': '#483EA8',
        'lime-green': '#11AF22',
        'pale': '#F8F8FF',
        'vivid-red': '#E41D1D',
        'dark-grey': '#676767'
      }
    },
  },
  plugins: [],
});

