import React from "react";
import { EventCard } from "../../components";
import "./EventListComponent.scss";
import { Link } from "react-router-dom";

const EventListComponent = props => {
  return (
    <div className="container">
      <div className="header">
        <h2>Events</h2>
      </div>
      <div className="content">
        <div className="events-list">
          {props.events.map(e => (
            <Link key={e.id} to={`/events/${e.id}`}>
              <EventCard event={e} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListComponent;
