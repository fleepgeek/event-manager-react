import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { EventsList } from "../../components";
import { Container } from "reactstrap";

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

const BrowseEventsComponent = ({ events }) => {
	return (
		<>
			<SectionHeader fluid>
				<Container>
					<SectionTitle>Events</SectionTitle>
				</Container>
			</SectionHeader>
			<EventsList events={events} />
		</>
	);
};

export default React.memo(BrowseEventsComponent);
