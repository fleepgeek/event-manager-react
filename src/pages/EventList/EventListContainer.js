import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { eventsActions, eventsSelectors } from "../../state/events/";
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
	events: eventsSelectors.getAll
});

const mapDispatchToProps = dispatch => ({
	onfetchEvents: () => dispatch(eventsActions.fetchAllEvents())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventListContainer);
