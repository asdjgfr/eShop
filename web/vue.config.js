const mockData = require("./mock/mock");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8080,
    before(app) {
      app.post("/api/login", (req, res) => {
        res.json(mockData.login);
      });
    }
  }
};
