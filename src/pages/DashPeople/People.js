import React from "react";
import { UsersList } from "../../components";

const People = ({
	users,
	getUser,
	events,
	profile,
	isModalOpen,
	closeModal
}) => {
	return (
		<UsersList
			users={users}
			clicked={getUser}
			events={events}
			profile={profile}
			isModalOpen={isModalOpen}
			closeModal={closeModal}
		/>
	);
};

export default People;
