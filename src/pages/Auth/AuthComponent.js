import React from "react";
import AuthForm from "./AuthForm/AuthForm";
import "./AuthComponent.scss";

const AuthComponent = props => {
  return (
    <div className="flex-container">
      {/* <div className="content"> */}
        <div className="form-wrapper">
          <h1>{props.isLogin ? "Login" : "Sign Up"}</h1>
          <AuthForm {...props} />
        </div>
      {/* </div> */}
    </div>
  );
};

export default AuthComponent;
