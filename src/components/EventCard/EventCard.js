import React from "react";
import "./EventCard.scss";
import HostTile from "../HostTile/HostTile";

const EventCard = (props) => {
    return (
        <div className="card">
            <div className="card-media">
                <img
                    src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F51853185%2F52642443556%2F1%2Foriginal.jpg?h=512&w=512&auto=compress&rect=1294%2C0%2C2842%2C1421&s=92ccf976bc6bcef604d7e32b93451ec2"
                    alt="event poster"
                />
            </div>
            <div className="card-content">
                <h2 className="title">
                    {props.event.title}
                </h2>
                <HostTile event={props.event} />
            </div>
        </div>
    );
};

export default EventCard;
