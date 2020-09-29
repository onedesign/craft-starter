const gulp = require("gulp");
const cssGlobbing = require("gulp-css-globbing");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const importCss = require("postcss-import");
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const cssnano = require("cssnano");
const config = require("../config");

sass.compiler = require("dart-sass");

function getPostCssProcessors(devMode) {
  const postCssProcessors = [
    importCss(),
    ...(config.styles.postCssPlugins(devMode) || []),
    autoprefixer()
  ];

  if (!devMode) {
    postCssProcessors.push(cssnano());
  }

  return postCssProcessors;
}

function styles() {
  return gulp
    .src(config.styles.src)
    .pipe(gulpif(config.devMode, sourcemaps.init()))
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
    .pipe(postcss(getPostCssProcessors(config.devMode)))
    .pipe(gulpif(config.devMode, sourcemaps.write()))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(config.browserSync.instance.stream());
}

module.exports = styles;
