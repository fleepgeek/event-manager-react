import React from "react";
import { EventsList } from "../../components";

const Created = ({ match, events, deleteEvent, isLoading }) => {
	return (
		<>
			{isLoading && <p>Loading</p>}
			<EventsList events={events} deleteHandler={deleteEvent} />
		</>
	);
};

export default Created;
