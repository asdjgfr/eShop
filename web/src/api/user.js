import service from "./service";

const login = data =>
  service({
    url: "/api/login",
    method: "post",
    data
  });

const checkLogin = data =>
  service({
    url: "/api/checklogin",
    method: "post",
    data
  });

const logout = data =>
  service({
    url: "/api/logout",
    method: "post",
    data
  });

export default { login, checkLogin, logout, a: "5454" };
