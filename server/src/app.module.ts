import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ShopInfoModule } from "./modules/shopInfo/shopInfo.module";

@Module({
  imports: [ShopInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
