import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Container } from "reactstrap";
import { ProfileCard } from "../../components";
import { userSelectors, userActions } from "../../state/user";
import { authSelectors } from "../../state/auth";

const Profile = ({
	onGetProfile,
	onGetEvents,
	profile,
	uid,
	created,
	attending
}) => {
	useEffect(() => {
		onGetProfile(uid);
		onGetEvents(uid);
		// return () => {
		// 	effect
		// };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Container>
			<div style={{ margin: "35px 0" }}>
				<ProfileCard profile={profile} events={{ created, attending }} me />
			</div>
		</Container>
	);
};

const mapStateToProps = createStructuredSelector({
	uid: authSelectors.getUid,
	profile: userSelectors.getProfile,
	created: userSelectors.getCreatedEvents,
	attending: userSelectors.getAttendingEvents
});

export default connect(
	mapStateToProps,
	{ onGetProfile: userActions.getProfile, onGetEvents: userActions.getEvents }
)(Profile);
