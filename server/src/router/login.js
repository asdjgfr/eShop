exports.login = function (router) {
  router.post("/api/login", async (ctx) => {
    const { username, password, device, deviceID, session } = ctx.request.body;
    const ip = ctx.request.headers["X-Real-IP"] ?? "";
    const realIP = ctx.request.headers["X-Forwarded-For"] ?? "";
    ctx.body = await require("../db/user").userLogin(
      username,
      password,
      JSON.stringify(device),
      deviceID,
      session,
      ip,
      realIP
    );
  });
  return router;
};

exports.checkLogin = function (router) {
  router.post("/api/checklogin", async (ctx) => {
    const { session, deviceID } = ctx.request.body;
    const checkLogin = require("../session/user").checkLogin(session, deviceID);
    ctx.body = {
      code: checkLogin ? 0 : 401,
      msg: checkLogin ? "" : "登录失效，请重新登录！",
    };
  });
  return router;
};
