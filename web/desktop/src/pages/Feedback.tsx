import React from "react";
import { Link } from "react-router-dom";
interface iProps {}
interface iState {}
class Feedback extends React.Component<iProps, iState> {
  render() {
    return (
      <div>
        反馈
        <Link to="/sign-in">admin</Link>
      </div>
    );
  }
}

export default Feedback;
