import { post } from "./index";

export const signIn = function (username: string, password: string) {
  return post("/api/sign-in", {
    username,
    password,
  });
};
export const getUserInfo = function () {
  return post("/api/get-user-info");
};
