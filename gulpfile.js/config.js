const browserSync = require("browser-sync");
const imagemin = require("gulp-imagemin");

const srcBase = "./src";
const destBase = "./web/dist";

const env = process.env.NODE_ENV || "development";

const config = {
  devMode: env === "development",
  srcBase,
  destBase,
  browserSync: {
    instance: browserSync.create(),
    options: {
      proxy: process.env.PRIMARY_SITE_URL || false
    }
  },
  copy: {
    folders: ["static", "fonts"]
  },
  clean: {
    paths: destBase
  },
  styles: {
    src: [`${srcBase}/styles/*.scss`],
    dest: `${destBase}/styles`,
    postCssPlugins() {}
  },
  scripts: {
    entry: {
      main: [`${srcBase}/scripts/main.js`]
    },
    dest: `${destBase}/scripts`
  },
  templates: {
    src: ["./templates/**/*.{html,twig}"]
  },
  images: {
    src: [`${srcBase}/images/**/*.{jpg,png,gif,svg}`],
    dest: `${destBase}/images`,
    imageMinConfig: [
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo({
        plugins: [
          { cleanupAttrs: true },
          { cleanupIDs: false },
          { collapseGroups: false },
          { mergePaths: false },
          { moveElemsAttrsToGroup: false },
          { moveGroupAttrsToElems: false },
          { removeViewBox: false },
          { removeStyleElement: true }
        ]
      })
    ]
  },
  watch: [
    {
      globs: [`${srcBase}/styles/**/*.scss`],
      task: require.resolve("./tasks/styles")
    },
    {
      globs: ["./templates/**/*.{html,twig}"],
      task: require.resolve("./tasks/templates")
    },
    {
      globs: [`${srcBase}/images/**/*.{jpg,png,gif,svg}`],
      task: require.resolve("./tasks/images")
    },
    {
      globs: [`${srcBase}/static/**/*`, `${srcBase}/fonts/**/*`],
      task: require.resolve("./tasks/copy")
    }
  ]
};

module.exports = config;
