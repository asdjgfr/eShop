import store from "@/store";
import globalApi from "@/api/globalApi";
import { getShopInfo } from "@/api/universal";
import { checkSignin, getUserMessages } from "@/api/user";

// 需要初始化执行的内容
const initFn = async function () {
  await syncInit();
  initCheckSigninPolling();
  initGetUserMessage();
};

async function syncInit() {
  await initShopInfo();
}

/**
 * @description 初始化店铺的信息
 * */
async function initShopInfo() {
  const gsi = getShopInfo();
  const res = await gsi.data;
  store.shopInfo.setShopInfo({
    title: res.data.name,
    titleSuffix: res.data.suffix,
    introduction: res.data.introduction,
  });
}

/**
 * @description 轮询检测是否登录，5分钟一次
 * */
function initCheckSigninPolling() {
  if (localStorage.getItem("Authorization")) {
    globalApi["/api/check-sign-in"]?.cancel();
    globalApi["/api/check-sign-in"] = checkSignin();
  }
  setTimeout(initCheckSigninPolling, 300000);
}

export const getUserMessages10 = async function () {
  globalApi["/api/get-user-messages"]?.cancel();
  const gum = getUserMessages({ limit: 10 });
  globalApi["/api/get-user-messages"] = gum;
  const res = await gum.data;
  if (res.code === 200) {
    store.userMessages.setUserMessages(res.messages);
  }
  return res;
};

/**
 * @description 轮询获取消息，5分钟一次
 * */
async function initGetUserMessage() {
  if (localStorage.getItem("Authorization")) {
    await getUserMessages10();
  }
  setTimeout(initGetUserMessage, 300000);
}
export default initFn;
