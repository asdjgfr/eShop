import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}sw.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker已被注册。");
    },
    cached() {
      console.log("链接已被缓存。");
    },
    updatefound() {
      console.log("新链接已被下载");
    },
    updated() {
      window.alert("检测到更新，即将刷新页面！");
      window.location.reload();
    },
    offline() {
      console.log("未检测到链接，应用将以离线方式运行。");
    },
    error(error) {
      console.error("service worker注册失败：", error);
    }
  });
} else {
  register("/sw.js", {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker已被注册。");
    },
    cached() {
      console.log("链接已被缓存。");
    },
    updatefound() {
      console.log("新链接已被下载");
    },
    updated() {
      window.alert("检测到更新，即将刷新页面！");
      window.location.reload();
    },
    offline() {
      console.log("未检测到链接，应用将以离线方式运行。");
    },
    error(error) {
      console.error("service worker注册失败：", error);
    }
  });
}
