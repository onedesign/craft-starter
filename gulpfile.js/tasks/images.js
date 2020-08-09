const gulp = require("gulp");
const imageMin = require("gulp-imagemin");
const config = require("../config");

/**
 * Lossless optimization of image files
 */
function images() {
  return gulp
    .src(config.images.src)
    .pipe(
      imageMin({
        progressive: true,
        svgoPlugins: [
          {
            cleanupIDs: false,
            collapseGroups: false,
            mergePaths: false,
            moveElemsAttrsToGroup: false,
            moveGroupAttrsToElems: false,
            removeUselessStrokeAndFill: false,
            removeViewBox: false,
            removeStyleElement: true
          }
        ]
      })
    )
    .pipe(gulp.dest(config.images.dest));
}

module.exports = images;
