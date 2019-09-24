import React from "react";
import { Route, Switch } from "react-router-dom";

import { Auth } from "../pages";
// const Auth = React.lazy(() => import("../pages/Auth/Auth"));

const AuthRouter = () => {
	return (
		<Switch>
			{/* <React.Suspense fallback={<h3>Loading</h3>}>
				<Route path="/" component={Auth} />
			</React.Suspense> */}
			<Route path="/" component={Auth} />
		</Switch>
	);
};

export default AuthRouter;
