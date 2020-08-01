import axios from "axios";
import qs from "qs";
import router from "@/router/router";
import { Message } from "element-ui";
import { getType } from "@/lib/pubfn";
const CancelToken = axios.CancelToken;
const service = axios.create({
  timeout: 5000 // 请求超时时间
});
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
  config => {
    config.method === "post"
      ? (config.data = qs.stringify({
          ...config.data,
          session: localStorage.getItem("session") ?? "",
          deviceID: localStorage.getItem("deviceID") ?? ""
        }))
      : (config.params = {
          ...config.params,
          session: localStorage.getItem("session") ?? "",
          deviceID: localStorage.getItem("deviceID") ?? ""
        });
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    return config;
  },
  error => {
    //请求错误处理
    Message({
      message: "网络错误！",
      type: "error"
    });
    Promise.reject(error);
  }
);
/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  async response => {
    //成功请求到数据
    window.globalLoading.close();
    //这里根据后端提供的数据进行对应的处理
    if (response.data.code === 401) {
      // 登录失效
      try {
        await router.replace("/login");
      } catch (e) {
        console.warn(e);
      }
    }
    if (response.data.code === 401 && router.app.$route.path === "/login") {
      console.warn("登录失效！");
    } else if (
      getType(response.data) === "object" &&
      response.data.code !== 0
    ) {
      Message({
        message: response.data.msg,
        type: "error"
      });
    }
    window.globalLoading.close();
    return response.data;
  },
  error => {
    //响应错误处理
    console.warn(JSON.stringify(error));
    window.globalLoading.close();
    if (error.message !== "cancelByUser") {
      Message({
        message: error.message ?? "网络异常，请重试！",
        type: "error"
      });
    }
    return Promise.reject(error);
  }
);

export default { service, CancelToken };
