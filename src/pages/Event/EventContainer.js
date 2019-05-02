import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as eventActions } from "../../state/event";
import EventComponent from "./EventComponent";

const EventContainer = props => {
	const { match, event, onGetEvent, loading, onAttendEvent } = props;

	useEffect(() => {
		if (+match.params.id !== event.id) {
			onGetEvent(match.params.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<EventComponent
			event={event}
			loading={loading}
			attendEvent={onAttendEvent}
		/>
	);
};

const mapStateToProps = state => ({
	event: state.event.event,
	loading: state.event.loading
});

const mapDispatchToProps = dispatch => ({
	onGetEvent: id => dispatch(eventActions.getEvent(id)),
	onAttendEvent: id => dispatch(eventActions.attendEvent(id))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventContainer);
