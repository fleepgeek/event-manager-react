import React from "react";
import { Link } from "react-router-dom";
// import { Spinner } from "reactstrap";

import { AuthRouter } from "../routes";
// const AuthRouter = React.lazy(() => import("../routes/AuthRouter"));

const AuthApp = () => {
	return (
		<div>
			<Link to="/">
				<h2>Eventio</h2>
			</Link>
			{/* <React.Suspense fallback={<h3>Loading...</h3>}> */}
			{/* <React.Suspense fallback={<Spinner />}> */}
			<AuthRouter />
			{/* </React.Suspense> */}
		</div>
	);
};

export default AuthApp;
