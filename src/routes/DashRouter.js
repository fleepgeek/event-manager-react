import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { DashSettings, DashEvents, DashPeople, DashCalendar } from "../pages";

const DashRouter = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.path}/calendar`} component={DashCalendar} />
			<Route path={`${match.path}/events`} component={DashEvents} />
			<Route path={`${match.path}/people`} component={DashPeople} />
			<Route path={`${match.path}/settings`} component={DashSettings} />
			<Route path={`${match.path}`} render={() => <h2>Home</h2>} />
		</Switch>
	);
};

export default withRouter(DashRouter);
