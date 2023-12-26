module.exports = {
  plugins: {
    tailwinds: {},
    autoprefixer: {},
  },
  theme: {
    extend: {
      screens: {
        'sm': '500px',  // Your custom small screen breakpoint
        'md': '768px',  // Your medium screen breakpoint
        'lg': '1024px', // Your large screen breakpoint
      },
    },
  },}
