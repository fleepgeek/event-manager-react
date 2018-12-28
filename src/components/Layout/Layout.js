import React, { Component } from "react";
import { connect } from 'react-redux'
import Navbar from "../../components/Navbar/Navbar";

class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar isAuth={this.props.isAuthenticated} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
