import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { authSelectors } from "../../state/auth";
import { globalSelectors } from "../../state/global";
import { eventsListSelectors, eventsListActions } from "../../state/eventsList";
import { DashPageHeader } from "../../components";

const Created = React.lazy(() => import("./Created"));
const Attending = React.lazy(() => import("./Attending"));
const SaveEvent = React.lazy(() => import("../../pages/SaveEvent/SaveEvent"));

const DashEvents = ({
	match,
	history,
	location,
	uid,
	onGetEvents,
	attending,
	created,
	onDeleteEvent,
	isLoading
}) => {
	useEffect(() => {
		onGetEvents(uid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (location.pathname === "/dashboard/events") {
			history.replace(`${match.path}/myevents`);
		}
	}, [location.pathname, history, match.path, onGetEvents, uid]);

	return (
		<>
			<DashPageHeader
				pageTitle="Events"
				links={[
					{ text: "My Events", to: `${match.url}/myevents` },
					{ text: "Attending", to: `${match.url}/attending` }
				]}
			/>
			<React.Suspense
				fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}
			>
				<Route
					path={`${match.path}/myevents`}
					render={props => (
						<Created
							events={created}
							deleteEvent={onDeleteEvent}
							isLoading={isLoading}
							{...props}
						/>
					)}
				/>
				<Route
					path={`${match.path}/attending`}
					render={props => <Attending events={attending} {...props} />}
				/>
				<Route path={`${match.path}/:id/edit`} component={SaveEvent} />
			</React.Suspense>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	uid: authSelectors.getUid,
	created: eventsListSelectors.getUserCreatedEvents,
	attending: eventsListSelectors.getUserAttendingEvents,
	isLoading: globalSelectors.getLoading
});

export default connect(
	mapStateToProps,
	{
		onGetEvents: eventsListActions.getUserEvents,
		onDeleteEvent: eventsListActions.deleteEvent
	}
)(DashEvents);
