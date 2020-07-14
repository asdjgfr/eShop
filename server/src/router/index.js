exports.routes = function (router) {
  const paths = [
    require("./userLog"),
    require("./customerSource"),
    require("./billManagement"),
    require("./inventoryManagement"),
    require("./finance"),
  ];

  paths.forEach((p) => {
    p.mutations.forEach((mutation) => {
      mutation(router);
    });
  });
  return router;
};
