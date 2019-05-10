import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { lighten } from "polished";
import { EventCard } from "../../components";
import "./EventListComponent.scss";
// import { Container } from "reactstrap";
// import { Container } from "../../components";

const SectionHeader = styled.div`
	/* height: 100px; */
	background-color: ${props => lighten(0.4, props.theme.colors.grey)};
	/* grid-column: span 12; */
	height: 100px;
	/* background-color: lighten($grey-color, 40%); */
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	align-items: center;
	h2 {
		grid-column: 2;
		font-size: 30px;
		color: ${props => props.theme.colors.primary};
	}
`;

const EventListComponent = props => {
	return (
		<>
			<SectionHeader fluid>
				<h2>Events</h2>
			</SectionHeader>
			<div className="content">
				<div className="events-list">
					{!props.loading &&
						props.events.map(e => (
							<Link key={e.id} to={`/events/${e.id}`}>
								<EventCard event={e} />
							</Link>
						))}
				</div>
			</div>
		</>
	);
};

export default EventListComponent;
