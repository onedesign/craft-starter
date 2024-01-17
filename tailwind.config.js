const corePlugins = require('./theme/config/corePlugins');
const fontFamily = require('./theme/fontFamily');
const plugins = require('./theme/config/plugins');
const safelist = require('./theme/config/safelist');

module.exports = {
  content: ['./app/templates/**/*.{html,twig}', './src/**/*.js'],
  safelist,
  theme: {
    extend: {
      fontFamily,
    },
  },
  corePlugins,
  plugins,
};
