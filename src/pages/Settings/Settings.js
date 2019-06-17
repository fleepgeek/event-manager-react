import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { DashboardPageHeader } from "../../components";
import Profile from "./Profile";
import { userSelectors } from "../../state/user";
import { authSelectors } from "../../state/auth";
import { eventsListSelectors, eventsListActions } from "../../state/eventsList";

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
		if (match.path === "/dashboard/settings") {
			history.replace(`${match.path}/profile`);
		}
		onGetEvents(uid);
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
				<Route
					path={`${match.path}/account`}
					render={() => <h2>Account</h2>}
					exact
				/>
				<Route
					path={`${match.path}/profile`}
					render={() => (
						<Profile profile={currentUser} events={{ created, attending }} />
					)}
					exact
				/>
			</Switch>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	uid: authSelectors.getUid,
	currentUser: userSelectors.getCurrentUser,
	created: eventsListSelectors.getUserCreatedEvents,
	attending: eventsListSelectors.getUserAttendingEvents
});

export default connect(
	mapStateToProps,
	{
		onGetEvents: eventsListActions.getUserEvents
	}
)(Settings);
