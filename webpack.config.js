const path = require("path");
const config = require("./gulpfile.js/config");

module.exports = {
  entry: config.scripts.entry,
  mode: config.devMode ? "development" : "production",
  devtool: config.devMode ? "eval-cheap-source-map" : false,
  output: {
    filename: "[name].js",
    path: path.resolve(config.scripts.dest),
    publicPath: "/dist/scripts"
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
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  plugins: []
};
