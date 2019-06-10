import React, { useState } from "react";
import styled from "styled-components";
import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Row,
	Col
} from "reactstrap";

const StyledNavItem = styled(NavItem)`
	flex: 1;
`;
const StyledNavLink = styled(NavLink)`
	border-radius: 0 !important;
	padding: 1rem !important;
	color: ${({ theme }) => theme.colors.grey} !important;
	text-transform: uppercase;
	font-size: 0.85rem;
	font-weight: 600;
	cursor: pointer;
	&.active {
		color: ${({ theme }) => theme.colors.primary} !important;
	}
`;

const EventsTab = ({ events }) => {
	const [activeTab, setActiveTab] = useState("1");
	const toggle = tab => setActiveTab(tab);
	return (
		<div>
			<Nav tabs>
				<StyledNavItem>
					<StyledNavLink
						className={activeTab === "1" ? "active" : ""}
						onClick={() => {
							toggle("1");
						}}
					>
						Events Attending
					</StyledNavLink>
				</StyledNavItem>
				<StyledNavItem>
					<StyledNavLink
						className={activeTab === "2" ? "active" : ""}
						onClick={() => {
							toggle("2");
						}}
					>
						Events Created
					</StyledNavLink>
				</StyledNavItem>
			</Nav>
			<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					<Row>
						<Col sm="12">
							{((events || {}).attending || []).length > 0 ? (
								<ul>
									{events.attending.map(event => (
										<li key={event.id}>{event.title}</li>
									))}
								</ul>
							) : (
								<p>No Event</p>
							)}
						</Col>
					</Row>
				</TabPane>
				<TabPane tabId="2">
					<Row>
						<Col sm="6">
							{((events || {}).created || []).length > 0 ? (
								<ul>
									{events.created.map(event => (
										<li key={event.id}>{event.title}</li>
									))}
								</ul>
							) : (
								<p>No Event</p>
							)}
						</Col>
					</Row>
				</TabPane>
			</TabContent>
		</div>
	);
};

export default EventsTab;
