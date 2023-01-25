import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getEventList,
  deleteEvent,
  updateEventLiveStreamLink,
} from "../actions/eventActions";
import { setCurrentTeam } from "../actions/teamActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";

class EventList extends Component {
  state = {
    date_time: "",
    competitor: "",
    ameniti: "",
    amenities: [],
    team_info: "",
    isOpen: false,
    streamLinkModal: false,
    selected_event: "",
    link: "",
    msg: "",
    selected_team: "",
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    getEventList: PropTypes.func.isRequired,
    setCurrentTeam: PropTypes.func.isRequired,
  };

  componentDidMount() {
    //get events from the selected team
    const teamid = this.props.team.selected_team;
    this.setState({ selected_team: teamid });
    /*const team = this.props.organization.selected.teams.filter((team) => {
      return team._id == teamid;
    });
    if (team != "")
      var object = team.reduce(
        (obj, item) => ((obj[item.key] = item.value), obj)
      );

    this.props.setCurrentTeam(object);*/
    this.props.getEventList(teamid._id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.team.selected_team !== this.props.team.selected_team) {
      this.setState({ selected_team: this.props.team.selected_team });
    }
  }

  updateLiveStreamLink = () => {
    const object = this.state.selected_event;
    const link = this.state.link;
    this.props.updateEventLiveStreamLink(object, link);
    this.handleClose();
  };

  handleShow = (orgid, teamid, eventid, currentLink) => {
    const object = { orgid, teamid, eventid };
    this.setState({ link: currentLink });
    this.setState({ selected_event: object });
    this.setState({ streamLinkModal: true });
  };

  handleClose = () => {
    this.setState({ selected_event: "" });
    this.setState({ link: "" });
    this.setState({ streamLinkModal: false });
  };

  deleteEvent = (orgid, teamid, eventid) => {
    const object = { orgid, teamid, eventid };
    this.props.deleteEvent(object);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const team = this.state.selected_team;
    const orgid = this.props.organization.selected._id;
    /*var object = "";
    const team = this.props.event.event_list.teams
      ? this.props.event.event_list.teams.filter((team) => {
          return team._id == teamid;
        })
      : "";
    if (team != "") {
      object = team.reduce((obj, item) => ((obj[item.key] = item.value), obj));
    }*/
    return (
      <React.Fragment>
        {team != ""
          ? team.events
              .sort((a, b) => (a.date_time < b.date_time ? -1 : 1))
              .map((event, index) => (
                <div key={event._id} className="event">
                  <div>
                    <div>
                      {moment(event.date_time)
                        .local(true)
                        .format("MM-DD-YYYY @HH:mm")}
                    </div>
                  </div>
                  <div>{event.opponent}</div>
                  <div>{event.home_away}</div>
                  <div>
                    {event.amenities.slice(0, 2).map((i) => (
                      <div key={i}>{i}</div>
                    ))}
                  </div>
                  <div
                    onClick={() =>
                      this.handleShow(orgid, team._id, event._id, event.link)
                    }
                  >
                    <FontAwesomeIcon
                      className="delete-button"
                      icon={["fa", "video"]}
                      size="1x"
                    />
                  </div>
                  <div
                    onClick={() => this.deleteEvent(orgid, team._id, event._id)}
                  >
                    <FontAwesomeIcon
                      className="delete-button"
                      icon={["fa", "trash"]}
                      size="1x"
                    />
                  </div>
                </div>
              ))
          : ""}
        <Modal
          backdrop="static"
          show={this.state.streamLinkModal}
          onHide={this.handleClose}
          props={this.state}
        >
          <Modal.Header>
            <Modal.Title>Livestream Link</Modal.Title>
            <Button variant="danger" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              name="link"
              id="link"
              className="amenities-item-input"
              placeholder="Paste http link"
              value={this.state.link}
              onChange={this.onChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.updateLiveStreamLink()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
  event: state.event,
  team: state.team,
});

export default connect(mapStateToProps, {
  getEventList,
  setCurrentTeam,
  deleteEvent,
  updateEventLiveStreamLink,
})(EventList);
