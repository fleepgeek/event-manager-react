import React, { Component } from "react";
import { connect } from "react-redux";
import "./Events.scss";
import * as actions from "../../store/actions";
import EventCard from "../../components/EventCard/EventCard";

class Events extends Component {
    componentDidMount() {
        if (this.props.events.length === 0) {
            this.props.onGetEvents();
        }
    }

    render() {
        // let eventsList = <h2>...Loading</h2>;
        // if (!this.props.loading) {
        //     eventsList = (
        //         <ul>
        //             {this.props.events.map(e => (
        //                 <li key={e.title}>{e.title}</li>
        //             ))}
        //         </ul>
        //     );
        // }
        return (
            <div className="container">
                <div className="header">
                    <h2>Events</h2>
                </div>
                <div className="content">
                    <div className="events-list">
                        {this.props.events.map(e => (
                            <EventCard key={e.title} event={e} />
                        ))}
                    </div>
                </div>
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
    onGetEvents: () => dispatch(actions.fetchEvents())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events);
