import service from "./service";

const login = data =>
  service({
    url: "/api/login",
    method: "post",
    data
  });

export default { login };
