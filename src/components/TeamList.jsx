import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getOrganizationList,
  getOrganization,
} from "../actions/organizationActions";
import { setCurrentTeam, deleteTeam } from "../actions/teamActions";
import { getEventList } from "../actions/eventActions";
import { Link } from "react-router-dom";

class TeamList extends Component {
  state = {
    team_list: [],
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    getOrganizationList: PropTypes.func.isRequired,
    setCurrentTeam: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.team.team_list = this.props.organization.selected.teams;
    this.setState({ team_list: this.props.organization.selected.teams });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.team_list !== this.props.team.team_list) {
      this.setState({ team_list: this.props.team.team_list });
      var orgid = this.props.organization.selected._id;
      this.props.getOrganization(orgid);
    }
  }

  setCurrentTeam = (id) => {
    this.props.setCurrentTeam(id);
  };

  deleteTeam = (org, id) => {
    const object = { org, id };
    this.props.deleteTeam(object);
  };

  render() {
    const teams = this.state.team_list;
    return (
      <React.Fragment>
        <div className="team-list">
          <h6>Your Organization's Sport Team</h6>
          <h6>Delete</h6>
          <h6>Manage</h6>
        </div>
        <ul className="p-0 m-0">
          {teams.map((team) => (
            <div key={team._id} className="team-list-container-item">
              <div>{team.sport}</div>
              <div>
                <div
                  onClick={() =>
                    this.deleteTeam(
                      this.props.organization.selected._id,
                      team._id
                    )
                  }
                >
                  <FontAwesomeIcon
                    className="delete-button"
                    icon={["fa", "trash"]}
                    size="1x"
                  />
                </div>
              </div>
              <div>
                <Link
                  onClick={() => this.setCurrentTeam(team)}
                  to={`/setup/team/${team._id}`}
                  className="edit-button"
                >
                  <FontAwesomeIcon icon={["fa", "pen"]} size="1x" />
                </Link>
              </div>
            </div>
          ))}
        </ul>
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
  getOrganizationList,
  setCurrentTeam,
  getEventList,
  deleteTeam,
  getOrganization,
})(TeamList);
