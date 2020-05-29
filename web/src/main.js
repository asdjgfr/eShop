import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import "./registerServiceWorker";
import animated from "animate.css";
import moment from "moment";

Vue.use(animated);
Vue.config.productionTip = false;
Vue.prototype.$_moment = moment;
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
