import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import titles from "@/router/titles";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
  {
    // 会匹配所有路径
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.afterEach((to) => {
  window.document.title = titles[to.name ?? "index"] ?? titles.index;
});

export default router;
