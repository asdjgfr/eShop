import { ApiProperty } from "@nestjs/swagger";

export interface ShopInfoRes {
  // 标题
  title: string;
  // 子标题
  titleSuffix: string;
  // 介绍
  introduction: string;
}
export class ShopInfoResSwagger {
  @ApiProperty({
    description: "商店标题",
    default: "",
  })
  readonly title: string;
  @ApiProperty({
    description: "商店子标题",
    default: "",
  })
  readonly titleSuffix: string;
  @ApiProperty({
    description: "商店简介",
    default: "",
  })
  readonly introduction: string;
}
