import React from "react";
import { Link } from "react-router-dom";
interface iProps {}
interface iState {}
class Admin extends React.Component<iProps, iState> {
  render() {
    return (
      <div className="login">
        管理页
        <Link to="/sign-in">admin</Link>
      </div>
    );
  }
}

export default Admin;
