const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = new SpeedMeasurePlugin().wrap({
  mode: "development",
  entry: ["@babel/polyfill", path.resolve(__dirname, "./src/main.js")],
  output: {
    filename: "dev.js",
    path: path.resolve(__dirname, "dev"),
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
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "static"),
          to: path.resolve(__dirname, "dev", "static"),
        },
        {
          from: path.resolve(__dirname, "src", "config"),
          to: path.resolve(__dirname, "dev", "config"),
        },
      ],
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
});
