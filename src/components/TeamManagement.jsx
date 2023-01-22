import React, { Component } from "react";
import { connect } from "react-redux";
import TeamSchedule from "./TeamSchedule";
import PropTypes from "prop-types";
import BackButton from "./BackButton";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFilteredUsers } from "../actions/authActions";
import {
  sendTeamAdminRequest,
  getTeamAdminRequests,
  deleteTeamAdminRequestEntry,
} from "../actions/teamActions";

class TeamManagement extends Component {
  state = {
    any_org: "",
    selected_team: "",
    search: "",
    users: "",
    team_admin_requests_pending: "",
    team_admin_requests_accepted: "",
    team_admin_requests_declined: "",
    team_admins: "",
    isModalOpen: false,
    deleteModal: false,
    deleteModalUser: "",
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getTeamAdminRequests(
      this.props.user.user._id,
      this.props.team.selected_team._id
    );
    this.setState({ any_org: this.props.organization.selected });
    this.setState({ selected_team: this.props.team.selected_team });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.team.selected_team !== this.props.team.selected_team) {
      this.setState({ selected_team: this.props.team.selected_team });
    }
    if (prevProps.user.filtered_users !== this.props.user.filtered_users) {
      this.setState({ users: this.props.user.filtered_users });
    }
    if (
      prevProps.team.team_admin_requests_list !==
      this.props.team.team_admin_requests_list
    ) {
      this.setState({
        team_admin_requests_pending: this.props.team.team_admin_requests_list
          .filter((req) => {
            return req.status == 1;
          })
          .map((r) => r.user_recipient._id),
      });
      this.setState({
        team_admin_requests_accepted: this.props.team.team_admin_requests_list
          .filter((req) => {
            return req.status == 2;
          })
          .map((r) => r.user_recipient._id),
      });
      this.setState({
        team_admins: this.props.team.team_admin_requests_list
          .filter((req) => {
            return req.status == 2;
          })
          .map((r) => r),
      });
      this.setState({
        team_admin_requests_declined: this.props.team.team_admin_requests_list
          .filter((req) => {
            return req.status == 3;
          })
          .map((r) => r.user_recipient._id),
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.getFilteredUsers(this.state.search.toLowerCase());
  };

  handleShow = (e) => {
    e.preventDefault();
    this.setState({ isModalOpen: true });
  };

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ isModalOpen: false });
    this.setState({ search: "" });
  };

  handleDeleteModalShow = (admin_user) => {
    this.setState({ deleteModalUser: admin_user });
    this.setState({ deleteModal: true });
  };

  handleDeleteModalClose = (e) => {
    this.setState({ deleteModalUser: "" });
    this.setState({ deleteModal: false });
  };

  dropTeamAdmin = (id, teamid) => {
    this.props.deleteTeamAdminRequestEntry(id, teamid);
    this.props.getTeamAdminRequests(
      this.props.user.user._id,
      this.props.team.selected_team._id
    );
    this.handleDeleteModalClose();
  };

  /* sendTeamAdminRequest(sender: userid, receipt:
                            userid, org object: organizationid, team object: team )*/
  sendTeamAdminRequest = (
    request_by_user,
    user_recipient,
    organization,
    team
  ) => {
    const status = 1;

    this.props.sendTeamAdminRequest(
      request_by_user,
      user_recipient,
      organization,
      team._id,
      status
    );
    this.props.getTeamAdminRequests(
      this.props.user.user._id,
      this.props.team.selected_team._id
    );
  };

  render() {
    const org = this.state.any_org;
    const team = this.state.selected_team;
    const team_admins_pending = this.state.team_admin_requests_pending;
    const team_admins_accepted = this.state.team_admin_requests_accepted;
    const team_admins_declined = this.state.team_admin_requests_declined;
    const team_admins = this.state.team_admins;

    return (
      <React.Fragment>
        <BackButton styling="back-arrow" />
        <div className="d-inline-flex gap-3 mb-4 justify-content-center align-items-center">
          <img
            className="organization-logo"
            src={`http://localhost:5000/public/${org ? org.logo : ""}`}
            alt=""
          />
          <div className="organization-team-header">
            <h2>{org ? org.name : ""}</h2>
            <h3>{org ? team.sport : ""}</h3>
          </div>
        </div>
        <div>
          <p>Team Identification Number: {team._id}</p>
        </div>
        <div>
          <div className="team-management-team-admin-header">
            <div>
              <h5 className="mb-0">Head Team Admin(s)</h5>
            </div>
            <div className="btn btn-primary" onClick={this.handleShow}>
              +
            </div>
          </div>

          <Modal
            backdrop="static"
            show={this.state.isModalOpen}
            onHide={this.handleClose}
          >
            <Modal.Header>
              <Modal.Title>User</Modal.Title>
              <Button variant="danger" onClick={this.handleClose}>
                Close
              </Button>
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

              {this.state.search
                ? this.state.users
                  ? this.state.users.map((user) => (
                      <div key={user._id}>
                        <div className="admin-users">
                          <div className="admin-user-image-name">
                            <div>
                              {user.profileImg ? (
                                <img
                                  className="organization-logo"
                                  src={`http://localhost:5000/public/${
                                    user.profileImg ? user.profileImg : ""
                                  }`}
                                  alt="..."
                                />
                              ) : (
                                <div className="no-profileImg-logo">
                                  <FontAwesomeIcon icon={["fa", "user"]} />
                                </div>
                              )}
                            </div>
                            <div className="p-2">{user.name}</div>
                          </div>
                          <div>
                            {team_admins_pending.includes(user._id) ? (
                              <div className="btn btn-outline-primary p-2">
                                pending
                              </div>
                            ) : team_admins_accepted.includes(user._id) ? (
                              <div className="btn btn-outline-success p-2">
                                admin
                              </div>
                            ) : team_admins_declined.includes(user._id) ? (
                              <div className="btn btn-outline-danger p-2">
                                declined
                              </div>
                            ) : (
                              <div
                                className="btn btn-primary d-flex p-2"
                                onClick={() =>
                                  this.sendTeamAdminRequest(
                                    this.props.user.user._id,
                                    user._id,
                                    this.state.any_org,
                                    this.state.selected_team
                                  )
                                }
                              >
                                invite
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  : ""
                : ""}
            </Modal.Body>
          </Modal>

          <div className="team-management-team-admin-list">
            {/* Needs to be map */}
            {Array.isArray(team_admins)
              ? team_admins.map((a) => {
                  return (
                    <div className="team-management-team-admin-list-item">
                      <div>
                        <img
                          className="profile-pic-team-admin"
                          src={`http://localhost:5000/public/${
                            a.user_recipient.profileImg
                              ? a.user_recipient.profileImg
                              : ""
                          }`}
                          alt="..."
                        />
                      </div>
                      <div>{a.user_recipient.name}</div>
                      <button
                        onClick={() => {
                          this.handleDeleteModalShow(a);
                        }}
                        className="btn-close"
                      ></button>
                    </div>
                  );
                })
              : ""}

            <Modal
              backdrop="static"
              show={this.state.deleteModal}
              onHide={this.handleDeleteModalClose}
            >
              <Modal.Header>
                <Modal.Title>User</Modal.Title>
                <Button variant="danger" onClick={this.handleDeleteModalClose}>
                  Cancel
                </Button>
              </Modal.Header>
              <Modal.Body>
                <p>
                  Are you sure you want to drop{" "}
                  {this.state.deleteModalUser
                    ? this.state.deleteModalUser.user_recipient.name
                    : ""}{" "}
                  as an admin ?
                </p>
                <button
                  onClick={() => this.handleDeleteModalClose()}
                  className="btn btn-danger"
                >
                  No
                </button>
                <button
                  onClick={() =>
                    this.dropTeamAdmin(this.state.deleteModalUser._id)
                  }
                  className="btn btn-success"
                >
                  Yes
                </button>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <div>
          <h3 className="mt-5">Schedule/Amendities</h3>
        </div>
        <TeamSchedule />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
  team: state.team,
});

export default connect(mapStateToProps, {
  getFilteredUsers,
  sendTeamAdminRequest,
  getTeamAdminRequests,
  deleteTeamAdminRequestEntry,
})(TeamManagement);
