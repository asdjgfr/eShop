import { Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.service";
import {
  UserSignInRes,
  UserSignInResSwagger,
} from "../../interfaces/user.interface";

@ApiTags("用户")
@Controller("/api/user")
export class UserController {
  constructor(private readonly User: User) {}

  @Post("sign-in")
  @ApiCreatedResponse({
    description: "返回用户登录信息",
    type: UserSignInResSwagger,
  })
  signIn(): UserSignInRes {
    return this.User.userSignIn();
  }
}
