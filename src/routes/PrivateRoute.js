import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { authSelectors } from "../state/auth";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated === true ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
			)
		}
	/>
);

const mapStateToProps = createStructuredSelector({
	isAuthenticated: authSelectors.getIsAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
