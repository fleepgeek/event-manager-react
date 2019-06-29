import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { DashboardPageHeader } from "../../components";
import Profile from "./Profile";
import Account from "./Account";
import { userSelectors } from "../../state/user";
import { authSelectors } from "../../state/auth";

const Settings = ({
	match,
	history,
	onGetProfile,
	onGetEvents,
	uid,
	currentUser,
	created,
	attending
}) => {
	useEffect(() => {
		// if (match.path === "/dashboard/settings") {
		// 	history.replace(`${match.path}/profile`);
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<DashboardPageHeader
				pageTitle="Settings"
				links={[
					{ text: "Profile", to: `${match.url}/profile` },
					{ text: "Account", to: `${match.url}/account` }
				]}
			/>
			<Switch>
				<Route path={`${match.path}/account`} component={Account} exact />
				<Route
					path={`${match.path}/profile`}
					render={props => <Profile profile={currentUser} {...props} />}
					exact
				/>
			</Switch>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	uid: authSelectors.getUid,
	currentUser: userSelectors.getCurrentUser
});

export default connect(mapStateToProps)(Settings);
