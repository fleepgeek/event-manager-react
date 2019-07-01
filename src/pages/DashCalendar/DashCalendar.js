import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Container } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { eventsListActions, eventsListSelectors } from "../../state/eventsList";
import { authSelectors } from "../../state/auth";
import { DashboardPageHeader } from "../../components";

const DashCalendar = ({
	match,
	location,
	history,
	uid,
	created,
	attending,
	onGetUserEvents,
	...props
}) => {
	const [calendarEvents, setCalendarEvents] = useState();
	useEffect(() => {
		onGetUserEvents(uid);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const ev = [];
		if (
			(attending && attending.length > 0) ||
			(created && created.length > 0)
		) {
			const allUserEvents = [...attending, ...created];
			allUserEvents.forEach(e => {
				let bg = "#19212c";
				if (e.creator.id === parseInt(uid)) {
					bg = "#e53633"; // Your Events (Red)
				}
				ev.push({
					id: e.id,
					title: e.title,
					date: e.event_date,
					url: `/events/${e.id}`,
					backgroundColor: bg
				});
			});

			setCalendarEvents(ev);
		}
	}, [attending, created, uid]);

	return (
		<>
			<DashboardPageHeader
				pageTitle="Calendar"
				links={[{ text: "Calendar", to: `${match.url}` }]}
			/>
			<Container>
				{calendarEvents ? (
					<FullCalendar
						defaultView="dayGridMonth"
						plugins={[dayGridPlugin]}
						header={{
							left: "prev,next today",
							center: "title",
							right: ""
						}}
						events={calendarEvents}
						eventClick={info => {
							info.jsEvent.preventDefault(); // don't let the browser navigate
							history.push(info.event.url);
						}}
					/>
				) : (
					<h3>Loading...</h3>
				)}
			</Container>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	created: eventsListSelectors.getUserCreatedEvents,
	attending: eventsListSelectors.getUserAttendingEvents,
	uid: authSelectors.getUid
});

export default connect(
	mapStateToProps,
	{
		onGetUserEvents: eventsListActions.getUserEvents
	}
)(DashCalendar);
