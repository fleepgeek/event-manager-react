import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as authActions from "../../state/auth/actions";

const Logout = props => {
	useEffect(() => {
		props.onLogout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(authActions.logout())
});

export default connect(
	null,
	mapDispatchToProps
)(Logout);
