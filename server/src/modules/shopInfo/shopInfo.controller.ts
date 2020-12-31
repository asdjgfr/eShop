import { Controller, Get } from "@nestjs/common";
import { ShopInfoService } from "./shopInfo.service";
import { ShopInfoRes } from "../../interfaces/shopInfo.interface";

@Controller("/info/get-shop-info")
export class ShopInfoController {
  constructor(private readonly ShopInfoService: ShopInfoService) {}

  @Get()
  getShopInfo(): ShopInfoRes {
    return this.ShopInfoService.getShopInfo();
  }
}
