const gulp = require("gulp");
const cssGlobbing = require("gulp-css-globbing");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const importCss = require("postcss-import");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");
const config = require("../config");

sass.compiler = require("dart-sass");

function styles() {
  const postCssProcessors = [importCss(), autoprefixer()];

  if (!config.devMode) {
    postCssProcessors.push(cssnano());
  }

  return gulp
    .src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(
      cssGlobbing({
        extensions: [".scss"]
      })
    )
    .pipe(
      sass({
        includePaths: ["node_modules"]
      }).on("error", sass.logError)
    )
    .pipe(postcss(postCssProcessors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(config.browserSync.instance.stream());
}

module.exports = styles;
