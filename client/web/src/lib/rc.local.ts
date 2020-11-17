import store from "@/store";
import globalApi from "@/api/globalApi";
import { getShopInfo } from "@/api/universal";
import { checkSignin } from "@/api/user";

// 需要初始化执行的内容
const initFn = async function () {
  syncInit();
  initCheckSigninPolling();
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
  setInterval(() => {
    if (localStorage.getItem("Authorization")) {
      globalApi["/api/check-sign-in"]?.cancel();
      globalApi["/api/check-sign-in"] = checkSignin();
    }
  }, 300000);
}
export default initFn;
