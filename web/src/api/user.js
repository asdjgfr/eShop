import server from "./service";
const { service } = server;
const login = data =>
  service({
    url: "/api/login",
    method: "post",
    data
  });

const checkLogin = data =>
  service({
    url: "/api/check-login",
    method: "post",
    data
  });

const logout = data =>
  service({
    url: "/api/logout",
    method: "post",
    data
  });

export default { login, checkLogin, logout };
