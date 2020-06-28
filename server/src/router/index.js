exports.routes = function (router) {
  require("./userLog").mutations.forEach((mutation) => {
    mutation(router);
  });
  require("./customerSource").mutations.forEach((mutation) => {
    mutation(router);
  });
  return router;
};
