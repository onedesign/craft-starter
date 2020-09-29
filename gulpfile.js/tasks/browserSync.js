const webpack = require("webpack");
const stripAnsi = require("strip-ansi");
const webpackDevMiddleware = require("webpack-dev-middleware");
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
  // eslint-disable-next-line consistent-return
  compiler.hooks.done.tap("ReloadDevices", stats => {
    if (stats.hasErrors() || stats.hasWarnings()) {
      return config.browserSync.instance.sockets.emit("fullscreen:message", {
        title: "Webpack Error:",
        body: stripAnsi(stats.toString()),
        timeout: 100000
      });
    }
    config.browserSync.instance.reload();
  });

  const options = {
    open: false,
    notify: false,
    middleware: [
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        writeToDisk: true
      })
    ],
    ...config.browserSync.options
  };

  config.browserSync.instance.init(null, options);
  cb();
}

module.exports = browserSyncTask;
