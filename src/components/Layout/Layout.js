import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Layout = props => {
  return (
    <div>
      <Navbar isAuth={props.isAuth} />
      {props.children}
    </div>
  );
};

export default Layout;
