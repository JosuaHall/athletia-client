import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createEvent,
  getEventList,
  addAmeniti,
  removeAmeniti,
} from "../actions/eventActions";
import { Alert } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { setCurrentTeam } from "./../actions/teamActions";

class CreateEvent extends Component {
  state = {
    date_time: "",
    competitor: "",
    home_away: "",
    ameniti: "",
    amenities: [],
    isOpen: false,
    msg: "",
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    removeAmeniti: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    getEventList: PropTypes.func.isRequired,
    addAmeniti: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.event.event_list !== this.props.event.event_list) {
      var team = this.props.event.event_list.filter((team) => {
        return team._id == this.props.team.selected_team._id;
      });
      if (team != "")
        var object = team.reduce(
          (obj, item) => ((obj[item.key] = item.value), obj)
        );

      this.props.setCurrentTeam(object);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ msg: "" });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { date_time, competitor, home_away } = this.state;
    const amenities = this.props.event.amenities;
    const teamid = this.props.team.selected_team._id;

    if (date_time == "" || competitor == "" || home_away == "") {
      this.setState({ msg: "Please Enter All Fields" });
    } else {
      this.setState({ msg: "Event Created" });
      const event = {
        teamid,
        date_time,
        competitor,
        home_away,
      };
      this.props.createEvent(event, amenities);
      this.updateEventList(teamid);
    }
  };

  updateEventList = (teamid) => {
    this.props.getEventList(teamid);
  };

  handleShow = (e) => {
    e.preventDefault();
    this.setState({ isOpen: true });
  };

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ isOpen: false });
  };

  addItem = (e) => {
    e.preventDefault();
    const i = this.state.ameniti;
    if (i == "") {
      this.setState({ msg: "Invalid Input" });
    } else {
      this.props.addAmeniti(i);

      this.setState({ ameniti: "" });
    }
  };

  removeItem = (index) => {
    const updated = this.props.event.amenities.filter((item, itemIndex) => {
      return itemIndex !== index;
    });
    this.props.removeAmeniti(updated);
    this.setState({ msg: "" });
  };

  render() {
    const org = this.props.organization.allOrganizations;
    return (
      <React.Fragment>
        {this.state.msg ? (
          <Alert
            className="mt-4"
            color={this.state.msg == "Event Created" ? "success" : "warning"}
          >
            {this.state.msg}
          </Alert>
        ) : (
          ""
        )}
        <div className="schedule-create-event">
          <div>
            <input
              type="datetime-local"
              id="date_time"
              name="date_time"
              min="2022-02-01T00:00"
              max="2090-01-01T00:00"
              onChange={this.onChange}
            />
          </div>
          <div>
            <select
              name="competitor"
              id="competitor"
              placeholder="Select an opponent"
              onChange={this.onChange}
            >
              <option selected="selected" disabled>
                Select Opponent
              </option>
              {org
                ? org.map((orga) => {
                    return <option value={orga.name}>{orga.name}</option>;
                  })
                : ""}
            </select>
          </div>
          <div>
            <select
              name="home_away"
              id="home_away"
              placeholder="Select an option"
              onChange={this.onChange}
            >
              <option selected="selected" disabled>
                Home/Away?
              </option>
              <option value="Home">Home</option>
              <option value="Away">Away</option>
            </select>
          </div>
          <div>
            <button className="edit-button" onClick={this.handleShow}>
              <FontAwesomeIcon icon={["fa", "pen"]} size="1x" />
              <span className=""> Amendities</span>
            </button>

            <Modal
              show={this.state.isOpen}
              onHide={this.handleShow}
              props={this.state}
            >
              <Modal.Header>
                <Modal.Title>Amenities List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.msg ? (
                  <Alert color="danger">{this.state.msg}</Alert>
                ) : null}
                <form
                  id="form"
                  className="amenities-modal"
                  onSubmit={this.addItem}
                >
                  <input
                    type="text"
                    name="ameniti"
                    id="amediti"
                    className="amenities-item-input"
                    placeholder="Enter Item"
                    value={this.state.ameniti}
                    onChange={this.onChange}
                  />
                  <Button variant="secondary" type="submit">
                    +
                  </Button>
                </form>

                {this.props.event.amenities.map((item, index) => (
                  <div className="ameniti-item" key={index}>
                    <Button
                      className="btn btn-danger"
                      onClick={() => this.removeItem(index)}
                    >
                      x
                    </Button>
                    <div>{item}</div>
                  </div>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <button onClick={this.onSubmit} className="btn btn-success mb-5">
          Add Event
        </button>
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
  createEvent,
  getEventList,
  addAmeniti,
  removeAmeniti,
  setCurrentTeam,
})(CreateEvent);
