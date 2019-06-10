import React from "react";
import { Link } from "react-router-dom";
import { EventCard } from "./";
import { Container, Row, Col } from "reactstrap";

const EventsList = ({ events }) => {
	return (
		<Container>
			<Row>
				{events.map(e => (
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
	);
};

export default EventsList;
