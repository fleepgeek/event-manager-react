import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { lighten } from "polished";
import { Container } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";

const HeaderWrapper = styled.div`
	background-color: ${({ theme }) => lighten(0.25, theme.colors.lightGrey)};
	box-shadow: 0 0 2px 0 rgba(46, 62, 72, 0.12),
		0 2px 4px 0 rgba(46, 62, 72, 0.12);
	text-transform: uppercase;
`;
const Title = styled.h2`
	color: ${({ theme }) => theme.colors.primary};
	font-size: 1.5rem;
	font-weight: 700;
	padding: 15px 0;
`;

const LinksWrapper = styled.div`
	display: flex;
`;

const StyledLink = styled(NavLink)`
	position: relative;
	padding: 10px 30px;
	color: ${({ theme }) => theme.colors.primary};
	font-size: 0.8rem;
	font-weight: 600;
	&:hover,
	&.active {
		font-weight: 700;
		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			display: block;
			height: 2px;
			width: 100%;
			background: ${({ theme }) => theme.colors.secondary};
		}
		.react-icons {
			color: ${({ theme }) => theme.colors.secondary};
		}
	}
	.react-icons {
		margin-right: 5px;
	}
`;

const DashboardPageHeader = ({ pageTitle, links }) => {
	return (
		<HeaderWrapper>
			<Container>
				<Title>{pageTitle}</Title>
				<LinksWrapper>
					{links.map(link => (
						<StyledLink to={link.to} key={link.text}>
							<FaCheckCircle size={12} />
							{link.text}
						</StyledLink>
					))}
				</LinksWrapper>
			</Container>
		</HeaderWrapper>
	);
};

export default DashboardPageHeader;
