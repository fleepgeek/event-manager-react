import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { userSelectors, userActions } from "../../state/user";
import { authSelectors } from "../../state/auth";
import { DashboardPageHeader } from "../../components";
import Attending from "./Attending";
import Created from "./Created";

const DashEvents = ({
	match,
	history,
	location,
	uid,
	onGetEvents,
	attending,
	created
}) => {
	useEffect(() => {
		// if (match.path === "/dashboard/events/") {
		if (location.state && location.state.fromDashboard) {
			history.replace(`${match.path}/attending`);
		}
		onGetEvents(uid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// }, [match.path, history]);
	return (
		<>
			<DashboardPageHeader
				pageTitle="Events"
				links={[
					{ text: "Attending", to: `${match.url}/attending` },
					{ text: "My Events", to: `${match.url}/myevents` }
				]}
			/>
			<Switch>
				<Route
					path={`${match.path}/attending`}
					render={() => <Attending events={attending} />}
					exact
				/>
				<Route
					path={`${match.path}/myevents`}
					render={() => <Created events={created} />}
					exact
				/>
			</Switch>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	uid: authSelectors.getUid,
	created: userSelectors.getCreatedEvents,
	attending: userSelectors.getAttendingEvents
});

export default connect(
	mapStateToProps,
	{ onGetEvents: userActions.getEvents }
)(DashEvents);
