import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import { lighten } from "polished";
import { Container } from "reactstrap";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";
import { globalSelectors } from "../../state/global";
import { EventsList } from "../../components";

const SectionHeader = styled(Container)`
	display: flex;
	height: 100px;
	background-color: ${props => lighten(0.4, props.theme.colors.grey)};
	align-items: center;
	margin-bottom: 30px;
`;
const SectionTitle = styled.h2`
	font-size: 30px;
	color: ${props => props.theme.colors.primary};
`;

const BrowseEvents = props => {
	const { onGetEvents, events, message } = props;
	useEffect(() => {
		onGetEvents();
	}, [onGetEvents]);

	return (
		<>
			<SectionHeader fluid>
				<Container>
					<SectionTitle>Events</SectionTitle>
				</Container>
			</SectionHeader>
			<Container>
				<EventsList events={events} />
				{message && <h3>Error Occured: {message}</h3>}
			</Container>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	events: eventsListSelectors.getAll,
	message: globalSelectors.getMessage
});

const mapDispatchToProps = dispatch => ({
	onGetEvents: () => dispatch(eventsListActions.getAllEvents())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrowseEvents);
