import Vue from "vue";
import App from "./App.vue";
import ElementUI from "./plugins/element-ui";
import store from "./plugins/vuex";
import router from "./router/router";
import * as math from "mathjs";
import "./registerServiceWorker";
import animated from "animate.css";
const { labelWidth } = require("@/conf/config.json");

Vue.use(animated);
Vue.use(ElementUI.ElementUI, { size: "small" });
Vue.config.productionTip = false;
Vue.prototype.$_moment = require("moment");
Vue.prototype.$_ = require("lodash");
Vue.prototype.$_math = math;
window.labelWidth = labelWidth;
window.globalLoading = ElementUI.Loading;
window.$_vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
