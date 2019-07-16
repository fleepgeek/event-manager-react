import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ProgressBar } from "./components";
import { authActions } from "./state/auth";
import { globalSelectors, globalActions } from "./state/global";
import { AppRouter } from "./routes";

export const App = ({
	history,
	tryAutoLogin,
	loading,
	redirectPath,
	onRedirectCompleted
}) => {
	useEffect(() => {
		tryAutoLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (redirectPath) {
			history.push(redirectPath);
			onRedirectCompleted();
		}
	}, [redirectPath, history, onRedirectCompleted]);

	return (
		<>
			{loading && <ProgressBar />}
			<AppRouter />
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: globalSelectors.getLoading,
	redirectPath: globalSelectors.getRedirectPath
});

export default withRouter(
	connect(
		mapStateToProps,
		{
			tryAutoLogin: authActions.autoLogin,
			onRedirectCompleted: globalActions.redirectCompleted
		}
	)(App)
);
