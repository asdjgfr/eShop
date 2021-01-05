import axios from "axios";
import qs from "qs";
import history from "@/router/history";
import { message } from "antd";
import { sleep } from "@/lib/pubfn";
import store from "@/store";

interface iConfig {
  globalLoading?: boolean;
  globalLoadingTip?: string;
}

const { CancelToken } = axios;

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
    store.globalConfig.toggleLoading(false);
    message.error("网络错误！" + error);
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
      localStorage.removeItem("autoSignIn");
      message.error(data.msg + "2秒后跳转至登录！");
      await sleep(2000);
      history.push("/sign-in");
    } else if (data.code === 500) {
      message.error("服务器错误！请联系管理员解决。");
      history.push("/500");
    }
    return response;
  },
  function (error) {
    if (!error.__CANCEL__) {
      message.error("服务器错误！请联系管理员解决。");
      history.push("/500", {
        error,
      });
    }
    store.globalConfig.toggleLoading(false);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const post = function (
  url: string,
  data?: any,
  config?: iConfig,
  contentType?: "form" | "json"
) {
  const source = CancelToken.source();
  return {
    data: axios
      .post(
        url,
        contentType === "json" ? JSON.stringify(data) : qs.stringify(data),
        {
          headers: {
            "Content-Type":
              contentType === "json"
                ? "application/json"
                : "application/x-www-form-urlencoded",
          },
          cancelToken: source.token,
          ...config,
        }
      )
      .then((res) => res.data),
    cancel: (msg = "") => {
      source.cancel(msg);
    },
  };
};

export const get = function (url: string, data?: any, config?: iConfig) {
  const source = CancelToken.source();
  return {
    data: axios
      .get(url, {
        params: data ?? {},
        cancelToken: source.token,
        ...(config ?? {}),
      })
      .then((res) => res.data),
    cancel: (msg = "") => {
      source.cancel(msg);
    },
  };
};
