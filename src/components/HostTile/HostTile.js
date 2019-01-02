import React from "react";
import styles from "./HostTile.module.scss"
import Moment from "react-moment";

const HostTile = (props) => {
  return (
    <div className={styles["tile"]}>
      <img
        className="avatar"
        src="https://randomuser.me/api/portraits/men/43.jpg"
        alt="avatar"
      />
      <div className={styles["detail"]}>
        {/* <p>Hosted by {props.event && props.event.creator ? props.event.creator.username : null}</p> */}
        <p>Hosted by {((props.event || {}).creator || {}).username}</p>
        <p>
          <Moment format="MMMM Do YYYY, h:mm:ss a">
            {props.event.created_on}
          </Moment>
        </p>
      </div>
    </div>
  );
};

export default HostTile;
