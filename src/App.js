import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Auth, Logout, Home, EventList, Event } from "./pages";
import { Layout } from "./components/";
import { authActions, authSelectors } from "./state/auth/";
import { globalSelectors } from "./state/global";

const App = props => {
	useEffect(() => {
		props.tryAutoLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let routes = (
		<Switch>
			<Route path="/events/:id" component={Event} />
			<Route path="/events" component={EventList} />
			<Route path="/auth" component={Auth} />
			<Route path="/" exact component={Home} />
			<Route render={() => <h2>Page Not FOund!</h2>} />
		</Switch>
	);
	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/events/:id" component={Event} />
				<Route path="/events" component={EventList} />
				<Route path="/auth" component={Auth} />
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={Home} />
				<Route render={() => <h2>Page Not FOund!</h2>} />
			</Switch>
		);
	}

	return (
		<Layout isAuth={props.isAuthenticated} loading={props.loading}>
			{routes}
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: authSelectors.getIsAuthenticated,
	loading: globalSelectors.getLoading
});

const mapDispatchToProps = dispatch => ({
	tryAutoLogin: () => dispatch(authActions.autoLogin())
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
