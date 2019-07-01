import React from "react";
import styled, { css } from "styled-components";
import Moment from "react-moment";
import { FaMapMarker } from "react-icons/fa";

import { HostTile } from "../components";

const Card = styled.div`
	display: ${({ isMini }) => (isMini === true ? "flex" : "block")};
	background-color: #fff;
	border-radius: ${({ isMini }) => (!isMini ? "8px" : "none")};
	box-shadow: 0 0 2px 0 rgba(46, 62, 72, 0.12),
		0 2px 4px 0 rgba(46, 62, 72, 0.12);
	transition: 0.3s;
	&:hover {
		box-shadow: 0 0 8px 0 rgba(46, 62, 72, 0.12),
			0 8px 16px 0 rgba(46, 62, 72, 0.12);
	}
`;

const CardMedia = styled.div`
	width: ${({ isMini }) => (isMini ? "30%" : "100%")};
	background-color: #000;
	${({ isMini }) =>
		isMini === false &&
		css`
			height: 150px;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		`}
`;

const EventImage = styled.img`
	object-fit: cover;
	${({ isMini }) =>
		!isMini &&
		css`
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		`}
`;

const CardContent = styled.div`
	padding: ${({ isMini }) => (isMini ? ".5rem" : "1.2rem")};
`;

const CardTitle = styled.h2`
	font-size: 1.5rem;
	color: ${props => props.theme.colors.primary};
`;

const SmallDetail = styled.div`
	text-transform: capitalize;
	line-height: 1.2rem;
	font-weight: 500;
	.title {
		color: ${props => props.theme.colors.primary};
		font-weight: 700;
	}
	.location {
		font-size: 0.8rem;
		color: ${props => props.theme.colors.secondary};
		span {
			padding-right: 0.2rem;
		}
	}
	.date {
		font-size: 0.8rem;
		color: ${props => props.theme.colors.grey};
	}
`;

const EventCard = ({ event, isMini }) => {
	return (
		<>
			{event && (
				<Card isMini={isMini}>
					<CardMedia isMini={isMini}>
						<EventImage
							src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F51853185%2F52642443556%2F1%2Foriginal.jpg?h=512&w=512&auto=compress&rect=1294%2C0%2C2842%2C1421&s=92ccf976bc6bcef604d7e32b93451ec2"
							alt="event poster"
							isMini={isMini}
						/>
					</CardMedia>
					<CardContent isMini={isMini}>
						{isMini ? (
							<SmallDetail>
								<p className="title">{event.title}</p>
								<p className="location">
									<span>
										<FaMapMarker size={10} />
									</span>
									{event.location}
								</p>
								<p className="date">
									<Moment format="MMMM Do YYYY">{event.event_date}</Moment>
								</p>
							</SmallDetail>
						) : (
							<>
								<CardTitle>{event.title}</CardTitle>
								<HostTile event={event} />
							</>
						)}
					</CardContent>
				</Card>
			)}
		</>
	);
};

export default React.memo(EventCard);
