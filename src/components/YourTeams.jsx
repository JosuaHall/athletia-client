import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loadTeamAdminRequests } from "../actions/teamActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { acceptRequest } from "../actions/teamActions";
import { setCurrentOrganization } from "./../actions/organizationActions";
import { setCurrentTeam } from "./../actions/teamActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class YourTeams extends Component {
  state = { requests: "", selected_team: "" };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.loadTeamAdminRequests(this.props.user.user._id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.team.team_admin_requests_list !==
      this.props.team.team_admin_requests_list
    ) {
      this.setState({ requests: this.props.team.team_admin_requests_list });
    }
    if (
      prevProps.team.team_admin_request !== this.props.team.team_admin_request
    ) {
      this.props.loadTeamAdminRequests(this.props.user.user._id);
    }
  }

  acceptRequest = (id) => {
    this.props.acceptRequest(id);
  };

  setCurrentOrganization = (org, teamid) => {
    {
      org.teams
        .filter((t) => teamid == t._id)
        .map((i) => {
          this.props.setCurrentTeam(i);
        });
    }
    this.props.setCurrentOrganization(org);
  };

  render() {
    const requests = this.state.requests;

    return (
      <div>
        <h5 className="mb-4">Your Team(s)</h5>
        {requests ? (
          requests
            .filter((r) => r.status == 2)
            .map((r) => (
              <div key={r._id} className="your-team-item mb-2">
                <div className="your-team-item-left">
                  <img
                    src={`${r.organization.logo ? r.organization.logo : ""}`}
                    alt=""
                  />

                  <strong>{r.organization.name}</strong>
                  {r.organization.teams
                    .filter((t) => r.team == t._id)
                    .map((i) => {
                      return <div>{i.sport}</div>;
                    })}
                </div>
                <div>
                  <Link
                    onClick={() =>
                      this.setCurrentOrganization(r.organization, r.team)
                    }
                    to={`/your/team/management/${r.team}/${this.props.user.user._id}`}
                    className="btn btn-outline-primary"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
        ) : (
          <div>You are currently not an admin of a team</div>
        )}

        <h5 className="my-4">Notifications</h5>
        {requests ? (
          requests
            .filter((r) => r.status == 1)
            .map((r) => (
              <div key={r._id} className="your-team-item">
                <div className="your-team-item-left">
                  <img src={`${r.organization.logo}`} alt="" />
                  <div className="d-flex">
                    <div className="mx-1">
                      <strong>{r.organization.name}</strong>
                    </div>
                    {r.organization.teams
                      .filter((t) => r.team == t._id)
                      .map((i) => {
                        return (
                          <div>
                            <strong>{i.sport}</strong>
                          </div>
                        );
                      })}
                  </div>
                  <div>invited you to be a team admin</div>
                </div>
                <div>
                  <div onClick={() => null} className="btn btn-outline-danger">
                    x
                  </div>
                  <button
                    onClick={() => this.acceptRequest(r._id)}
                    className="btn btn-primary"
                  >
                    <FontAwesomeIcon icon={["fa", "check"]} size="1x" />
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div>You do not have any recent Notifications</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
  team: state.team,
});

export default connect(mapStateToProps, {
  loadTeamAdminRequests,
  acceptRequest,
  setCurrentOrganization,
  setCurrentTeam,
})(YourTeams);
