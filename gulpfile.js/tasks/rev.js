const gulp = require("gulp");
const rev = require("gulp-rev");
const config = require("../config");

/**
 * Adds revision hash to assets and stores hashes in a manifest file
 */
function revAssets() {
  return gulp
    .src(`${config.destBase}/**/*.{css,js}`, { base: config.destBase })
    .pipe(rev())
    .pipe(gulp.dest(config.destBase))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.destBase));
}

module.exports = revAssets;
