import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import { FaMapMarker } from "react-icons/fa";
import { Button, Tag, EventsTab, Divider } from "./";

const ProfileRow = styled(Row)`
	box-shadow: 0 0 2px 0 rgba(46, 62, 72, 0.12),
		0 2px 4px 0 rgba(46, 62, 72, 0.12);
	padding: 0 !important;
	background: #fff;
`;

const PersonalInfo = styled(Col)`
	border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

const Header = styled.div`
	display: flex;
`;

const TempAvatar = styled.span`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.lightGrey};
`;

const Data = styled.div`
	margin-left: 15px;
	h2 {
		margin-bottom: 0 !important;
	}
	p {
		font-size: 0.85rem;
		color: ${({ theme }) => theme.colors.secondary} !important;
		margin-bottom: 0.5rem !important;
	}
`;

const Section = styled.section`
	padding: 1.5rem;
	h2 {
		color: ${({ theme }) => theme.colors.primary};
		font-size: 1.3rem;
		font-weight: 600;
		text-transform: uppercase;
	}
	p {
		color: ${({ theme }) => theme.colors.grey};
		line-height: 1.5rem;
	}
`;

const ProfileCard = ({ profile, me, events, match }) => {
	return (
		<Container>
			{profile && (
				<ProfileRow noGutters>
					<PersonalInfo md={{ size: 8 }}>
						<Section>
							<Header>
								{/* <Avatar src="" /> */}
								<TempAvatar />
								<Data>
									<h2>
										{profile.display_name}{" "}
										<span
											style={{ fontSize: "13px", textTransform: "lowercase" }}
										>
											@{profile.username}
										</span>
									</h2>
									<p>
										<FaMapMarker />
										Lagos, Nigeria
									</p>
									{match.path !== "/user/:id" && (
										<p>
											<Link to={`/user/${profile.id}`}>
												View Public Profile
											</Link>
										</p>
									)}
									{me && <Button primary>Edit</Button>}
								</Data>
							</Header>
						</Section>
						<Divider />
						<Section>
							<h2>About</h2>
							<p>{profile.about}</p>
						</Section>
						<Divider />
						<Section>
							<h2>Interests</h2>
							<div style={{ display: "flex" }}>
								<Tag>Food</Tag>
								<Tag>Coding</Tag>
							</div>
						</Section>
					</PersonalInfo>
					<Col>
						<EventsTab events={events} />
					</Col>
				</ProfileRow>
			)}
		</Container>
	);
};

export default withRouter(ProfileCard);
