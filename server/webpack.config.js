const path = require("path");
const fs = require("fs");

module.exports = {
  entry: ["@babel/polyfill", path.resolve(__dirname, "./src/main.js")],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: fs.readdirSync("node_modules").filter((x) => {
    return x !== ".bin";
  }),
  target: "node",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: path.resolve(__dirname, "node_modules"),
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
};
