const Koa = require("koa");
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(ctx.request.headers["X-Real-IP"]);
  console.log(ctx.request.headers["X-Forwarded-For"]);
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx) => {
  console.log(ctx.url);
  console.log(await require("./db/user").userLogin("admin", "123456"));
});

app.listen(8900, () => {
  console.log("启动成功");
});
