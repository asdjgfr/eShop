import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/Main";
import NotFound from "../components/NotFound";

Vue.use(VueRouter);
export const routes = [
  { path: "/", component: Main },
  { path: "/404", component: NotFound },
  {
    // 会匹配所有路径
    path: "*",
    redirect: "/404",
  },
];

export default new VueRouter({ routes });
