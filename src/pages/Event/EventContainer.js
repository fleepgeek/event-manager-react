import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { eventActions, eventSelectors } from "../../state/event/";
import { authSelectors } from "../../state/auth/";
import { globalSelectors } from "../../state/global/";
import EventComponent from "./EventComponent";

const EventContainer = props => {
	const {
		match,
		event,
		onGetEvent,
		onGetAttendees,
		attendees,
		onAttendEvent,
		onCancelAttendance,
		isAuth,
		isLoading,
		onUnload
	} = props;
	useEffect(() => {
		if (+match.params.id !== event.id) {
			onGetEvent(match.params.id);
			onGetAttendees(match.params.id);
		}
		return () => {
			onUnload();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<EventComponent
				event={event}
				attendees={attendees}
				attendEvent={onAttendEvent}
				cancelAttendance={onCancelAttendance}
				isAuth={isAuth}
				isLoading={isLoading}
			/>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	event: eventSelectors.getById,
	attendees: eventSelectors.getAttendees,
	isAuth: authSelectors.getIsAuthenticated,
	isLoading: globalSelectors.getLoading
});

export default connect(
	mapStateToProps,
	{
		onGetEvent: eventActions.fetchEventById,
		onGetAttendees: eventActions.getAttendees,
		onAttendEvent: eventActions.attendEvent,
		onCancelAttendance: eventActions.cancelAttendance,
		onUnload: eventActions.eventPageUnloaded
	}
)(EventContainer);
