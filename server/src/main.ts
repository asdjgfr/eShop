import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { projectConfig } from "./common/untils/getConfig";

const { port } = projectConfig.getProjectConfig;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 注册文档
  const options = new DocumentBuilder()
    .setTitle("API 文档")
    .setDescription("API 文档")
    .setVersion("1.0")
    .addTag("api")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-doc", app, document);

  await app.listen(port);
}

bootstrap()
  .then(() => {
    console.log(`服务启动成功，端口：${port}`);
  })
  .catch((err: Error) => {
    console.log(`服务启动成功失败：${err}`);
  });
