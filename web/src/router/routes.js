import Login from "../pages/Login";
import Main from "../components/Main";
import NotFound from "../components/NotFound";
import Dashboard from "../pages/Dashboard";
import CustomerManagement from "../pages/CustomerManagement";
import CustomerReception from "../pages/CustomerReception";
import FinancialManagement from "../pages/FinancialManagement";
import InventoryManagement from "../pages/InventoryManagement";
import MaintenanceManagement from "../pages/MaintenanceManagement";

export const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Main },
  {
    path: "/dashboard",
    component: Dashboard,
    redirect: "/dashboard/customerreception",
    children: [
      {
        path: "customerreception",
        component: CustomerReception,
        title: "客户接待",
        icon: "fa fa-user-tie",
      },
      {
        path: "inventorymanagement",
        component: InventoryManagement,
        title: "库存管理",
        icon: "fa fa-warehouse",
      },
      {
        path: "maintenancemanagement",
        component: MaintenanceManagement,
        title: "维修管理",
        icon: "fa fa-tools",
      },
      {
        path: "customermanagement",
        component: CustomerManagement,
        title: "客户管理",
        icon: "fa fa-user-tag",
      },
      {
        path: "financialmanagement",
        component: FinancialManagement,
        title: "财务管理",
        icon: "fa fa-money-check-alt",
      },
    ],
  },
  { path: "/404", component: NotFound },
  {
    // 会匹配所有路径
    path: "*",
    redirect: "/404",
  },
];
