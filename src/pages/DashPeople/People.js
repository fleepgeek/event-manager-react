import React from "react";
import { Container } from "reactstrap";
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
		<Container>
			{users ? (
				<>
					{users.length > 0 ? (
						<UsersList
							users={users}
							clicked={getUser}
							events={events}
							profile={profile}
							isModalOpen={isModalOpen}
							closeModal={closeModal}
						/>
					) : (
						<h4>No Users</h4>
					)}
				</>
			) : (
				<h4>Loading...</h4>
			)}
		</Container>
	);
};

export default People;
