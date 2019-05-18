import React from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { Row, Col } from "reactstrap";
import { Button, HostTile, Tag } from "../../components";

const Hero = styled(Row)`
	background-color: ${({ theme }) => lighten(0.1, theme.colors.lightGrey)};
`;

const PosterImage = styled.img.attrs(props => ({
	alt: "event poster"
}))`
	object-fit: cover;
`;

const Content = styled(Col)`
	/* flex: 1 0 40%; */
	display: flex;
	flex-direction: column;
	padding: 12px !important;
	.actions {
		margin-top: auto;
		@media screen and (max-width: 960px) {
			padding-top: 20px;
		}
	}
`;

// const EventHero = ({ event, attendEvent }) => {
const EventHero = ({ event }) => {
	return (
		<Hero noGutters>
			<Col lg="7">
				<PosterImage src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F51853185%2F52642443556%2F1%2Foriginal.jpg?w=800&auto=compress&rect=1294%2C0%2C2842%2C1421&s=91a6faf8d21ccdf306d476339b2f4e3e" />
			</Col>
			<Content>
				<div className="categories">
					<Tag>Outdoor</Tag>
				</div>
				<h1>{event.title}</h1>
				<HostTile event={event} />
				<div className="actions">
					<Button
						secondary
						full
						// onClick={() => attendEvent(event.id)}
					>
						Attend
					</Button>
				</div>
			</Content>
		</Hero>
	);
};

export default EventHero;
