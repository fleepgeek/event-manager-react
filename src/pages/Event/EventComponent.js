import React from "react";
import { Container } from "../../components";
import styles from "./EventComponent.module.scss";
import Moment from "react-moment";
import EventHero from "./EventHero/EventHero";

const EventComponent = props => {
  const { event, loading } = props;
  return (
    <Container>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <div className={styles["event"]}>
          <EventHero event={event} />
          <div className={styles["event-info"]}>
            <div className={styles["main"]}>
              <div className={styles["description"]}>
                <p className={styles["heading"]}>Description</p>
                <p>
                  {event.description}
                </p>
              </div>
            </div>
            <div className={styles["extras"]}>
              <div className={styles["item"]}>
                <p className={styles["heading"]}>Date and Time</p>
                <p>
                  <Moment format="MMMM Do YYYY, h:mm:ss a">
                    {props.event.event_date}
                  </Moment>
                </p>
              </div>
              <div className={styles["item"]}>
                <p className={styles["heading"]}>Location</p>
                <p>{event.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default EventComponent;
