import { post } from "./index";

export const signIn = function (username: string, password: string) {
  return post("/api/sign-in", {
    username,
    password,
  });
};
