import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import { darken } from "polished";
import { Container } from "reactstrap";
import {
	MdDashboard,
	MdEvent,
	MdPeople,
	MdDateRange,
	MdSettings
} from "react-icons/md";

const DashNavWrapper = styled.nav`
	background: ${({ theme }) => theme.colors.primary};
`;

const DashNavbar = styled.div`
	display: flex;
`;

const DashLink = styled(NavLink)`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	text-align: center;
	font-size: 0.8rem;
	color: #fff;
	text-transform: uppercase;
	padding: 10px 0;
	width: 100%;
	height: 70px;
	&:hover,
	&.active {
		background: ${({ theme }) => darken(0.5, theme.colors.lightGrey)};
		font-weight: 500;
		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			display: block;
			height: 3px;
			width: 100%;
			background: ${({ theme }) => theme.colors.secondary};
		}
	}
	@media screen and (max-width: 600px) {
		font-size: 0.6rem;
		span {
			display: none;
		}
	}
`;

const DashboardNav = ({ match }) => {
	return (
		<DashNavWrapper>
			<Container>
				<DashNavbar>
					<DashLink to={match.url} exact>
						<MdDashboard size={20} />
						<span>Dashboard</span>
					</DashLink>
					<DashLink
						to={{
							pathname: match.url + "/events",
							state: { fromDashboard: true }
						}}
					>
						<MdEvent size={20} />
						<span>Events</span>
					</DashLink>
					<DashLink to={match.url + "/people"}>
						<MdPeople size={20} />
						<span>People</span>
					</DashLink>
					<DashLink to={match.url + "/calendar"}>
						<MdDateRange size={20} />
						<span>Calendar</span>
					</DashLink>
					<DashLink to={match.url + "/settings"}>
						<MdSettings size={20} />
						<span>Settings</span>
					</DashLink>
				</DashNavbar>
			</Container>
		</DashNavWrapper>
	);
};

export default withRouter(DashboardNav);
