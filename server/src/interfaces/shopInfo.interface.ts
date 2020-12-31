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
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly titleSuffix: string;
  @ApiProperty()
  readonly introduction: string;
}
