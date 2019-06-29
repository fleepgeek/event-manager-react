import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import queryString from "query-string";
import { Modal } from "../../components";
import EventForm from "./EventForm";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";
import { globalActions, globalSelectors } from "../../state/global";
import { eventSelectors, eventActions } from "../../state/event";

const CreateEvent = ({
	history,
	location,
	match,
	onSaveEvent,
	onGetCategories,
	onCloseModal,
	onGetTags,
	onGetEvent,
	categories,
	tags,
	event,
	message,
	onUnloadEvent
}) => {
	const [showModal, setShowModal] = useState(false);
	const isEditRef = React.useRef(false);
	// console.log(location, match);
	useEffect(() => {
		// if(location.pathname)
		if (match.path === "/dashboard/events/:id/edit") {
			onGetEvent(match.params.id);
			isEditRef.current = true;
		} else {
			history.replace("/event/create");
		}
		onGetCategories();
		onGetTags();
		return () => {
			onUnloadEvent();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const closeModal = () => {
		onCloseModal();
		history.replace(location.pathname, { modal: false });
	};

	return (
		<>
			{showModal ? (
				<Modal
					isModalOpen={showModal}
					closeModal={closeModal}
					clickableBackdrop={false}
				>
					<EventForm
						isEdit={isEditRef.current}
						closeModal={closeModal}
						saveEvent={onSaveEvent}
						categories={categories}
						tags={tags}
						message={message}
					/>
				</Modal>
			) : (
				<>
					{((isEditRef.current && event) ||
						location.pathname === "/event/create") && (
						<EventForm
							isEdit={isEditRef.current}
							saveEvent={onSaveEvent}
							categories={categories}
							tags={tags}
							event={event}
							id={match.params.id}
							message={message}
						/>
					)}
				</>
			)}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	categories: eventsListSelectors.getCategories,
	tags: eventsListSelectors.getTags,
	event: eventSelectors.getById,
	message: globalSelectors.getMessage
});

export default connect(
	mapStateToProps,
	{
		onSaveEvent: eventsListActions.saveEvent,
		onGetCategories: eventsListActions.getCategories,
		onGetTags: eventsListActions.getTags,
		onCloseModal: globalActions.hideModal,
		onGetEvent: eventActions.getEventById,
		onUnloadEvent: eventActions.eventPageUnloaded
	}
)(CreateEvent);
