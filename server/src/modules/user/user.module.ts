import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { User } from "./user.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [User],
})
export class UserModule {}
