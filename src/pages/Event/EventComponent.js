import React from "react";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import Moment from "react-moment";
import { darken } from "polished";

import EventHero from "./EventHero";

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

const Main = styled(Col)`
	line-height: 26px;
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
	const { event } = props;
	return (
		<EventWrapper>
			<EventHero event={event} />
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
									{props.event.event_date}
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
		</EventWrapper>
	);
};

export default React.memo(EventComponent);
