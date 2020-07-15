import Vue from "vue";
import App from "./App.vue";
import ElementUI from "./plugins/element-ui";
import store from "./plugins/vuex";
import echarts from "./plugins/echarts";
import moment from "./plugins/moment";
import math from "./plugins/math";
import router from "./router/router";

import "../public/registerServiceWorker";

Vue.use(ElementUI.ElementUI, { size: "small" });
Vue.config.productionTip = false;
Vue.prototype.$_moment = moment;
Vue.prototype.$_echarts = echarts;
Vue.prototype.$_ = require("lodash");
Vue.prototype.$_math = math;

Vue.prototype.$_localTime = date => {
  return moment(date).format("YYYY年MM月DD日HH:mm:ss");
};

window.globalLoading = ElementUI.Loading;
window.$_vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
