import React from "react";
import { ProfileCard } from "../../components";

const Profile = ({ profile, events }) => {
	return <ProfileCard profile={profile} events={events} me />;
};

export default Profile;
