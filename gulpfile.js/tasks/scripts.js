const webpack = require("webpack");
const colors = require("ansi-colors");
const log = require("fancy-log");
const { error, warn } = require("fancy-log");
const webpackConfig = require("../../webpack.config.js");

/**
 * Report webpack errors
 * @param {string} err Error string.
 */
function reportError(err) {
  log(
    colors.red(
      "\n///////////////////////////////////////////////////////////////\n\n"
    ),
    `${colors.yellow(err)}\n\n`,
    colors.red(
      "///////////////////////////////////////////////////////////////"
    )
  );
}

/**
 * Call back for the webpack build command
 * @param {function} done
 * @returns {function(...[*]=)}
 */
function onBuild(done) {
  return (err, stats) => {
    const info = stats.toJson();

    if (stats.hasErrors()) {
      info.errors.forEach(errorText => {
        error(reportError(errorText));
      });
    }

    if (stats.hasWarnings()) {
      warn(colors.yellow(info.warnings));
    }

    if (err) {
      error(err);
      if (done) {
        done();
      }
    } else {
      info.assets.forEach(asset => {
        log("Webpack: output ", colors.green(asset.name));
      });
      log("Webpack: ", colors.blue(`finished ${info.hash}`));

      if (done) {
        done();
      }
    }
  };
}

/**
 * Bundles javascript files.
 */
function bundleScripts(done) {
  webpack(webpackConfig).run(onBuild(done));
}

exports.webpackConfig = webpackConfig;
exports.bundleScripts = bundleScripts;
