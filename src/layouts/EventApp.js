import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Navbar } from "../components";
import { EventRouter } from "../routes";
import { authSelectors } from "../state/auth";

const EventApp = ({ isAuthenticated }) => {
	return (
		<div>
			<Navbar isAuth={isAuthenticated} />
			<EventRouter />
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: authSelectors.getIsAuthenticated
});

export default withRouter(connect(mapStateToProps)(EventApp));
