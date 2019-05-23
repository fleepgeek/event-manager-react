import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { lighten } from "polished";

const StyledNavbar = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 59px;
	border-bottom: 1px solid ${props => lighten(0.45, props.theme.colors.grey)};
	padding: 0 20px;
	.logo {
		color: ${props => props.theme.colors.secondary};
		font-weight: 700;
		font-size: 26px;
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
		<StyledNavbar>
			<Link to="/" className="logo">
				eventio
			</Link>
			<Menu>
				<NavLink to="/events" exact>
					Browse Events
				</NavLink>
				<NavLink to="/events/add" exact>
					Create Event
				</NavLink>
				{props.isAuth ? (
					<NavLink to="/logout" exact>
						Logout
					</NavLink>
				) : (
					<NavLink to="/auth" exact>
						Sign In
					</NavLink>
				)}
			</Menu>
		</StyledNavbar>
	);
};

export default React.memo(Navbar);
