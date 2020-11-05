import axios from "axios";
import qs from "qs";
import history from "@/store/history";
import { message } from "antd";
import { sleep } from "@/lib/pubfn";
import store from "@/store";

axios.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    //config是axios请求的参数
    if (config.globalLoading) {
      // 设置全局的加载
      store.globalConfig.toggleLoading(true);
      // store.globalConfig.setLoadingTip(config.globalLoadingTip ?? "");
    }
    const Authorization = localStorage.getItem("Authorization");
    if (Authorization) {
      config.headers.Authorization = Authorization;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    // 对响应数据做点什么
    // response 是请求回来的数据
    store.globalConfig.toggleLoading(false);
    const { data } = response;
    if (data.code === 401) {
      localStorage.removeItem("Authorization");
      message.error(data.msg + "2秒后跳转至登录！");
      await sleep(2000);
      history.push("/sign-in");
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const post = function (url: string, data?: any, config?: {}) {
  return axios
    .post(url, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      ...config,
    })
    .then((res) => res.data);
};
