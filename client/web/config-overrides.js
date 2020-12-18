const path = require("path");
const {
  override,
  addLessLoader,
  addWebpackAlias,
  disableEsLint,
  addWebpackPlugin,
} = require("customize-cra");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  webpack: override(
    addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        // modifyVars: { "@primary-color": "#A80000" },
      },
    }),
    disableEsLint(),
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
    })
  ),
  paths: function (paths, env) {
    paths.appBuild = path.join(path.dirname(paths.appBuild), "../../build/web");
    return paths;
  },
};
