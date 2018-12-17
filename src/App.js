import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./containers/Layout/Layout.js";
import Home from "./containers/Home/Home";
import Events from "./containers/Events/Events";

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/events" component={Events} />
      </Switch>
    );

    return <Layout>{routes}</Layout>;
  }
}

export default App;
