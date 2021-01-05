import { ApiProperty } from "@nestjs/swagger";

export interface UserSignInRes {
  token: string;
  success: boolean;
  username: string;
}
export class UserSignInResSwagger {
  @ApiProperty({
    description: "登录成功返回用户的token，失败为空",
    default: "",
  })
  readonly token: string;
  @ApiProperty({
    description: "是否登录成功",
    default: false,
  })
  readonly success: boolean;
  @ApiProperty({
    description: "用户名",
    default: "登录时的用户名",
  })
  readonly username: string;
}
