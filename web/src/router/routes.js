import Login from "../pages/Login";
import Main from "../components/Main";
import NotFound from "../components/NotFound";
import Dashboard from "../pages/Dashboard";
import CustomerManagement from "../pages/CustomerManagement";
import CustomerReception from "../pages/CustomerReception";
import FinancialManagement from "../pages/FinancialManagement";
import InventoryManagement from "../pages/InventoryManagement";
import MaintenanceManagement from "../pages/MaintenanceManagement";
import PrintBill from "@/pages/PrintBill";

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
        icon: "el-icon-s-custom"
      },
      {
        path: "inventorymanagement",
        component: InventoryManagement,
        title: "库存管理",
        icon: "el-icon-s-home"
      },
      {
        path: "maintenancemanagement",
        component: MaintenanceManagement,
        title: "维修管理",
        icon: "el-icon-setting"
      },
      {
        path: "customermanagement",
        component: CustomerManagement,
        title: "客户管理",
        icon: "el-icon-user"
      },
      {
        path: "financialmanagement",
        component: FinancialManagement,
        title: "财务管理",
        icon: "el-icon-money"
      }
    ]
  },
  { path: "/print-bill", component: PrintBill },
  { path: "/404", component: NotFound },
  {
    // 会匹配所有路径
    path: "*",
    redirect: "/404"
  }
];
