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

export default { login, checkLogin };
