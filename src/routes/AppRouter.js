import React from "react";
import { Route, Switch } from "react-router-dom";
import { EventApp } from "../layouts";
// import PrivateRoute from "./PrivateRoute";
// import { CreateEvent } from "../pages";
const AppRouter = props => {
	return (
		<Switch>
			<Route path="/terms" render={() => <h2>Terms & Conditions</h2>} />

			<Route component={EventApp} />
			{/* <PrivateRoute path="/event/create" component={CreateEvent} /> */}
		</Switch>
	);
};

export default AppRouter;
