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
const { bundleScripts } = require("./tasks/scripts");

// Collections of tasks
const core = parallel(styles, templates, bundleScripts, copy, images);
const watchTasks = parallel(watch, browserSync);

// The "public" tasks, AKA tasks called by our package.json
const defaultTask = series(clean, core, watchTasks);

exports.default = defaultTask;
