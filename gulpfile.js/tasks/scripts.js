const webpack = require("webpack");
const path = require("path");
const colors = require("ansi-colors");
const log = require("fancy-log");
const { error, warn } = require("fancy-log");
const config = require("../config");

const webpackConfig = {
  entry: config.scripts.entry,
  mode: config.devMode ? "development" : "production",
  devtool: config.devMode ? "eval-cheap-source-map" : false,
  output: {
    filename: "[name].js",
    path: path.resolve(config.scripts.dest),
    publicPath: "/dist/scripts/"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }]
            ],
            plugins: []
          }
        }
      }
    ]
  },
  plugins: config.devMode ? [new webpack.HotModuleReplacementPlugin()] : []
};

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
  return function(err, stats) {
    const info = stats.toJson();

    if (stats.hasErrors()) {
      // eslint-disable-next-line no-console
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
