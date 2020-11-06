import React from "react";
import { lazy } from "react";
import Error from "@/pages/Error";

export interface RouteType {
  // 标题
  title: string;
  // 路径
  path: string;
  // 名称，会作为key值
  name: string;
  // 组件
  component?: React.LazyExoticComponent<any>;
  // 精确匹配,默认undefined
  exact?: boolean;
  // 是否需要验证
  auth?: boolean;
  // 错误代码，用于403 404 500的页面
  errorCode?: number;
  // 子路由
  routes?: RouteType[];
  // 转发
  redirect?: string;
}

const Main = lazy(() => import("@/pages/Main"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Settings = lazy(() => import("@/pages/Settings"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const ShopList = lazy(() => import("@/pages/ShopList"));
const Layout = lazy(() => import("@/components/Layout"));

const routes: any[] = [
  { title: "首页", path: "/", name: "Main", component: Main, exact: true },
  { title: "登录", path: "/sign-in", name: "SignIn", component: SignIn },
  { title: "注册", path: "/sign-up", name: "SignUp", component: SignUp },
  {
    title: "面板",
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    exact: true,
    redirect: "/dashboard/settings",
    routes: [
      {
        title: "设置",
        path: "/dashboard/settings",
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
  {
    title: "403",
    path: "/403",
    name: "403",
    render: () => <Error errorCode={403} />,
  },
  {
    title: "404",
    path: "/404",
    name: "404",
    render: () => <Error errorCode={404} />,
  },
  {
    title: "500",
    path: "/500",
    name: "500",
    render: () => <Error errorCode={500} />,
  },
];

export default routes;
