import { Module } from "@nestjs/common";
import { ShopInfoController } from "./shopInfo.controller";
import { ShopInfoService } from "./shopInfo.service";

@Module({
  imports: [],
  controllers: [ShopInfoController],
  providers: [ShopInfoService],
})
export class ShopInfoModule {}
