const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const config = require("./gulpfile.js/config");

const webpackPlugins = [
  new ESLintPlugin({
    context: `${config.srcBase}/scripts`
  })
];

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
          },
          output: {
            comments: false
          }
        },
        extractComments: false
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }]
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  plugins: webpackPlugins
};
