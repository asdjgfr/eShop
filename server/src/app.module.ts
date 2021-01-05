import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ShopInfoModule } from "./modules/shopInfo/shopInfo.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [ShopInfoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
