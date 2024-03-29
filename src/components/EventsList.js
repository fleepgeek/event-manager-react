import React from "react";
import { Link } from "react-router-dom";
import { EventCard } from "./";
import { Container, Row, Col } from "reactstrap";

const EventsList = ({ events, isMini, deleteHandler }) => {
	if (isMini === undefined) {
		isMini = false;
	}
	const getContent = e => {
		if (isMini === true) {
			return (
				<Col key={e.id} sm="12" style={{ marginBottom: "1rem" }}>
					<EventCard event={e} isMini={isMini} />
				</Col>
			);
		} else {
			return (
				<Col key={e.id} md="6" lg="4" style={{ marginBottom: "2rem" }}>
					<Link to={`/dashboard/events/${e.id}/edit`}>Edit</Link>
					<button onClick={() => deleteHandler(e.id)}>Delete</button>
					<EventCard event={e} isMini={isMini} />
				</Col>
			);
		}
	};
	return (
		<Container>
			<Row>
				{events.length > 0 ? (
					events.map(e => getContent(e))
				) : (
					<h3>No events Yet</h3>
				)}
			</Row>
		</Container>
	);
};

export default EventsList;
