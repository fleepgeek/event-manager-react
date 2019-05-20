import React from "react";
import { Navbar, ProgressBar } from "../components";

const Layout = ({ children, isAuth, loading }) => {
	return (
		<div>
			{loading && <ProgressBar />}
			<Navbar isAuth={isAuth} />
			{children}
		</div>
	);
};

export default Layout;
