import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { eventsActions, eventsSelectors } from "../../state/events";
import BrowseEventsComponent from "./BrowseEventsComponent";

const BrowseEventsContainer = props => {
	const { onfetchEvents, events } = props;
	useEffect(() => {
		onfetchEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <BrowseEventsComponent events={events} />;
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
)(BrowseEventsContainer);
