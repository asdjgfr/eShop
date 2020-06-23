import axios from "axios";
import qs from "qs";
import router from "@/router/router";
import { Message, Loading } from "element-ui";
// eslint-disable-next-line no-unused-vars
let loading = null;
const service = axios.create({
  timeout: 5000 // 请求超时时间
});
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
  config => {
    loading = Loading.service({ fullscreen: true, lock: true });
    config.method === "post"
      ? (config.data = qs.stringify({
          session: localStorage.getItem("session") ?? "",
          ...config.data
        }))
      : (config.params = {
          session: localStorage.getItem("session") ?? "",
          ...config.params
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
    loading && loading.close();
    //这里根据后端提供的数据进行对应的处理
    if (response.data.code === 401) {
      // 登陆失效
      try {
        await router.replace("/login");
      } catch (e) {
        console.warn(e);
      }
    }
    if (response.data.code !== 0) {
      Message({
        message: response.data.msg,
        type: "error"
      });
    }
    return response.data;
  },
  error => {
    //响应错误处理
    console.log(JSON.stringify(error));
    loading && loading.close();
    Message({
      message: error.message ?? "网络异常，请重试！",
      type: "error"
    });
    return Promise.reject(error);
  }
);

export default service;
