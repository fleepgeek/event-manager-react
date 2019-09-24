import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import queryString from "query-string";
// import { Modal } from "../../components";
import EventForm from "./EventForm";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";
import { globalActions, globalSelectors } from "../../state/global";
import { eventSelectors, eventActions } from "../../state/event";

const SaveEvent = ({
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
	onUnloadEvent,
	savedSuccess,
	redirectPath,
	onRedirectCompleted
}) => {
	// const [showModal, setShowModal] = useState(false);
	const isEditRef = React.useRef(false);
	// console.log(location, match);
	const { id } = match.params;

	useEffect(() => {
		if (redirectPath) {
			history.push(redirectPath);
			onRedirectCompleted();
		}
	}, [redirectPath, history, onRedirectCompleted]);

	useEffect(() => {
		onGetCategories();
		onGetTags();
		if (location.pathname === `/dashboard/events/${id}/edit`) {
			onGetEvent(id);
			isEditRef.current = true;
		}
		return () => {
			onUnloadEvent();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const closeModal = () => {
	// 	onCloseModal();
	// 	history.replace(location.pathname, { modal: false });
	// };

	return (
		<>
			{/* {showModal ? (
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
			) : ( */}
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
				{message && <h3>{message}</h3>}
			</>
			{/* )} */}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	categories: eventsListSelectors.getCategories,
	tags: eventsListSelectors.getTags,
	savedSuccess: eventsListSelectors.getSavedSuccess,
	event: eventSelectors.getById,
	message: globalSelectors.getMessage,
	redirectPath: globalSelectors.getRedirectPath
});

export default connect(
	mapStateToProps,
	{
		onSaveEvent: eventsListActions.saveEvent,
		onGetCategories: eventsListActions.getCategories,
		onGetTags: eventsListActions.getTags,
		onCloseModal: globalActions.hideModal,
		onGetEvent: eventActions.getEventById,
		onUnloadEvent: eventActions.eventPageUnloaded,
		onRedirectCompleted: globalActions.redirectCompleted
	}
)(SaveEvent);
