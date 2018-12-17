import React, { Component } from 'react';
import { connect } from 'react-redux'
// import * as actions from "../../store/actions";
// import Actions from "../../store/actions/events";
// import * as actionTypes from "../../store/actions/actionTypes";
import * as actions from "../../store/actions";

class Events extends Component {
    componentDidMount() {
        if(this.props.events.length === 0){
            this.props.onGetEvents();
        }
    }

    render() {
        let eventsList = (<h2>...Loading</h2>)
        if(!this.props.loading){
            eventsList = (
                <ul>
                    {this.props.events.map(e => (<li key={e.id}>{e.title}</li>))}
                </ul>
            )
        }
        return (
            <div>
                <h2>Events</h2>
                {eventsList}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // events: state.events,
    events: state.events.events,
    loading: state.events.loading
});

const mapDispatchToProps = dispatch => ({
    // onGetEvents: () => dispatch(Actions.Creators.start()),
    onGetEvents: () => dispatch(actions.fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);