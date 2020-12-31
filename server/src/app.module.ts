import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { ShopInfoController } from "./modules/shopInfo/shopInfo.controller";
// import { ShopInfoService } from "./modules/shopInfo/shopInfo.service";
import { ShopInfoModule } from "./modules/shopInfo/shopInfo.module";

@Module({
  imports: [ShopInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
