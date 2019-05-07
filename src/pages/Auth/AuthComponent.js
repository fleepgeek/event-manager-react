import React from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./AuthForm/AuthForm";
import "./AuthComponent.scss";

const AuthComponent = props => {
	return (
		<div className="flex-container">
			{props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
			<div className="form-wrapper">
				<AuthForm {...props} />
			</div>
		</div>
	);
};

export default AuthComponent;
