import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import queryString from "query-string";

import {
	Auth,
	Logout,
	Home,
	BrowseEvents,
	Event,
	Dashboard,
	SaveEvent
} from "../pages";
import PrivateRoute from "./PrivateRoute";

const EventRouter = ({ location }) => {
	const values = queryString.parse(location.search);
	return (
		<>
			<Switch>
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/event/create" component={SaveEvent} />
				<PrivateRoute path="/event/:id/edit" component={SaveEvent} />
				<Route path="/events/:id" component={Event} />
				<Route path="/events" exact component={BrowseEvents} />
				<Route path="/auth" component={Auth} />
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={Home} />
				<Route render={() => <h2>Page not Found</h2>} />
			</Switch>
			{values.action && (
				<PrivateRoute path={`${location.pathname}`} component={SaveEvent} />
			)}
		</>
	);
};

export default withRouter(EventRouter);
