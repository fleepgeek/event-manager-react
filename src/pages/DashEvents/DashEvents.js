import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { DashboardPageHeader } from "../../components";

const DashEvents = ({ match, history }) => {
	useEffect(() => {
		if (match.path === "/dashboard/events") {
			history.replace(`${match.path}/attending`);
		}
	}, [match.path, history]);
	return (
		<>
			<DashboardPageHeader
				pageTitle="Events"
				links={[
					{ text: "Attending", to: `${match.url}/attending` },
					{ text: "My Events", to: `${match.url}/myevents` }
				]}
			/>
			<Switch>
				<Route
					path={`${match.path}/attending`}
					render={() => <h2>Attending</h2>}
					exact
				/>
				<Route
					path={`${match.path}/myevents`}
					render={() => <h2>Created</h2>}
					exact
				/>
			</Switch>
		</>
	);
};

export default DashEvents;
