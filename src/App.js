import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Events from "./pages/Events/Events";
import { Auth, Logout } from "./pages";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import * as authActions from "./state/auth";

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
  }

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

    return <Layout isAuth={this.props.isAuthenticated}>{routes}</Layout>;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  tryAutoLogin: () => dispatch(authActions.authAutoLogin())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
