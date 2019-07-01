import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ProfileCard } from "../../components";
import { userActions, userSelectors } from "../../state/user";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";

const UserProfile = ({
	match,
	profile,
	created,
	attending,
	onGetProfile,
	onGetUserEvents
}) => {
	useEffect(() => {
		onGetProfile(match.params.id);
		onGetUserEvents(match.params.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div style={{ marginTop: "2rem" }}>
			<ProfileCard profile={profile} events={{ created, attending }} />
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	profile: userSelectors.getProfile,
	created: eventsListSelectors.getUserCreatedEvents,
	attending: eventsListSelectors.getUserAttendingEvents
});

export default connect(
	mapStateToProps,
	{
		onGetProfile: userActions.getProfile,
		onGetUserEvents: eventsListActions.getUserEvents
	}
)(UserProfile);
