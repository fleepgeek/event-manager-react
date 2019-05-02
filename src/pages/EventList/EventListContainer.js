import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as eventActions } from "../../state/eventList";
import EventListComponent from "./EventListComponent";

const EventListContainer = props => {
	const { onfetchEvents, events, loading } = props;
	useEffect(() => {
		onfetchEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <EventListComponent events={events} loading={loading} />;
};

const mapStateToProps = state => ({
	// events: state.events,
	events: state.eventList.events,
	loading: state.eventList.loading
});

const mapDispatchToProps = dispatch => ({
	// onGetEvents: () => dispatch(Actions.Creators.start()),
	onfetchEvents: () => dispatch(eventActions.fetchEvents())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventListContainer);
