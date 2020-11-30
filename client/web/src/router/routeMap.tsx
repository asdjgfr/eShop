import React from "react";
import { lazy } from "react";
import Error from "@/pages/Error";
import { Redirect } from "react-router-dom";

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
const Layout = lazy(() => import("@/components/Layout"));
const Analysis = lazy(() => import("@/pages/Analysis"));
const UserCenter = lazy(() => import("@/pages/User/Center"));
const OrderManagement = lazy(() => import("@/pages/OrderManagement"));
const InventoryManagement = lazy(() => import("@/pages/InventoryManagement"));

export const mainRoutes: any[] = [
  {
    title: "首页",
    path: "/",
    name: "Main",
    component: Main,
    exact: true,
  },
  {
    title: "登录",
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
    exact: true,
  },
  {
    title: "注册",
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
    exact: true,
  },
  {
    title: "面板",
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    routes: [
      {
        path: "/dashboard/analysis",
        name: "Analysis",
        component: Analysis,
        auth: true,
        exact: true,
      },
      {
        path: "/dashboard/order-management",
        name: "OrderManagement",
        component: OrderManagement,
        auth: true,
        exact: true,
      },
      {
        path: "/dashboard/inventory-management",
        name: "InventoryManagement",
        component: InventoryManagement,
        auth: true,
        exact: true,
      },
      {
        path: "/dashboard/settings",
        name: "Settings",
        component: Settings,
        auth: true,
        exact: true,
      },
      {
        path: "/dashboard/center",
        name: "Center",
        component: UserCenter,
        auth: true,
        exact: true,
      },
      {
        title: "404",
        path: "*",
        name: "404",
        render: () => <Redirect push to="/dashboard/analysis" />,
      },
    ],
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
  {
    title: "404",
    path: "*",
    name: "404",
    render: () => <Redirect push to="/404" />,
  },
];

export const flatRoutes = function (routes: any[], res: any[] = []) {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    res.push(route);
    if (Array.isArray(route.routes) && route.routes.length) {
      flatRoutes(route.routes, res);
    }
  }
  return res;
};
