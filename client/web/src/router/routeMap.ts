import { lazy } from "react";

const Main = lazy(() => import("@/pages/Main"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Settings = lazy(() => import("@/pages/Settings"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const ShopList = lazy(() => import("@/pages/ShopList"));
const Layout = lazy(() => import("@/components/Layout"));

export default [
  { title: "首页", path: "/", name: "Main", component: Main, exact: true },
  { title: "登录", path: "/sign-in", name: "SignIn", component: SignIn },
  { title: "注册", path: "/sign-up", name: "SignUp", component: SignUp },
  {
    title: "面板",
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    children: [
      {
        title: "设置",
        path: "/settings",
        name: "Settings",
        component: Settings,
        auth: true,
      },
    ],
  },
  { title: "反馈", path: "/feedback", name: "Feedback", component: Feedback },
  {
    title: "列表",
    path: "/shop/shop-list",
    name: "ShopList",
    component: ShopList,
    auth: true,
  },
  { title: "404", path: "/404", name: "404", errorCode: 404 },
  { title: "403", path: "/403", name: "403", errorCode: 403 },
  { title: "500", path: "/500", name: "500", errorCode: 500, auth: true },
];
