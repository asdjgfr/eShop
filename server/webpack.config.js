const path = require("path");
const fs = require("fs");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = new SpeedMeasurePlugin().wrap({
  entry: ["@babel/polyfill", path.resolve(__dirname, "./src/main.js")],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [nodeExternals()],
  target: "node",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
});
