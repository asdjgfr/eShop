import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { projectConfig } from "./common/untils/getConfig";

const { port } = projectConfig.getProjectConfig;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log(`服务启动成功，端口：${port}`);
  })
  .catch((err: Error) => {
    console.log(`服务启动成功失败：${err}`);
  });
