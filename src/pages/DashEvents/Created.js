import React from "react";
import { EventsList } from "../../components";

const Created = ({ match, events, deleteEvent }) => {
	return (
		<>
			<EventsList events={events} deleteHandler={deleteEvent} />
		</>
	);
};

export default Created;
