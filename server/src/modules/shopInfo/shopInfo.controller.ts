import { Controller, Get } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ShopInfoService } from "./shopInfo.service";
import {
  ShopInfoRes,
  ShopInfoResSwagger,
} from "../../interfaces/shopInfo.interface";

@ApiTags("店铺信息")
@Controller("/info/get-shop-info")
export class ShopInfoController {
  constructor(private readonly ShopInfoService: ShopInfoService) {}

  @Get()
  @ApiCreatedResponse({
    description: "返回商店信息",
    type: ShopInfoResSwagger,
  })
  getShopInfo(): ShopInfoRes {
    return this.ShopInfoService.getShopInfo();
  }
}
