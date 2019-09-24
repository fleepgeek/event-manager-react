import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";
import { userActions, userSelectors } from "../../state/user";
import { globalActions, globalSelectors } from "../../state/global";
import { DashPageHeader } from "../../components";

const People = React.lazy(() => import("./People"));

const DashPeople = ({
	match,
	history,
	location,
	onGetUsers,
	users,
	profile,
	created,
	attending,
	isModalOpen,
	...props
}) => {
	useEffect(() => {
		history.replace(`${match.path}/list`);
		onGetUsers();
	}, [history, match.path, onGetUsers, location.pathname]);

	const getUserDetails = id => {
		props.onOpenModal();
		props.onGetProfile(id);
		props.onGetUserEvents(id);
	};
	return (
		<>
			<DashPageHeader
				pageTitle="People"
				links={[{ text: "People", to: `${match.url}/list` }]}
			/>
			<Route
				path={`${match.path}/list`}
				render={() => (
					<React.Suspense
						fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}
					>
						<People
							users={users}
							profile={profile}
							getUser={getUserDetails}
							events={{ created, attending }}
							isModalOpen={isModalOpen}
							closeModal={props.onCloseModal}
						/>
					</React.Suspense>
				)}
				exact
			/>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	users: userSelectors.getUsers,
	profile: userSelectors.getProfile,
	created: eventsListSelectors.getUserCreatedEvents,
	attending: eventsListSelectors.getUserAttendingEvents,
	isModalOpen: globalSelectors.getModalOpen
});

export default connect(
	mapStateToProps,
	{
		onGetUsers: userActions.getUsers,
		onOpenModal: globalActions.showModal,
		onCloseModal: globalActions.hideModal,
		onGetProfile: userActions.getProfile,
		onGetUserEvents: eventsListActions.getUserEvents
	}
)(DashPeople);
