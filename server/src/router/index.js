exports.routes = function (router) {
  require("./login").login(router);
  require("./login").checkLogin(router);
  return router;
};
