import { post } from "./index";

export const signIn = function (username: string, password: string) {
  return post(
    "/api/sign-in",
    {
      username,
      password,
    },
    {
      globalLoading: true,
      globalLoadingTip: "正在登录，请稍后...",
    }
  );
};

export const signOut = function () {
  return post("/api/sign-out", "", {
    globalLoading: true,
  });
};

export const getUserInfo = function () {
  return post("/api/get-user-info", "", {
    globalLoading: true,
  });
};

export const checkSignin = function () {
  return post("/api/check-sign-in");
};

export const getUserMenus = function () {
  return post("/api/get-user-menus");
};
