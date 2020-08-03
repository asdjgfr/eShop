const fs = require("fs");
const { title } = require("./src/conf/config.json");
module.exports = {
  devServer: {
    proxy: "http://localhost:8900",
    http2: true,
    https: {
      key: fs.readFileSync("../localhostCert/localhost-key.pem"),
      cert: fs.readFileSync("../localhostCert/localhost.pem"),
      ca: fs.readFileSync("C:/Users/keepsoft/AppData/Local/mkcert/rootCA.pem")
    }
  },
  pwa: {
    name: title,
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    workboxPluginMode: "GenerateSW"
  }
};
