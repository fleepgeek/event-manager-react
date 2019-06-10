import React from "react";
import { Route, Switch } from "react-router-dom";
import { Auth, Logout, Home, BrowseEvents, Event, Dashboard } from "../pages";
import PrivateRoute from "./PrivateRoute";

const AddEvent = props => <h2>Add Event</h2>;

const EventRouter = props => {
	return (
		<Switch>
			<PrivateRoute path="/dashboard" component={Dashboard} />
			<PrivateRoute path="/events/add" component={AddEvent} />
			<Route path="/events/:id" component={Event} />
			<Route path="/events" component={BrowseEvents} />
			<Route path="/auth" component={Auth} />
			<Route path="/logout" component={Logout} />
			<Route path="/" exact component={Home} />
			<Route render={() => <h2>Page not Found</h2>} />
		</Switch>
	);
};

export default EventRouter;
