import { Injectable } from "@nestjs/common";
import { UserSignInRes } from "../../interfaces/user.interface";

@Injectable()
export class User {
  userSignIn(): UserSignInRes {
    return {
      token: "123",
      success: true,
      username: "asd",
    };
  }
}
