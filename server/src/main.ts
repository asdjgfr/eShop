import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { readFileSync } from "fs-extra";
import { join } from "path";
import * as YAML from "yaml";

// 加载配置文件
const projectConfig = YAML.parse(
  readFileSync(join(__dirname, "..", "config", "project.yml"), "utf8"),
);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(projectConfig.port);
}
bootstrap().then(() => {
  console.log(`服务启动成功：${projectConfig.port}`);
});
