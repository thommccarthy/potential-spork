const purge = process.env.NODE_ENV === 'production' ? true : false;
module.exports = {
  // looks for references to classnames from tailwind
  purge: { enabled: purge, content: ['./build/**/*.html'] },
  darkMode: false,
  theme: {
    screens: {
      fiveHundred: '500px',

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        gothamBold: 'GothamBold, sans-serif',
        gothamBook: 'Gotham Book',
        openSansRegular: 'Open Sans Regular',
      },
      height: {
        cardsLarge: '30rem',
        mobileSlider: '500px',
        midSlider: '550px',
        xlSlider: '650px',
        twoXlSlider: '875px',
      },
      maxWidth: {
        ultrawideClamp: '2200px',
        firstCardLorem: '24ch',
        trees: '65rem',
      },
      width: {
        treesSm: '30rem',
        treesMd: '40rem',
        treesLg: '60rem',
        computerLg: '65rem',
        treesXl: '85rem',
      },
      colors: {
        adirondackGreen: '#006F53',
        adirondackGold: '#FFD637',
        cardGray: '#E8E8E8',
        bottomCardGray: '#57595B',
        cardBorderGray: '#707070',
        white: '#FFFFFF',
        footerGray: '#4A4A4A',
      },
      boxShadow: {
        cardShadow: '0 0 20px  rgba(0, 0, 0, 0.5)',
        mobileMenu: '4px 4px 4px black',
      },
    },
  },
};
