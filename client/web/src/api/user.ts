import { post } from "./index";
import globalApi from "@/api/globalApi";
import store from "@/store";

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

export const getUserMessages = function (data: {
  pageSize: number;
  page?: number;
  getAll?: boolean;
}) {
  return post("/api/get-user-messages", data);
};

export const getMessageByID = function (data: { id: number }) {
  return post("/api/get-message-by-id", data);
};

export const getUnreadMessagesCount = function () {
  return post("/api/get-unread-messages-count");
};

export const getUserMessages10 = async function () {
  globalApi["/api/get-user-messages"]?.cancel();
  const gum = getUserMessages({ pageSize: 10 });
  globalApi["/api/get-user-messages"] = gum;
  const res = await gum.data;
  if (res.code === 200) {
    store.userMessages.setUserMessages(res.messages);
  }
  return res;
};
