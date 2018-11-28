const path = require('path');
// Loads our .env file into process.env
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

module.exports = {
  html        : false,
  images      : true,
  fonts       : true,
  static      : true,
  svgSprite   : false,
  ghPages     : false,
  stylesheets : {
    autoprefixer: {
      grid: true
    },
    sass: {
      includePaths: [
        './node_modules/',
        './node_modules/normalize.css'
      ]
    }
  },

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: [
        "./app.js"
      ]
    },
    publicPath: "/dist/scripts",
    provide: {
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }
  },

  browserSync: {
    // Update this to match your development URL
    proxy: {
      target: process.env.PUBLIC_URL,
    },
    ghostMode: {
      scroll: false,
      clicks: false,
      forms: false
    },
    files: [
      'templates/**/*'
    ],
    open: false
  },

  production: {
    rev: true
  }
}
