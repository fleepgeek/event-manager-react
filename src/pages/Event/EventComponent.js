import React from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import Moment from "react-moment";
import { lighten, darken } from "polished";

import { Button, HostTile, Tag } from "../../components";

const EventWrapper = styled(Container)`
	box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px 0px;
	margin: 40px 0;
	padding: 0 !important;
`;
const Info = styled(Row)`
	color: ${props => props.theme.colors.grey};
	*.heading {
		color: ${props => darken(0.2, props.theme.colors.grey)};
		margin-bottom: 4px;
		font-weight: 700;
	}
`;

const Hero = styled(Row)`
	background-color: ${({ theme }) => lighten(0.2, theme.colors.lightGrey)};
`;

const PosterImage = styled.img.attrs(props => ({
	alt: "event poster"
}))`
	object-fit: cover;
`;

const Content = styled(Col)`
	/* flex: 1 0 40%; */
	display: flex;
	flex-direction: column;
	padding: 12px !important;
	.actions {
		margin-top: auto;
		@media screen and (max-width: 960px) {
			padding-top: 20px;
		}
	}
`;

const Main = styled(Col)`
	line-height: 1.5rem;
`;

const Extras = styled(Col)`
	/* padding-left: 40px; */
	@media screen and (max-width: 990px) {
		/* padding-left: 0; */
		margin-top: 40px;
	}
	.item {
		margin-bottom: 40px;
	}
`;

const EventComponent = props => {
	const {
		event,
		attendees,
		attendEvent,
		cancelAttendance,
		isAuth,
		isLoading
	} = props;
	const attendClicked = () => {
		if (!event.attending) {
			attendEvent(event.id);
		} else {
			cancelAttendance(event.id);
		}
	};
	return (
		<>
			{event && (
				<EventWrapper>
					<Hero noGutters>
						<Col lg="7">
							<PosterImage src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F51853185%2F52642443556%2F1%2Foriginal.jpg?w=800&auto=compress&rect=1294%2C0%2C2842%2C1421&s=91a6faf8d21ccdf306d476339b2f4e3e" />
						</Col>
						<Content>
							<div className="categories">
								<Tag>Outdoor</Tag>
							</div>
							<h1>{event.title}</h1>
							<HostTile event={event} />
							<div className="actions">
								{isAuth ? (
									<Button
										secondary
										full
										onClick={attendClicked}
										disabled={isLoading}
									>
										{!event.attending ? "Attend" : "Cancel Attendance"}
									</Button>
								) : (
									<h4>Login to Attend</h4>
								)}
							</div>
						</Content>
					</Hero>
					<Container>
						<Info>
							<Main lg="7">
								<div className="description">
									<p className="heading">Description</p>
									<p>{event.description}</p>
								</div>
							</Main>
							<Extras>
								<div className="item">
									<p className="heading">Date and Time</p>
									<p>
										<Moment format="MMMM Do YYYY, h:mm:ss a">
											{event.event_date}
										</Moment>
									</p>
								</div>
								<div className="item">
									<p className="heading">Location</p>
									<p>{event.location}</p>
								</div>
							</Extras>
						</Info>
					</Container>
					<Container>
						<h3>Attendees</h3>
						{(attendees || []).length > 0 ? (
							<ul>
								{attendees.map(attendee => (
									<li key={attendee.id}>{attendee.user.username}</li>
								))}
							</ul>
						) : (
							<p>None</p>
						)}
					</Container>
				</EventWrapper>
			)}
		</>
	);
};

export default React.memo(EventComponent);
