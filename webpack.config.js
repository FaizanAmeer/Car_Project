var path = require("path");
var webpack = require("webpack");

module.exports = {
  // other webpack configurations...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./src/vendor"),
    filename: "bundle.min.js",
  },
};
