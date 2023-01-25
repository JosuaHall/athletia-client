import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "reactstrap";
import store from "../store";
import { loadUser } from "../actions/authActions";
import {
  getAllOrganizations,
  setCurrentOrganization,
} from "./../actions/organizationActions";
import { setCurrentTeam } from "./../actions/teamActions";
import { Link } from "react-router-dom";
import HomeCards from "./HomeCards";
import { proxy } from "../../package.json";
class Home extends Component {
  state = {
    organization: "",
    sport: "",
    search: "",
    filteredOrg: [],
    selectedOrg: "",
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
    getAllOrganizations: PropTypes.func.isRequired,
    setCurrentOrganization: PropTypes.func.isRequired,
    setCurrentTeam: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAllOrganizations(); //get all existing organizations -> set redux: organization.allOrganizations
    store.dispatch(loadUser()); //load user that is logged in -> redux: auth.user
  }

  //find matching organization names
  searchOrganization = () => {
    const searchstring = this.state.search.toLowerCase();
    const filteredOrg = this.props.organization.allOrganizations.filter(
      (organization) => {
        return organization.name.toLowerCase().startsWith(searchstring);
      }
    );

    this.setState({ filteredOrg });
  };

  onChange = (e) => {
    this.setState({ selectedOrg: "" });
    this.setState({ [e.target.name]: e.target.value });
    this.searchOrganization(); //search all organizations that start with search-string
  };

  //when user selects organization in search options
  selectOrg = (org) => {
    this.props.setCurrentOrganization(org); //set redux: organization.selected = selected organization object
    this.setState({ selectedOrg: org });
    this.setState({ search: org.name });
  };

  render() {
    const filteredOrg = this.state.filteredOrg;

    return (
      <div>
        <h1 className="heading">Athletia</h1>
        <div className="search-area">
          <div className="search-box">
            <FontAwesomeIcon icon={["fa", "search"]} size="1x" />
            <input
              name="search"
              placeholder="Search Team"
              value={this.state.search}
              className="search-input"
              onChange={this.onChange}
              type="text"
              autoComplete="off"
            />
          </div>

          <ul className="search-field">
            {this.state.search == "" || this.state.selectedOrg //nothing searched or no organization selected
              ? ""
              : filteredOrg.map(
                  (
                    org // display found organizations
                  ) => (
                    <li
                      key={org._id}
                      className="search-field-option"
                      onClick={() => this.selectOrg(org)}
                    >
                      <div>
                        <img
                          className="search-field-logo"
                          src={`${proxy}/public/${org.logo}`}
                          alt=""
                        />
                      </div>
                      <div>{org.name}</div>
                    </li>
                  )
                )}
          </ul>
        </div>
        {this.state.selectedOrg ? ( //organization selected ?
          <div className="select-team-area-homepage">
            {this.state.selectedOrg.teams == "" ? ( //check if selected organization has teams?
              <Alert color="warning">
                <h5>There are currently no teams in this organization</h5>
              </Alert>
            ) : (
              <h5>Select a team</h5>
            )}
            <div className="sport-card-homepage-area">
              {this.state.selectedOrg.teams //in case selected organization has teams
                ? this.state.selectedOrg.teams.map(
                    (
                      team //display teams list links from selectedOrg in state: link clicked? -> render EventCards
                    ) => (
                      <Link
                        key={team._id}
                        onClick={() => {
                          this.props.setCurrentTeam(team); //set redux state: team.selected_team to team object
                        }}
                        to={`/schedule/${this.state.selectedOrg._id}/${team._id}`}
                        className="sport-card-homepage"
                      >
                        <img
                          className="search-field-logo"
                          src={`${proxy}/public/${this.state.selectedOrg.logo}`}
                          alt=""
                        />
                        <div>{team.sport}</div>
                      </Link>
                    )
                  )
                : ""}
            </div>
          </div>
        ) : this.props.user.user.organizations_followed == "" ? ( //check if user follows any teams? redux: auth.user.teams_followed
          <div className="no-teams-followed-homepage">
            <div>
              <FontAwesomeIcon icon={["fa", "user"]} size="1x" />
            </div>
            <div>You are currently not following any organizations</div>
          </div>
        ) : this.props.organization.allOrganizations != "" ? (
          <HomeCards /> //if user follows teams -> display HomeCards
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
});

export default connect(mapStateToProps, {
  getAllOrganizations,
  setCurrentOrganization,
  setCurrentTeam,
  loadUser,
})(Home);
