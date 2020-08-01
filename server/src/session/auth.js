const doNotNeedAuthRoute = new Set(["/api/login"]);
export default async function (ctx, next) {
  const { url } = ctx.request;
  let { session, deviceID } = ctx.request.body;
  const { method } = ctx.request;
  if (method.toUpperCase() === "GET") {
    const { searchParams } = new URL(`http://domain${url}`);
    session = searchParams.get("session");
    deviceID = searchParams.get("deviceID");
  }
  const checkLogin = require("../session/user").checkLogin(session, deviceID);
  if (!checkLogin && !doNotNeedAuthRoute.has(url)) {
    ctx.body = {
      code: 401,
      msg: "登录失效，请重新登录！",
    };
  } else {
    await next();
  }
}
