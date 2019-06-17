import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ProgressBar } from "./components";
import { authActions } from "./state/auth";
import { globalSelectors } from "./state/global";
import { AppRouter } from "./routes";

const App = ({ tryAutoLogin, loading, isAuth, onGetCurrentUser }) => {
	useEffect(() => {
		tryAutoLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{loading && <ProgressBar />}
			<AppRouter />
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: globalSelectors.getLoading
});

export default withRouter(
	connect(
		mapStateToProps,
		{ tryAutoLogin: authActions.autoLogin }
	)(App)
);
