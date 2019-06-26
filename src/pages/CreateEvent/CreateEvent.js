import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import queryString from "query-string";
import { Modal } from "../../components";
import EventForm from "./EventForm";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";

const CreateEvent = ({
	history,
	location,
	match,
	onSaveEvent,
	onGetCategories,
	categories,
	onGetTags,
	tags
}) => {
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		const { state = {} } = location;
		const { modal } = state;
		const values = queryString.parse(location.search);
		if (location.pathname === "/event/create" || modal === undefined) {
			history.replace("/event/create", { modal: false });
		} else {
			if (values.action === "create_event" && modal === true) {
				history.replace("?action=create_event");
			} else {
				history.replace("/event/create", { modal: false });
			}
		}
		setShowModal(modal);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onGetCategories();
		onGetTags();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const closeModal = () => {
		history.replace({ modal: false });
	};

	return (
		<>
			{showModal ? (
				<Modal isModalOpen={showModal}>
					<EventForm
						closeModal={closeModal}
						saveEvent={onSaveEvent}
						categories={categories}
						tags={tags}
					/>
				</Modal>
			) : (
				<>
					{location.pathname === "/event/create" && (
						<EventForm
							saveEvent={onSaveEvent}
							categories={categories}
							tags={tags}
						/>
					)}
				</>
			)}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	categories: eventsListSelectors.getCategories,
	tags: eventsListSelectors.getTags
});

export default connect(
	mapStateToProps,
	{
		onSaveEvent: eventsListActions.saveEvent,
		onGetCategories: eventsListActions.getCategories,
		onGetTags: eventsListActions.getTags
	}
)(CreateEvent);
