exports.routes = function (router) {
  require("./userLog").login(router);
  require("./userLog").checkLogin(router);
  require("./userLog").logout(router);
  require("./customerSource").getCustomerSource(router);
  require("./customerSource").createCustomerSource(router);
  require("./customerSource").delCustomerSource(router);
  return router;
};
