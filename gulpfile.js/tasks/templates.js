const gulp = require("gulp");
const config = require("../config");

/**
 * Reloads the browser on changes to templates
 *
 * @returns {*}
 */
function templates() {
  return gulp
    .src(config.templates.src)
    .pipe(config.browserSync.instance.reload({ stream: true, once: true }));
}

module.exports = templates;
