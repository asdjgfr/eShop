import { Injectable } from "@nestjs/common";
import { ShopInfoRes } from "../../interfaces/shopInfo.interface";
import { projectConfig } from "../../common/untils/getConfig";

@Injectable()
export class ShopInfoService {
  getShopInfo(): ShopInfoRes {
    const { shopInfo } = projectConfig.getProjectConfig;
    return {
      title: shopInfo.title,
      titleSuffix: shopInfo.titleSuffix,
      introduction: shopInfo.introduction,
    };
  }
}
