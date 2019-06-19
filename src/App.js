import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ProgressBar, Backdrop } from "./components";
import { authActions } from "./state/auth";
import { globalActions, globalSelectors } from "./state/global";
import { AppRouter } from "./routes";

const App = ({
	tryAutoLogin,
	loading,
	isAuth,
	onGetCurrentUser,
	isModalOpen,
	hideModal
}) => {
	useEffect(() => {
		tryAutoLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{/* <Backdrop show={isModalOpen} onClick={() => hideModal()} /> */}
			{loading && <ProgressBar />}
			<AppRouter />
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: globalSelectors.getLoading,
	isModalOpen: globalSelectors.getModalOpen
});

export default withRouter(
	connect(
		mapStateToProps,
		{ tryAutoLogin: authActions.autoLogin, hideModal: globalActions.hideModal }
	)(App)
);
