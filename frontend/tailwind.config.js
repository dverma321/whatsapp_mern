export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      backdropBlur: {
        'sm': '4px',
      },
      backdropOpacity: {
        '10': '0.1',
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin'),
    require('tailwindcss-filters'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  daisyui: {
    themes: true,
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
