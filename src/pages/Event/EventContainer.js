import React, { Component } from "react";
import { connect } from "react-redux";
import { actions as eventActions } from "../../state/event";
import EventComponent from "./EventComponent";


class EventContainer extends Component {
  componentDidMount() {
    const { match, event, onGetEvent } = this.props;
    if (+match.params.id !== event.id) {
      onGetEvent(this.props.match.params.id);
    }
  }

  render() {
    return <EventComponent {...this.props} />
  }
}

const mapStateToProps = state => ({
  event: state.event.event,
  loading: state.event.loading
});

const mapDispatchToProps = dispatch => ({
  onGetEvent: id => dispatch(eventActions.getEvent(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer);
