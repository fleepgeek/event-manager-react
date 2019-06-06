import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { DashboardPageHeader } from "../../components";

const Settings = ({ match, history }) => {
	useEffect(() => {
		if (match.path === "/dashboard/settings") {
			history.replace(`${match.path}/profile`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<DashboardPageHeader
				pageTitle="Settings"
				links={[
					{ text: "Profile", to: `${match.url}/profile` },
					{ text: "Account", to: `${match.url}/account` }
				]}
			/>
			<Switch>
				<Route
					path={`${match.path}/account`}
					render={() => <h2>Account</h2>}
					exact
				/>
				<Route
					path={`${match.path}/profile`}
					render={() => <h2>Profile</h2>}
					exact
				/>
				{/* <Route render={() => <h2>Profile</h2>} /> */}
			</Switch>
		</>
	);
};

export default Settings;
