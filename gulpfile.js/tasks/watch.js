const gulp = require("gulp");
const config = require("../config");

/**
 * Runs tasks when files change
 */
function watch() {
  config.watch.forEach(item => {
    gulp.watch(item.globs, require(item.task));
  });
}

module.exports = watch;
