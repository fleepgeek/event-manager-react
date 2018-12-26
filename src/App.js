import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Layout from "./containers/Layout/Layout.js";
import Home from "./containers/Home/Home";
import Events from "./containers/Events/Events";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout";

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path="/events" component={Events} />
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={Home} />
                <Route render={() => <h2>Page Not FOund!</h2>} />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/events" component={Events} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={Home} />
                    <Route render={() => <h2>Page Not FOund!</h2>} />
                </Switch>
            );
        }

        return <Layout>{routes}</Layout>;
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default withRouter(connect(mapStateToProps)(App));
