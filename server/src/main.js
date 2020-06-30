import Koa from "koa";
import auth from "./session/auth";
const chalk = require("chalk");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const path = require("path");

global.chalk = chalk;
global.__static = path.resolve(__dirname, "./static/");

const app = new Koa();
const router = new Router();
// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  // console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(bodyParser());
app.use(auth);

const routes = require("./router/index").routes(router);
app.use(routes.routes()).use(routes.allowedMethods());

app.listen(8900, async () => {
  await require("./db/main").main();
  console.log("启动成功");
});
