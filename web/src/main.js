import Vue from "vue";
import App from "./App.vue";
import ElementUI from "./plugins/element-ui";
import store from "./plugins/vuex";
import router from "./router/router";
import "./registerServiceWorker";
import animated from "animate.css";
import moment from "moment";

Vue.use(animated);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$_moment = moment;

window.$_vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
