import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomeSlider from "./HomeSlider";
import Select from "react-select";
import { proxy } from "../../package.json";

import {
  followTeam,
  unfollowTeam,
  isTeamFollowed,
  setOrganizationsFollowed,
  setTeamsFollowed,
  selectFollowedOrganization,
} from "./../actions/authActions";
import {
  getOrganization,
  setCurrentOrganization,
  setFilterForEvents,
} from "./../actions/organizationActions";

class HomeCards extends Component {
  state = {
    followed: true,
    teams_followed_list: [],
    org_followed_list: [],
    org_filtered: "",
    homeCheckbox: false,
    awayCheckbox: false,
    selectedOption: "",
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    followTeam: PropTypes.func.isRequired,
    unfollowTeam: PropTypes.func.isRequired,
    setOrganizationsFollowed: PropTypes.func.isRequired,
    getOrganization: PropTypes.func.isRequired,
    setTeamsFollowed: PropTypes.func.isRequired,
    selectFollowedOrganization: PropTypes.func.isRequired,
    setCurrentOrganization: PropTypes.func.isRequired,
    setFilterForEvents: PropTypes.func.isRequired,
  };

  componentDidMount() {
    var organizations_followed = this.props.user.user.organizations_followed; //get organizations followed list
    var followed_teams = this.props.user.user.teams_followed;

    this.setState({
      teams_followed_list: followed_teams,
      org_followed_list: organizations_followed,
    });
    const first = organizations_followed[0]; //set the first organization as selected
    this.props.getOrganization(first._id); //getOrganization sets the first followed organization
    this.setState({ org_filtered: first });

    this.props.setTeamsFollowed(followed_teams);
    this.props.setOrganizationsFollowed(organizations_followed);
    this.props.selectFollowedOrganization(first);

    this.setState({ followed: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.org_filtered != this.state.org_filtered) {
      //const userid = this.props.user.user._id;
      this.props.setCurrentOrganization(this.state.org_filtered);
      this.setState({ org_filtered: this.state.org_filtered });
      const orgid = this.state.org_filtered._id;

      this.props.getOrganization(orgid); //sets the selected organization in redux > organization > selected
    }

    if (prevState.followed != this.state.followed) {
      const userid = this.props.user.user._id;
      const orgid = this.props.organization.selected._id;
      const teamid = this.props.team.selected_team._id;

      if (this.state.followed) {
        //if follow clicked
        this.props.followTeam(userid, orgid, teamid); //auth action: followTeam -> updates redux store: auth.user object
      } else {
        this.props.unfollowTeam(userid, orgid, teamid); //auth action: unfollowTeam -> updates redux store: auth.user object
      }
    }

    if (
      prevState.homeCheckbox != this.state.homeCheckbox ||
      prevState.awayCheckbox != this.state.awayCheckbox ||
      prevState.selectedOption != this.state.selectedOption
    ) {
      var teams_filtered = this.state.selectedOption
        ? this.state.selectedOption.map((e) => {
            return e.value;
          })
        : "";
      const filter = {
        home: this.state.homeCheckbox,
        away: this.state.awayCheckbox,
        teams: teams_filtered,
      };
      this.props.setFilterForEvents(filter);
    }
  }

  follow = () => {
    this.setState({ followed: !this.state.followed });
  };

  onChange = (e) => {
    //this.props.getOrganization(e.target.value);

    const selected_org = this.state.org_followed_list.find((org) => {
      return org._id == e.target.value;
    });

    this.setState({ [e.target.name]: selected_org });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  homeFilterChange = (e) => {
    this.setState({ homeCheckbox: !this.state.homeCheckbox });
  };

  awayFilterChange = (e) => {
    this.setState({ awayCheckbox: !this.state.awayCheckbox });
  };

  render() {
    const first_followed_org = this.state.org_filtered; // org_filtered first organization from org_followed list
    //const org = this.props.organization.selected;

    /* teams options */
    const options = this.state.org_filtered.teams;
    var teams = options
      ? options.map((e) => {
          return {
            value: e._id,
            label: e.sport,
          };
        })
      : "";

    const { selectedOption } = this.state;
    /* ******************** */
    return (
      <React.Fragment>
        <div>
          {first_followed_org ? ( //truthy if user followed at least one organization
            <div className="homepage-team-header">
              <div className="d-flex">
                <div>
                  <img
                    className="organization-logo"
                    src={`${proxy}/public/${
                      first_followed_org ? first_followed_org.logo : ""
                    }`}
                    alt=""
                  />
                </div>
                <div className="organization-team-header-homepage">
                  <h5 className="px-2">
                    {first_followed_org ? first_followed_org.name : ""}
                  </h5>
                </div>
              </div>
              <div>
                <button
                  onClick={this.follow}
                  className={
                    this.state.followed
                      ? "btn btn-outline-primary btn-small px-4 py-1"
                      : "btn btn-primary btn-small px-4 py-1"
                  }
                >
                  {this.state.followed ? "following" : "follow"}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="events-filter-header">
            <div>
              <h3 className="events-heading">Events</h3>
            </div>

            <div className="select-org-followed">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="homeCheckbox"
                  value=""
                  id="homeCheckbox"
                  onClick={this.homeFilterChange}
                />
                <label className="form-check-label" for="homeCheckbox">
                  Home
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="awayCheckbox"
                  value=""
                  id="awayCheckbox"
                  onClick={this.awayFilterChange}
                />
                <label className="form-check-label" for="awayCheckbox">
                  Away
                </label>
              </div>
            </div>
            <div className="custom-select">
              <select
                style={{
                  height: "2.4em",
                  border: "solid #cccccc 1px",
                  "border-radius": "5px",
                  color: "#808080",
                  padding: "0",
                  "margin-right": "1em",
                }}
                name="org_filtered"
                placeholder="Selected..."
                onChange={this.onChange}
              >
                <option selected="selected" disabled>
                  Select...
                </option>
                {/*select org*/}
                {this.state.org_followed_list != ""
                  ? this.state.org_followed_list.map((org) => {
                      return (
                        <option
                          key={org._id}
                          /*disabled={
                    org._id == first_followed_org._id ? true : false
                  }*/
                          value={org._id}
                        >
                          {org.name}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </div>

            <div className="select-team-dropdown">
              {/* ---------DropDown----Select-----Team--------*/}
              <Select
                isMulti={true}
                value={selectedOption}
                onChange={this.handleChange}
                options={teams}
              />
              {/* ---------DropDown----End-------------------*/}
            </div>
          </div>

          {first_followed_org != "" ? (
            <HomeSlider />
          ) : (
            "There are currently no Events"
          )}
        </div>
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
  followTeam,
  unfollowTeam,
  isTeamFollowed,
  setTeamsFollowed,
  setOrganizationsFollowed,
  getOrganization,
  selectFollowedOrganization,
  setCurrentOrganization,
  setFilterForEvents,
})(HomeCards);
