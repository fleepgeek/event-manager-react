import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { authSelectors } from "../../state/auth";
import { eventsListSelectors, eventsListActions } from "../../state/eventsList";
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
		// if (location.state && location.state.fromDashboard) {
		if (match.path === "/dashboard/events") {
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
			<Route
				path={`${match.path}/attending`}
				render={() => <Attending events={attending} />}
			/>
			<Route
				path={`${match.path}/myevents`}
				render={() => <Created events={created} />}
			/>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	uid: authSelectors.getUid,
	created: eventsListSelectors.getUserCreatedEvents,
	attending: eventsListSelectors.getUserAttendingEvents
});

export default connect(
	mapStateToProps,
	{ onGetEvents: eventsListActions.getUserEvents }
)(DashEvents);
