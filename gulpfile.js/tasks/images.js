const gulp = require("gulp");
const imageMin = require("gulp-imagemin");
const config = require("../config");

/**
 * Lossless optimization of image files
 */
function images() {
  return gulp
    .src(config.images.src)
    .pipe(imageMin(config.images.imageMinConfig))
    .pipe(gulp.dest(config.images.dest));
}

module.exports = images;
