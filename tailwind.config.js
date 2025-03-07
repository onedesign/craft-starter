import corePlugins from './theme/config/corePlugins';
import fontFamily from './theme/fontFamily';
import plugins from './theme/config/plugins';
import safelist from './theme/config/safelist';

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
