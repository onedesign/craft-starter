const path = require("path");
const gulp = require("gulp");
const config = require("../config");

// /**
//  * Copy fonts from src to dist directory
//  */
// function copy() {
//   return gulp.src(config.copy.globs).pipe(gulp.dest(config.destBase));
// }
//
const copyTasks = [];

// eslint-disable-next-line no-shadow
config.copy.folders.forEach(folder => {
  const srcPath = `${path.resolve(config.srcBase, folder)}/**/*`;
  const destPath = path.resolve(config.destBase, folder);

  function task() {
    return gulp.src(srcPath).pipe(gulp.dest(destPath));
  }

  copyTasks.push(task);
});

module.exports = gulp.parallel(...copyTasks);
