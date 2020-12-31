import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { readFileSync } from "fs-extra";
import { join } from "path";
import * as YAML from "yaml";

// 加载配置文件
const projectConfig = YAML.parse(
  readFileSync(join(__dirname, "..", "config", "project.yml"), "utf8"),
);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(projectConfig.port);
}

bootstrap()
  .then(() => {
    console.log(`服务启动成功，端口：${projectConfig.port}`);
  })
  .catch((err: Error) => {
    console.log(`服务启动成功失败：${err}`);
  });
