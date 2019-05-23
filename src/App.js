import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ProgressBar } from "./components";
import { authActions } from "./state/auth";
import { globalSelectors } from "./state/global";
import { AppRouter } from "./routes";

const App = props => {
	useEffect(() => {
		props.tryAutoLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{props.loading && <ProgressBar />}
			<AppRouter />
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: globalSelectors.getLoading
});

const mapDispatchToProps = dispatch => ({
	tryAutoLogin: () => dispatch(authActions.autoLogin())
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
