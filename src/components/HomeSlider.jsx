import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { proxy } from "../../package.json";
import {
  attendEvent,
  unattendEvent,
  getOrganization,
} from "../actions/organizationActions";
import { getEventAttendingUserList } from "../actions/eventActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

class HomeSlider extends Component {
  state = {
    teams_followed: "",
    isOpen: false,
    isGoing: false,
    any_org: [],
    event_selected: "",
    search: "",
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
    attendEvent: PropTypes.func.isRequired,
    unattendEvent: PropTypes.func.isRequired,
    getEventAttendingUserList: PropTypes.func.isRequired,
    getOrganization: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.setState({ teams_followed: this.props.user.user.teams_followed });
    this.setState({ any_org: this.props.organization.selected });
    this.setState({ isOpen: false });
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
    this.setState({ search: "" });
  };

  attend_event = (orgid, eventid, teamid) => {
    const userid = this.props.user.user._id;

    this.setState({ isGoing: true });
    this.props.attendEvent(orgid, teamid, eventid, userid);
  };

  unattend_event = (orgid, eventid, teamid) => {
    const userid = this.props.user.user._id;

    this.setState({ isGoing: false });
    this.props.unattendEvent(orgid, teamid, eventid, userid);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  openLink = (link, e) => {
    window.open(`${link}`);
  };

  render() {
    const items = [];
    let filtered_teams = this.props.organization.selectedOption;
    let any_org = this.state.any_org; //any followed organization: usually the first object
    let teams = any_org.teams;
    if (filtered_teams != undefined && teams != undefined) {
      teams = teams.filter((t) => filtered_teams.includes(t._id));
    }

    if (any_org && any_org.teams) {
      teams.map((team) => {
        if (
          (this.props.organization.homeCheckBox &&
            this.props.organization.awayCheckBox) ||
          (!this.props.organization.homeCheckBox &&
            !this.props.organization.awayCheckBox)
        ) {
          team.events.map((event) => {
            items.push(
              <div className="item" key={event.date_time + event._id}>
                <div className="people-attending-heading">
                  {event.people_attending
                    ? event.people_attending.filter(
                        (user) => user._id == this.props.user.user._id
                      ) != ""
                      ? `You & ${event.people_attending.length} others are attending
                      this event:`
                      : `${event.people_attending.length} attending this event:`
                    : ""}
                </div>
                <div
                  onClick={() => this.handleShow(event)}
                  className="attending-people"
                >
                  {/* show only the first 3 users that attend an event */}
                  {event.people_attending.slice(0, 3).map((user) => (
                    <div key={user._id}>
                      <img
                        className="profileImg-attending"
                        src={`${proxy}/public/${
                          user.profileImg ? user.profileImg : ""
                        }`}
                        alt=""
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
                      //follow button
                      <button
                        onClick={() =>
                          this.unattend_event(any_org._id, event._id, team._id)
                        }
                        className="btn btn-outline-danger btn-sm"
                      >
                        unattend
                      </button>
                    ) : (
                      //following button
                      <button
                        onClick={() =>
                          this.attend_event(any_org._id, event._id, team._id)
                        }
                        className="btn btn-outline-success btn-sm"
                      >
                        attend
                      </button>
                    )}
                  </div>
                </div>
                {/* Event Card */}
                <div className="event-card-border">
                  <div className="event-card-date">
                    <div>
                      {moment(event.date_time).local(true).format("MM-DD-YYYY")}
                    </div>
                    <div>/</div>
                    <div>
                      {moment(event.date_time).local(true).format("HH:mm")}
                    </div>
                  </div>
                  <div className="event-card-sport">
                    <strong>{team.sport}</strong>
                  </div>
                  <div className="event-card-opponent">
                    <div>
                      <span className="mx-1">
                        {event.home_away == "Home" ? "vs." : "@"}
                      </span>
                      <span>{event.opponent}</span>
                    </div>
                    {event.link ? (
                      <div onClick={(e) => this.openLink(event.link, e)}>
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
                <div className="amenities-home">
                  <div>
                    <b>Amenities</b>
                  </div>
                  {event.amenities.map((item) => {
                    return <div>{item}</div>;
                  })}
                </div>
              </div>
            );
          });
        } else if (
          this.props.organization.homeCheckBox &&
          !this.props.organization.awayCheckBox
        ) {
          team.events
            .filter((event) => {
              return event.home_away == "Home";
            })
            .map((event) => {
              items.push(
                <div className="item" key={event.date_time + event._id}>
                  <div className="people-attending-heading">
                    {event.people_attending
                      ? event.people_attending.filter(
                          (user) => user._id == this.props.user.user._id
                        ) != ""
                        ? `You & ${event.people_attending.length} others are attending
                      this event:`
                        : `${event.people_attending.length} attending this event:`
                      : ""}
                  </div>
                  <div
                    onClick={() => this.handleShow(event)}
                    className="attending-people"
                  >
                    {/* show only the first 3 users that attend an event */}
                    {event.people_attending.slice(0, 3).map((user) => (
                      <div key={user._id}>
                        <img
                          className="profileImg-attending"
                          src={`${proxy}/public/${
                            user.profileImg ? user.profileImg : ""
                          }`}
                          alt=""
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
                        //follow button
                        <button
                          onClick={() =>
                            this.unattend_event(
                              any_org._id,
                              event._id,
                              team._id
                            )
                          }
                          className="btn btn-outline-danger btn-sm"
                        >
                          unattend
                        </button>
                      ) : (
                        //following button
                        <button
                          onClick={() =>
                            this.attend_event(any_org._id, event._id, team._id)
                          }
                          className="btn btn-outline-success btn-sm"
                        >
                          attend
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Event Card */}
                  <div className="event-card-border">
                    <div className="event-card-date">
                      <div>
                        {moment(event.date_time)
                          .local(true)
                          .format("MM-DD-YYYY")}
                      </div>
                      <div>/</div>
                      <div>
                        {moment(event.date_time).local(true).format("HH:mm")}
                      </div>
                    </div>
                    <div className="event-card-sport">
                      <strong>{team.sport}</strong>
                    </div>
                    <div className="event-card-opponent">
                      <div>
                        <span className="mx-1">
                          {event.home_away == "Home" ? "vs." : "@"}
                        </span>
                        <span>{event.opponent}</span>
                      </div>
                      {event.link ? (
                        <div>
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
                  <div className="amenities-home">
                    <div>
                      <b>Amenities</b>
                    </div>
                    {event.amenities.map((item) => {
                      return <div>{item}</div>;
                    })}
                  </div>
                </div>
              );
            });
        } else if (
          !this.props.organization.homeCheckBox &&
          this.props.organization.awayCheckBox
        ) {
          team.events
            .filter((event) => {
              return event.home_away == "Away";
            })
            .map((event) => {
              items.push(
                <div className="item" key={event.date_time + event._id}>
                  <div className="people-attending-heading">
                    {event.people_attending
                      ? event.people_attending.filter(
                          (user) => user._id == this.props.user.user._id
                        ) != ""
                        ? `You & ${event.people_attending.length} others are attending
                      this event:`
                        : `${event.people_attending.length} attending this event:`
                      : ""}
                  </div>
                  <div
                    onClick={() => this.handleShow(event)}
                    className="attending-people"
                  >
                    {/* show only the first 3 users that attend an event */}
                    {event.people_attending.slice(0, 3).map((user) => (
                      <div key={user._id}>
                        <img
                          className="profileImg-attending"
                          src={`${proxy}/public/${
                            user.profileImg ? user.profileImg : ""
                          }`}
                          alt=""
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
                        //follow button
                        <button
                          onClick={() =>
                            this.unattend_event(
                              any_org._id,
                              event._id,
                              team._id
                            )
                          }
                          className="btn btn-outline-danger btn-sm"
                        >
                          unattend
                        </button>
                      ) : (
                        //following button
                        <button
                          onClick={() =>
                            this.attend_event(any_org._id, event._id, team._id)
                          }
                          className="btn btn-outline-success btn-sm"
                        >
                          attend
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Event Card */}
                  <div className="event-card-border">
                    <div className="event-card-date">
                      <div>
                        {moment(event.date_time)
                          .local(true)
                          .format("MM-DD-YYYY")}
                      </div>
                      <div>/</div>
                      <div>
                        {moment(event.date_time).local(true).format("HH:mm")}
                      </div>
                    </div>
                    <div className="event-card-sport">
                      <strong>{team.sport}</strong>
                    </div>
                    <div className="event-card-opponent">
                      <div>
                        <span className="mx-1">
                          {event.home_away == "Home" ? "vs." : "@"}
                        </span>
                        <span>{event.opponent}</span>
                      </div>
                      {event.link ? (
                        <div>
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
                  <div className="amenities-home">
                    <div>
                      <b>Amenities</b>
                    </div>
                    {event.amenities.map((item) => {
                      return <div>{item}</div>;
                    })}
                  </div>
                </div>
              );
            });
        }
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
        {/* ++++ People going Modal ++++ */}
        <Modal
          backdrop="static"
          show={this.state.isOpen}
          onHide={this.handleClose}
        >
          <Modal.Header>
            <Modal.Title>Going</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="search-box">
              <FontAwesomeIcon icon={["fa", "search"]} size="1x" />
              <input
                name="search"
                placeholder="Search Name"
                value={this.state.search}
                className="search-input"
                onChange={this.onChange}
                type="text"
                autocomplete="off"
              />
            </div>
            {this.state.event_selected ? (
              this.state.event_selected.people_attending ? (
                this.state.search ? (
                  this.state.event_selected.people_attending
                    .filter((user) => {
                      return user.name
                        .toLowerCase()
                        .startsWith(this.state.search.toLowerCase());
                    })
                    .map((user) => (
                      <React.Fragment key={user._id}>
                        <div className="event-going-list">
                          <div className="people-going">
                            <div>
                              <img
                                className="organization-logo"
                                src={`${proxy}/public/${
                                  user.profileImg ? user.profileImg : ""
                                }`}
                                alt="..."
                              />
                            </div>

                            <div>{user.name}</div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))
                ) : (
                  this.state.event_selected.people_attending.map((user) => (
                    <React.Fragment key={user._id}>
                      <div className="event-going-list">
                        <div className="people-going">
                          <div>
                            <img
                              className="organization-logo"
                              src={`${proxy}/public/${
                                user.profileImg ? user.profileImg : ""
                              }`}
                              alt="..."
                            />
                          </div>

                          <div>{user.name}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                )
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
          mouseTrackin
          activeIndex={active}
          responsive={{
            0: {
              items: 1,
            },
            520: {
              items: 3,
            },
          }}
          /* option: costum buttons
            renderPrevButton={() => {
            return (
              <FontAwesomeIcon
                icon={["fa", "chevron-left"]}
                size="1x"
                color="rgb(0,128,255)"
              />
            );
          }}
          renderNextButton={() => {
            return (
              <FontAwesomeIcon
                icon={["fa", "chevron-right"]}
                size="1x"
                color="rgb(0,128,255)"
              />
            );
          }}*/
          items={items}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
});

export default connect(mapStateToProps, {
  attendEvent,
  unattendEvent,
  getEventAttendingUserList,
  getOrganization,
})(HomeSlider);
