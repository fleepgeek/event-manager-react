import React from "react";
import styled from "styled-components";
import { lighten, darken } from "polished";
import { Container, Col, Row } from "reactstrap";
import { Avatar, Modal, ProfileCard } from "./";

const StyledContainer = styled(Container)`
	background: ${({ theme }) => lighten(0.2, theme.colors.lightGrey)};
	padding: 2rem !important;
	border: 1px solid ${({ theme }) => lighten(0.15, theme.colors.lightGrey)};
`;

const Name = styled.h6`
	font-weight: 600;
	color: ${({ theme }) => darken(0.2, theme.colors.grey)};
`;

const UsersList = ({
	users,
	clicked,
	profile,
	events,
	isModalOpen,
	closeModal
}) => {
	return (
		<>
			<Modal isModalOpen={isModalOpen} closeModal={closeModal}>
				<ProfileCard profile={profile} events={events} />
			</Modal>
			<StyledContainer>
				<Row className="text-center">
					{users.map(person => (
						<Col
							key={person.id}
							sm={{ size: 6 }}
							md={{ size: 3 }}
							className="mb-5"
						>
							<div onClick={() => clicked(person.id)}>
								<Avatar width={`100px`} height={`100px`} />
								<Name>{person.username}</Name>
							</div>
						</Col>
					))}
				</Row>
			</StyledContainer>
		</>
	);
};

export default UsersList;
