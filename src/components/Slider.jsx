import React, { Component } from "react";
import { proxy } from "../../package.json";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { attendEvent, unattendEvent } from "../actions/organizationActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

//Silder for events of searched organization/team that was found and selected
class Slider extends Component {
  state = {
    isOpen: false,
    isGoing: false,
    event_selected: "",
    any_org: "",
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    attendEvent: PropTypes.func.isRequired,
    unattendEvent: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.setState({ isOpen: false });
    this.setState({ any_org: this.props.organization.selected });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.organization.selected != this.props.organization.selected) {
      this.setState({ any_org: this.props.organization.selected });
    }
  }

  handleShow = (event) => {
    this.setState({ event_selected: event });
    this.setState({ isOpen: true });
  };

  handleClose = (e) => {
    this.setState({ isOpen: false });
  };

  /*
  attend_event = (orgid, eventid, teamid) => {
    const userid = this.props.user.user._id;
    console.log(orgid, teamid, eventid, userid);
    this.setState({ isGoing: true });
    this.props.attendEvent(orgid, teamid, eventid, userid);
  };

  unattend_event = (orgid, eventid, teamid) => {
    const userid = this.props.user.user._id;
    console.log(orgid, teamid, eventid, userid);
    this.setState({ isGoing: false });
    this.props.unattendEvent(orgid, teamid, eventid, userid);
  };*/

  render() {
    const items = [];
    let any_org = this.state.any_org;
    if (this.props.team.selected_team.events) {
      this.props.team.selected_team.events.map((event) => {
        items.push(
          <div className="item" key={event.date_time + event._id}>
            {/*
            <div className="people-attending-heading">
              follow this team to see who is going to each event
            </div>
           
            <div
              onClick={() => this.handleShow(event)}
              className="attending-people"
            >
              {event.people_attending.slice(0, 3).map((user) => (
                <div key={user._id}>
                  <img
                    className="profileImg-attending"
                    src={`http://localhost:5000/public/${
                      user.profileImg ? user.profileImg : ""
                    }`}
                    alt="no"
                  />
                </div>
              ))}
              <div>...</div>
            </div>

            <div className="attend-unattend-button-area">
              <div>
                {event.people_attending.filter((user) => {
                  return user._id == this.props.user.user._id;
                }) != "" ? (
                  <button
                    onClick={() =>
                      this.unattend_event(any_org._id, event._id, any_org._id)
                    }
                    className="btn btn-outline-danger btn-sm"
                  >
                    unattend
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      this.attend_event(any_org._id, event._id, any_org._id)
                    }
                    className="btn btn-outline-success btn-sm"
                  >
                    attend
                  </button>
                )}
              </div>
            </div>*/}
            <div className="event-card-border">
              <div className="event-card-date">
                <div>
                  {moment(event.date_time).local(true).format("MM-DD-YYYY")}
                </div>
                <div>/</div>
                <div>{moment(event.date_time).local(true).format("HH:mm")}</div>
              </div>
              <div className="event-card-sport">
                <strong>{this.props.team.selected_team.sport}</strong>
              </div>
              <div className="event-card-opponent">
                <div>
                  <span className="mx-1">
                    {event.home_away == "Home" ? "vs." : "@"}
                  </span>
                  <span>{event.opponent}</span>
                </div>
                {event.link ? (
                  <div onClick={() => window.open(`${event.link}`)}>
                    <FontAwesomeIcon
                      className="delete-button"
                      icon={["fa", "video"]}
                      size="1x"
                    />
                  </div>
                ) : (
                  ""
                )}
                <img
                  className="organization-logo"
                  src={`${proxy}/public/${this.props.organization.allOrganizations
                    .filter((org) => {
                      return org.name == event.opponent;
                    })
                    .map((org) => org.logo)}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        );
      });
    }

    items.sort((a, b) => (a.key < b.key ? -1 : 1));
    let active = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i].key > moment().toISOString()) {
        active = i;
        i = items.length;
      }
    }
    if (active != 0) active = active - 1;

    return (
      <React.Fragment>
        <Modal
          backdrop="static"
          show={this.state.isOpen}
          onHide={this.handleClose}
        >
          <Modal.Header>
            <Modal.Title>Going</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.event_selected ? (
              this.state.event_selected.people_attending ? (
                this.state.event_selected.people_attending.map((user) => (
                  <div className="event-going-list" key={user._id}>
                    <img
                      className="organization-logo"
                      src={`${proxy}/public/${
                        user.profileImg ? user.profileImg : ""
                      }`}
                      alt="..."
                    />
                    <div>{user.name}</div>
                    <Button className="btn btn-primary" onClick={() => null}>
                      {/*follow user function*/}
                      follow
                    </Button>
                  </div>
                ))
              ) : (
                ""
              )
            ) : (
              <div></div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <AliceCarousel
          mouseTracking
          responsive={{
            0: {
              items: 1,
            },
            1024: {
              items: 3,
            },
          }}
          items={
            items /*this.props.team.selected_team.events.map((event) => (
          <div className="item">
            <div className="people-attending-heading">
              attending this event:
            </div>
            <div className="attending-people">
              <div>.</div>
              <div>.</div>
              <div>.</div>
              <div>...</div>
            </div>
            <div className="attend-unattend-button-area">
              <div>
                <button className="btn btn-outline-success">attend</button>
              </div>
              <div>
                <button className="btn btn-outline-danger">unattend</button>
              </div>
            </div>
            <div className="event-card-border">
              <div className="event-card-date">
                <div>{event.date_time.slice(0, 10)}</div>
                <div>/</div>
                <div>{event.date_time.slice(11, 16)}</div>
              </div>
              <div className="event-card-sport">
                <strong>{this.props.team.selected_team.sport}</strong>
              </div>
              <div className="event-card-opponent">
                <div>
                  <span className="mx-1">
                    {event.home_away == "Home" ? "vs." : "@"}
                  </span>
                  <span>{event.opponent}</span>
                </div>
                <img
                  className="organization-logo"
                  src={`http://localhost:5000/public/${this.props.organization.allOrganizations
                    .filter((org) => {
                      return org.name == event.opponent;
                    })
                    .map((org) => org.logo)}`}
                  alt=""
                />
              </div>
            </div>
          </div>
                  ))*/
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
  team: state.team,
});

export default connect(mapStateToProps, { attendEvent, unattendEvent })(Slider);
