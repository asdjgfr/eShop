import React from "react";
import { Link } from "react-router-dom";
interface iProps {}
interface iState {}
class Feedback extends React.Component<iProps, iState> {
  render() {
    return (
      <div className="login">
        反馈
        <Link to="/login">admin</Link>
      </div>
    );
  }
}

export default Feedback;
