//currently not used
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EventCard extends Component {
  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
  };
  render() {
    return (
      <React.Fragment>
        {this.props.team.selected_team.events.map((event) => (
          <div className="event-card-layout">
            <div className="attend-area"></div>
            <div className="event-card-date">
              <span>{event.date_time}</span>
              <span> / </span>
              <span>{event.date_time}</span>
            </div>
            <div className="event-card-sport">
              <strong>{this.props.team.selected_team.sport}</strong>
            </div>
            <div className="event-card-opponent">
              <div className="mb"></div>

              <div>
                {event.home_away == "Home" ? "vs." : "@"}
                <p>{event.opponent}</p>
              </div>
              <img src="" alt="logo" />
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
  team: state.team,
});

export default connect(mapStateToProps, {})(EventCard);
