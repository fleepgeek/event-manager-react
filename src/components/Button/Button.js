import React from "react";

import styles from "./Button.module.scss";

const Button = props => {
  return (
    <button
      className={[styles.button, styles[props.type]].join(" ")}
      style={{ width: props.full ? "100%" : "auto" }}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
