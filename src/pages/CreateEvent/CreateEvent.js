import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Modal } from "../../components";

const CreateEvent = ({ history, location, match }) => {
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		const { state = {} } = location;
		const { modal } = state;
		if (match.path !== "/event/create") {
			history.replace("?action=create_event", { modal: false });
		} else {
			history.replace("/event/create", { modal: false });
			setShowModal(false);
		}
		const values = queryString.parse(location.search);
		if (values.action === "create_event" && modal === false) {
			history.replace("/event/create", { modal: false });
		} else if (modal === true) {
			setShowModal(true);
		} else {
			history.replace("/event/create", { modal: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{showModal ? (
				<Modal isModalOpen={showModal}>
					<div style={{ backgroundColor: "white" }}>
						<h3>Hello</h3>
						<button onClick={() => history.replace({ modal: false })}>
							Cancel
						</button>
					</div>
				</Modal>
			) : (
				<>{location.pathname === "/event/create" && <h1>Create Event</h1>}</>
			)}
		</>
	);
};

export default CreateEvent;
