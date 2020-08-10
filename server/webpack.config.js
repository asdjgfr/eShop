const path = require("path");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = new SpeedMeasurePlugin().wrap({
  entry: ["@babel/polyfill", path.resolve(__dirname, "./src/main.js")],
  output: {
    filename: "carManagement.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: [
    nodeExternals(),
    {
      "@config": "commonjs ./config/config",
    },
  ],
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
          to: path.resolve(__dirname, "dist", "static"),
        },
        {
          from: path.resolve(__dirname, "src", "config"),
          to: path.resolve(__dirname, "dist", "config"),
        },
      ],
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
});
