import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";
import BrowseEventsComponent from "./BrowseEventsComponent";

const BrowseEventsContainer = props => {
	const { ongetEvents, events } = props;
	useEffect(() => {
		ongetEvents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <BrowseEventsComponent events={events} />;
};

const mapStateToProps = createStructuredSelector({
	events: eventsListSelectors.getAll
});

const mapDispatchToProps = dispatch => ({
	ongetEvents: () => dispatch(eventsListActions.getAllEvents())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrowseEventsContainer);
