import React from "react";
import { DashNav } from "../components";
import DashRouter from "../routes/DashRouter";

const DashApp = ({ match }) => {
	return (
		<div>
			<DashNav />
			<DashRouter />
		</div>
	);
};

export default DashApp;
