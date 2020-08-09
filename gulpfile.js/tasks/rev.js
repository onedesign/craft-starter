const gulp = require("gulp");
const rev = require("gulp-rev");
const replace = require("gulp-replace");
const config = require("../config");

/**
 * Adds revision hash to assets and stores hashes in a manifest file
 */
function revAssets() {
  return gulp
    .src([`${config.styles.dest}/**/*.css`, `${config.scripts.dest}/**/*.js`], {
      base: "./"
    })
    .pipe(rev())
    .pipe(gulp.dest("."))
    .pipe(rev.manifest())
    .pipe(replace("public", ""))
    .pipe(gulp.dest(config.paths.dist));
}

exports.revAssets = revAssets;
