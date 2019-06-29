import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { DashSettings, DashEvents, DashPeople } from "../";

const DashboardComponent = ({ match }) => {
	return (
		<div>
			<DashboardNav />
			<Switch>
				<Route path={`${match.path}/events`} component={DashEvents} />
				<Route path={`${match.path}/people`} component={DashPeople} />
				<Route
					path={`${match.path}/calendar`}
					render={() => <h2>Calendar</h2>}
				/>
				<Route path={`${match.path}/settings`} component={DashSettings} />
				<Route path={`${match.path}`} render={() => <h2>Home</h2>} />
			</Switch>
		</div>
	);
};

export default DashboardComponent;
