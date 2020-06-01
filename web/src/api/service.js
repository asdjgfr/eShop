import axios from "axios";
// import qs from "qs";
import store from "../plugins/vuex";

const service = axios.create({
  timeout: 5000 // 请求超时时间
});
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
  config => {
    console.log(config.data);
    store.commit("toggleGlobalLoading", { show: true });
    config.method === "post"
      ? (config.data = { ...config.data })
      : (config.params = { ...config.params });
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
  response => {
    //成功请求到数据
    store.commit("toggleGlobalLoading", { show: false });
    //这里根据后端提供的数据进行对应的处理
    if (response.data.code === 0) {
      return response.data;
    } else {
      store.commit("toggleGlobalToast", {
        show: true,
        text: response.data.msg
      });
      return "fail";
    }
  },
  error => {
    //响应错误处理
    console.log("error");
    console.log(error);
    console.log(JSON.stringify(error));
    let text =
      JSON.parse(JSON.stringify(error)).response.status === 404
        ? "404"
        : "网络异常，请重试";
    store.commit("toggleGlobalToast", { show: true, text });
    return Promise.reject(error);
  }
);

export default service;
