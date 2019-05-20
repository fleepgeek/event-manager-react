import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { eventActions, eventSelectors } from "../../state/event/";
import EventComponent from "./EventComponent";

const EventContainer = props => {
	const { match, event, onGetEvent } = props;
	useEffect(() => {
		if (+match.params.id !== event.id) {
			onGetEvent(match.params.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<EventComponent
				event={event}
				// attendEvent={onAttendEvent}
			/>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	event: eventSelectors.getById
});

const mapDispatchToProps = dispatch => ({
	onGetEvent: id => dispatch(eventActions.fetchEventById(id))
	// onAttendEvent: id => dispatch(eventActions.attendEvent(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventContainer);
