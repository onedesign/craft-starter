// Fallback to dev if no env is supplied.
process.env.NODE_ENV = process.env.NODE_ENV || "development";
require("dotenv").config();
const { series, parallel } = require("gulp");

// Our base tasks
const styles = require("./tasks/styles");
const templates = require("./tasks/templates");
const clean = require("./tasks/clean");
const watch = require("./tasks/watch");
const browserSync = require("./tasks/browserSync");
const copy = require("./tasks/copy");
const images = require("./tasks/images");
const rev = require("./tasks/rev");
const { bundleScripts } = require("./tasks/scripts");

// Collections of tasks
const core = parallel(styles, templates, bundleScripts, copy, images);
const watchTasks = parallel(watch, browserSync);

// The "public" tasks, AKA tasks called by our package.json
const defaultTask = series(clean, core, watchTasks);
const buildTask = series(clean, core, rev);

exports.default = defaultTask;
exports.build = buildTask;
exports.clean = clean;
