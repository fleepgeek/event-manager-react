import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { Auth, Logout, EventList, Event } from "./pages";
import { Layout } from "./components/";
import Home from "./pages/Home/Home";
import { actions as authActions } from "./state/auth";

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/events/:id" component={Event} />
        <Route path="/events" component={EventList} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Home} />
        <Route render={() => <h2>Page Not FOund!</h2>} />
      </Switch>
    );
    if (this.props.isAuthenticated) {
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
