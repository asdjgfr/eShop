const Login = () => import("@/pages/Login");
const NotFound = () => import("@/components/NotFound");
const Dashboard = () => import("@/pages/Dashboard");
const CustomerManagement = () => import("@/pages/CustomerManagement");
const CustomerReception = () => import("@/pages/CustomerReception");
const FinancialManagement = () => import("@/pages/FinancialManagement");
const InventoryManagement = () => import("@/pages/InventoryManagement");
const MaintenanceManagement = () => import("@/pages/MaintenanceManagement");
const UserSettings = () => import("@/pages/UserSettings");
const PrintBill = () => import("@/pages/PrintBill");

export const routes = [
  { path: "/login", component: Login, meta: { title: "登录" } },
  { path: "/", redirect: "/dashboard/customer-reception" },
  {
    path: "/dashboard",
    component: Dashboard,
    redirect: "/dashboard/customer-reception",
    children: [
      {
        path: "customer-reception",
        component: CustomerReception,
        meta: { title: "客户接待" },
        icon: "el-icon-s-custom"
      },
      {
        path: "inventory-management",
        component: InventoryManagement,
        meta: { title: "库存管理" },
        icon: "el-icon-s-home"
      },
      {
        path: "maintenance-management",
        component: MaintenanceManagement,
        meta: { title: "维修管理" },
        icon: "el-icon-setting"
      },
      {
        path: "customer-management",
        component: CustomerManagement,
        meta: { title: "客户管理" },
        icon: "el-icon-user"
      },
      {
        path: "financial-management",
        component: FinancialManagement,
        meta: { title: "财务管理" },
        icon: "el-icon-money"
      },
      {
        path: "/user/settings",
        component: UserSettings,
        meta: { title: "用户设置" },
        showInNavigation: false
      }
    ]
  },
  { path: "/print-bill", component: PrintBill, meta: { title: "打印工单" } },
  { path: "/404", component: NotFound, meta: { title: "404页面未找到" } },
  {
    // 会匹配所有路径
    path: "*",
    redirect: "/404"
  }
];
