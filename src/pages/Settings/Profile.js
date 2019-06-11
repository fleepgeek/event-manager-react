import React from "react";
import { Container } from "reactstrap";
import { ProfileCard } from "../../components";

const Profile = ({ profile, events }) => {
	return (
		<Container>
			<ProfileCard profile={profile} events={events} me />
		</Container>
	);
};

export default Profile;
