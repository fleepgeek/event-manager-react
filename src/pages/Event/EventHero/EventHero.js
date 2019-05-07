import React from "react";
import styles from "./EventHero.module.scss";
import { Button, HostTile } from "../../../components";

// const EventHero = ({ event, attendEvent }) => {
const EventHero = ({ event }) => {
	return (
		<div className={styles["hero"]}>
			<div className={styles["poster-wrapper"]}>
				<img
					src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F51853185%2F52642443556%2F1%2Foriginal.jpg?w=800&auto=compress&rect=1294%2C0%2C2842%2C1421&s=91a6faf8d21ccdf306d476339b2f4e3e"
					alt=""
				/>
			</div>
			<div className={styles["content"]}>
				<div className="categories">
					<span
						style={{
							backgroundColor: "#1e0a3c",
							color: "#fff",
							padding: "5px 10px",
							borderRadius: "4px"
						}}
					>
						Outdoor
					</span>
				</div>
				<h1>{event.title}</h1>
				<HostTile event={event} />
				<div className={styles["actions"]}>
					{/* <p>Location: {event.location}</p> */}
					<Button
						type="secondary"
						full
						disabled={false}
						// clicked={() => attendEvent(event.id)}
					>
						Attend
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EventHero;
