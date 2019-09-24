import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Container } from "reactstrap";
import { ProfileCard } from "../../components";
import { userActions, userSelectors } from "../../state/user";
import { globalSelectors } from "../../state/global";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";

const UserProfile = ({
	match,
	profile,
	created,
	attending,
	onGetProfile,
	onGetUserEvents,
	message
}) => {
	useEffect(() => {
		onGetProfile(match.params.id);
		onGetUserEvents(match.params.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div style={{ marginTop: "2rem" }}>
			<Container>
				<h3>User Profile</h3>
				{profile ? (
					<ProfileCard profile={profile} events={{ created, attending }} />
				) : (
					<>{!message && <h3>Loading...</h3>}</>
				)}
				{message && <h4>Error: {message}</h4>}
			</Container>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	profile: userSelectors.getProfile,
	created: eventsListSelectors.getUserCreatedEvents,
	attending: eventsListSelectors.getUserAttendingEvents,
	message: globalSelectors.getMessage
});

export default connect(
	mapStateToProps,
	{
		onGetProfile: userActions.getProfile,
		onGetUserEvents: eventsListActions.getUserEvents
	}
)(UserProfile);
