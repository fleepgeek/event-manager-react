import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { lighten } from "polished";
import { FaCalendarAlt } from "react-icons/fa";
import { Button } from "./";

const StyledNavbar = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 59px;
	border-bottom: 1px solid ${props => lighten(0.45, props.theme.colors.grey)};
	padding: 0 20px;
	.logo {
		color: ${props => props.theme.colors.primary};
		font-weight: 700;
		font-size: 1.5rem;
		span {
			color: ${props => props.theme.colors.secondary};
			padding-left: 5px;
		}
	}
`;

const Menu = styled.div`
	a {
		color: ${props => props.theme.colors.grey};
		padding: 0 20px;
		&:hover {
			color: ${props => props.theme.colors.secondary};
		}
		&.active {
			color: ${props => props.theme.colors.secondary};
			font-weight: 500;
		}
	}
`;

const Navbar = props => {
	return (
		<>
			<StyledNavbar>
				<Link to="/" className="logo">
					<FaCalendarAlt size={20} />
					<span>Eventio</span>
				</Link>
				<Menu>
					<NavLink to="/event/create">
						<Button secondary>Create Event</Button>
					</NavLink>
					{/* <NavLink
						to={{
							search: "?action=create_event",
							state: { modal: true }
						}}
					>
						<Button secondary>Create Event</Button>
					</NavLink> */}
					<NavLink to="/events" exact>
						Browse Events
					</NavLink>
					{props.isAuth ? (
						<>
							<NavLink to="/dashboard">Dashboard</NavLink>
							<NavLink to="/logout" exact>
								Logout
							</NavLink>
						</>
					) : (
						<NavLink to="/auth" exact>
							Sign In
						</NavLink>
					)}
				</Menu>
			</StyledNavbar>
		</>
	);
};

export default React.memo(Navbar);
