import React from "react";
import { Link } from "react-router-dom";
interface iProps {}
interface iState {}
class Login extends React.Component<iProps, iState> {
  render() {
    return (
      <div className="login">
        登录
        <Link to="/admin">admin</Link>
      </div>
    );
  }
}

export default Login;
