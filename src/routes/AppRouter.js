import React from "react";
import { Route, Switch } from "react-router-dom";
import { EventApp } from "../layouts";

const AppRouter = props => {
	return (
		<Switch>
			<Route path="/terms" render={() => <h2>Terms & Conditions</h2>} />
			<Route component={EventApp} />
		</Switch>
	);
};

export default AppRouter;
