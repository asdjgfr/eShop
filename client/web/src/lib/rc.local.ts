import store from "@/store";
import globalApi from "@/api/globalApi";
import { getShopInfo } from "@/api/universal";
import { checkSignin, getUnreadMessagesCount } from "@/api/user";

// 需要初始化执行的内容
const initFn = async function () {
  await syncInit();
  initCheckSigninPolling();
  initGetUserMessageCount();
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

/**
 * @description 轮询获取消息个数，5分钟一次
 * */
let gmcTimer: NodeJS.Timeout;
export const initGetUserMessageCount = async function () {
  if (gmcTimer) {
    clearTimeout(gmcTimer);
  }
  if (localStorage.getItem("Authorization")) {
    const gmc = getUnreadMessagesCount();
    const res = await gmc.data;
    store.userMessages.setUnreadCount(res.code === 200 ? res.count : 0);
  }
  gmcTimer = setTimeout(initGetUserMessageCount, 300000);
};
export default initFn;
