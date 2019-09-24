import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { DashPageHeader } from "../../components";
import { userSelectors } from "../../state/user";
import { authSelectors } from "../../state/auth";

const Profile = React.lazy(() => import("./Profile"));
const Account = React.lazy(() => import("./Account"));

const Settings = ({
	match,
	history,
	location,
	onGetProfile,
	onGetEvents,
	uid,
	currentUser,
	created,
	attending
}) => {
	useEffect(() => {
		if (location.pathname === "/dashboard/settings") {
			history.replace(`${match.path}/profile`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<DashPageHeader
				pageTitle="Settings"
				links={[
					{ text: "Profile", to: `${match.url}/profile` },
					{ text: "Account", to: `${match.url}/account` }
				]}
			/>
			<React.Suspense
				fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}
			>
				<Switch>
					<Route
						path={`${match.path}/profile`}
						render={props => <Profile profile={currentUser} {...props} />}
						exact
					/>
					<Route path={`${match.path}/account`} component={Account} exact />
				</Switch>
			</React.Suspense>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	uid: authSelectors.getUid,
	currentUser: userSelectors.getCurrentUser
});

export default connect(mapStateToProps)(Settings);
