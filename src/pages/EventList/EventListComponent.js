import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { lighten } from "polished";
import { EventCard } from "../../components";
import { Container, Row, Col } from "reactstrap";

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

const EventListComponent = props => {
	return (
		<>
			<SectionHeader fluid>
				<Container>
					<SectionTitle>Events</SectionTitle>
				</Container>
			</SectionHeader>
			<Container>
				<Row>
					{!props.loading &&
						props.events.map(e => (
							<Col
								key={e.id}
								md="6"
								lg={{ size: 4 }}
								style={{ marginBottom: "40px" }}
							>
								<Link to={`/events/${e.id}`}>
									<EventCard event={e} />
								</Link>
							</Col>
						))}
				</Row>
			</Container>
		</>
	);
};

export default EventListComponent;
