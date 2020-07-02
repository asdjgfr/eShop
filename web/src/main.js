import Vue from "vue";
import App from "./App.vue";
import ElementUI from "./plugins/element-ui";
import store from "./plugins/vuex";
import router from "./router/router";
import * as math from "mathjs";
import "./registerServiceWorker";
import animated from "animate.css";

const moment = require("moment");
const { labelWidth } = require("@/conf/config.json");

Vue.use(animated);
Vue.use(ElementUI.ElementUI, { size: "small" });
Vue.config.productionTip = false;
Vue.prototype.$_moment = moment;
Vue.prototype.$_ = require("lodash");
Vue.prototype.$_math = math;

Vue.prototype.$_localTime = date => {
  return moment(date).format("YYYY年MM月DD日HH:mm:ss");
};

window.labelWidth = labelWidth;
window.globalLoading = ElementUI.Loading;
window.$_vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
