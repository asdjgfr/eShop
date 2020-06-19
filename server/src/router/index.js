exports.routes = function (router) {
  require("./userLog").login(router);
  require("./userLog").checkLogin(router);
  require("./userLog").logout(router);
  return router;
};
