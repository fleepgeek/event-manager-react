import React, { Component } from "react";
import { connect } from "react-redux";
import { actions as eventActions } from "../../state/eventList";
import EventListComponent from "./EventListComponent";

class EventListContainer extends Component {
  componentDidMount() {
    if (this.props.events.length === 0) {
      this.props.onfetchEvents();
    }
  }

  render() {
    return <EventListComponent {...this.props} />;
  }
}

const mapStateToProps = state => ({
  // events: state.events,
  events: state.eventList.events,
  loading: state.eventList.loading
});

const mapDispatchToProps = dispatch => ({
  // onGetEvents: () => dispatch(Actions.Creators.start()),
  onfetchEvents: () => dispatch(eventActions.fetchEvents())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListContainer);
