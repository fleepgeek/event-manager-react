import React from "react";
import { Route, Switch } from "react-router-dom";

// import { EventApp, AuthApp } from "../layouts";
// import { EventApp } from "../layouts";
const AuthApp = React.lazy(() => import("../layouts/AuthApp"));
const EventApp = React.lazy(() => import("../layouts/EventApp"));

const AppRouter = props => {
	return (
		<>
			<React.Suspense fallback={<div>Please Wait...</div>}>
				<Switch>
					<Route path="/auth" component={AuthApp} />
					<Route exact component={EventApp} />
				</Switch>
			</React.Suspense>
		</>
	);
};

export default AppRouter;
