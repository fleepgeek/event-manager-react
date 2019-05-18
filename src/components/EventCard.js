import React from "react";
import styled from "styled-components";
import { HostTile } from "../components";

const Card = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 0 2px 0 rgba(46, 62, 72, 0.12),
		0 2px 4px 0 rgba(46, 62, 72, 0.12);
	transition: 0.3s;
	&:hover {
		box-shadow: 0 0 8px 0 rgba(46, 62, 72, 0.12),
			0 8px 16px 0 rgba(46, 62, 72, 0.12);
	}
`;

const CardMedia = styled.div`
	height: 150px;
	width: 100%;
	background-color: #000;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
`;

const EventImage = styled.img`
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	object-fit: cover;
`;

const CardContent = styled.div`
	padding: 20px;
`;

const CardTitle = styled.h2`
	font-size: 24px;
	color: ${props => props.theme.colors.primary};
`;

const EventCard = props => {
	return (
		<Card>
			<CardMedia>
				<EventImage
					src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F51853185%2F52642443556%2F1%2Foriginal.jpg?h=512&w=512&auto=compress&rect=1294%2C0%2C2842%2C1421&s=92ccf976bc6bcef604d7e32b93451ec2"
					alt="event poster"
				/>
			</CardMedia>
			<CardContent>
				<CardTitle color="primary">{props.event.title}</CardTitle>
				<HostTile event={props.event} />
			</CardContent>
		</Card>
	);
};

export default EventCard;
