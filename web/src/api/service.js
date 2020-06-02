import axios from "axios";
import qs from "qs";
import store from "../plugins/vuex";
import router from "@/router/router";

const service = axios.create({
  timeout: 5000 // 请求超时时间
});
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
  config => {
    store.commit("toggleGlobalLoading", { show: true });
    config.method === "post"
      ? (config.data = qs.stringify({
          session: sessionStorage.getItem("session") ?? "",
          ...config.data
        }))
      : (config.params = {
          session: sessionStorage.getItem("session") ?? "",
          ...config.params
        });
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
  },
  error => {
    //请求错误处理
    store.commit("toggleGlobalToast", { show: true, text: "网络错误！" });
    Promise.reject(error);
  }
);
/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  async response => {
    //成功请求到数据
    store.commit("toggleGlobalLoading", { show: false });
    //这里根据后端提供的数据进行对应的处理
    if (response.data.code === 401) {
      await router.push("/login");
    }
    if (response.data.code !== 0) {
      store.commit("toggleGlobalToast", {
        show: true,
        text: response.data.msg
      });
    }
    return response.data;
  },
  error => {
    //响应错误处理
    console.log(JSON.stringify(error));
    store.commit("toggleGlobalLoading", { show: false });
    store.commit("toggleGlobalToast", {
      show: true,
      text: error.message ?? "网络异常，请重试！"
    });
    return Promise.reject(error);
  }
);

export default service;
