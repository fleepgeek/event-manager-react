import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {actions as authActions} from "../../../state/auth";

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />;
    }
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(authActions.logout())
});

export default connect(
    null,
    mapDispatchToProps
)(Logout);
