import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Moment from "react-moment";

import { Avatar } from "../components";

const Tile = styled.div`
	display: flex;
	align-items: center;
	color: ${props => props.theme.colors.grey};
	margin-top: 0.6rem;
`;

const Detail = styled.div`
	margin-left: 10px;
	font-size: 14px;
	line-height: 1.3rem;
`;

const HostTile = ({ event }) => {
	return (
		<Tile>
			<Avatar src="https://randomuser.me/api/portraits/men/43.jpg" />
			<Detail>
				{/* <p>Hosted by {props.event && props.event.creator ? props.event.creator.username : null}</p> */}
				<p>
					Hosted by{" "}
					<Link to={`/user/${event.creator.id}`}>{event.creator.username}</Link>
				</p>
				{/* <p>Hosted by {((props.event || {}).creator || {}).username}</p> */}
				<p>
					<Moment format="MMMM Do YYYY, h:mm:ss a">{event.event_date}</Moment>
				</p>
			</Detail>
		</Tile>
	);
};

export default HostTile;
