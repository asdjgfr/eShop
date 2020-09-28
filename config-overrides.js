const path = require("path");
const {
  override,
  addLessLoader,
  addWebpackAlias,
  disableEsLint,
} = require("customize-cra");
module.exports = {
  webpack: override(
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
};
