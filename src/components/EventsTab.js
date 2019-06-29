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
import { EventsList } from ".";

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
			<TabContent activeTab={activeTab} style={{ marginTop: "1rem" }}>
				<TabPane tabId="1">
					<Row>
						<Col sm="12">
							{((events || {}).attending || []).length > 0 ? (
								<EventsList events={events.attending} isMini={true} />
							) : (
								<p>No Event</p>
							)}
						</Col>
					</Row>
				</TabPane>
				<TabPane tabId="2">
					<Row>
						<Col sm="12">
							{((events || {}).created || []).length > 0 ? (
								<EventsList events={events.created} isMini={true} />
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
