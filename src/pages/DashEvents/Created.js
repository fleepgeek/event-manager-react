import React from "react";
import { EventsList } from "../../components";

const Created = ({ match, events }) => {
	return (
		<>
			<EventsList events={events} />
		</>
	);
};

export default Created;
