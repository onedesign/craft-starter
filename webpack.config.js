const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const config = require("./gulpfile.js/config");

const webpackPlugins = [];

if (config.devMode) {
  webpackPlugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  entry: config.scripts.entry,
  mode: config.devMode ? "development" : "production",
  devtool: config.devMode ? "eval-cheap-source-map" : false,
  output: {
    filename: "[name].js",
    path: path.resolve(config.scripts.dest),
    publicPath: "/dist/scripts/"
  },
  optimization: {
    minimize: !config.devMode,
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ],
    removeEmptyChunks: !config.devMode,
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
  plugins: webpackPlugins
};
