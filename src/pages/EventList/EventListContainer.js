import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { eventActions, eventSelectors } from "../../state/event/";
import EventListComponent from "./EventListComponent";

const EventListContainer = props => {
	const { onfetchEvents, events, loading } = props;
	useEffect(() => {
		onfetchEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <EventListComponent events={events} loading={loading} />;
};

const mapStateToProps = createStructuredSelector({
	events: eventSelectors.getAll,
	loading: eventSelectors.getLoading
});

const mapDispatchToProps = dispatch => ({
	// onGetEvents: () => dispatch(Actions.Creators.start()),
	onfetchEvents: () => dispatch(eventActions.fetchAllEvents())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventListContainer);
