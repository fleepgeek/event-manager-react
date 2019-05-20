import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { eventActions, eventSelectors } from "../../state/event/";
import EventListComponent from "./EventListComponent";

const EventListContainer = props => {
	const { onfetchEvents, events } = props;
	useEffect(() => {
		onfetchEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <EventListComponent events={events} />;
};

const mapStateToProps = createStructuredSelector({
	events: eventSelectors.getAll
});

const mapDispatchToProps = dispatch => ({
	onfetchEvents: () => dispatch(eventActions.fetchAllEvents())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventListContainer);
