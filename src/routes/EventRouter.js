import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import queryString from "query-string";

import PrivateRoute from "./PrivateRoute";
// import {
// 	Logout,
// 	Home,
// 	BrowseEvents,
// 	Event,
// 	SaveEvent,
// 	UserProfile
// } from "../pages";
// import DashApp from "../layouts/DashApp";

const DashApp = React.lazy(() => import("../layouts/DashApp"));
const BrowseEvents = React.lazy(() =>
	import("../pages/BrowseEvents/BrowseEvents")
);
const Home = React.lazy(() => import("../pages/Home/Home"));
const Event = React.lazy(() => import("../pages/Event/Event"));
const SaveEvent = React.lazy(() => import("../pages/SaveEvent/SaveEvent"));
const UserProfile = React.lazy(() =>
	import("../pages/UserProfile/UserProfile")
);
const Logout = React.lazy(() => import("../pages/Auth/Logout"));

const EventRouter = ({ location }) => {
	// const values = queryString.parse(location.search);
	return (
		<>
			<React.Suspense
				fallback={<h3 style={{ textAlign: "center" }}>Loading UI</h3>}
			>
				<Switch>
					<PrivateRoute path="/dashboard" component={DashApp} />
					<Route path="/user/:id" component={UserProfile} />
					<PrivateRoute
						path={["/event/create", "/event/:id/edit"]}
						component={SaveEvent}
					/>
					<Route path="/events/:id" exact component={Event} />
					<Route path="/events" component={BrowseEvents} />
					<Route path="/logout" component={Logout} />
					<Route path="/" exact component={Home} />
					<Route render={() => <h2>Page not Found</h2>} />
				</Switch>
			</React.Suspense>
			{/* {values.action && (
				<PrivateRoute path={`${location.pathname}`} component={SaveEvent} />
			)} */}
		</>
	);
};

export default withRouter(EventRouter);
