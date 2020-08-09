const webpack = require("webpack");
const { webpackConfig } = require("./scripts");
const config = require("../config");

/**
 * Refreshes browser on file changes and syncs scroll/clicks between devices.
 * Your site will be available at http://localhost:3000
 */
function browserSyncTask(cb) {
  const compiler = webpack(webpackConfig);

  /**
   * Reload all devices when bundle is complete
   * or send a fullscreen error message to the browser instead
   */
  compiler.plugin("done", stats => {
    if (stats.hasErrors() || stats.hasWarnings()) {
      console.log(stats.toString()); // eslint-disable-line
    }
    config.browserSync.instance.reload();
  });

  const options = {
    open: false,
    notify: false,
    middleware: [
      // eslint-disable-next-line global-require
      require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: "errors-only",
        writeToDisk: true
      })
    ],
    ...config.browserSync.options
  };

  config.browserSync.instance.init(null, options);
  cb();
}

module.exports = browserSyncTask;
