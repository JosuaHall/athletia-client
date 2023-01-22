import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Slider from "./Slider";
import BackButton from "./BackButton";
import { proxy } from "../../package.json";

import {
  followTeam,
  unfollowTeam,
  isTeamFollowed,
} from "./../actions/authActions";

class EventCards extends Component {
  state = {
    followed: "", //follow button toggle
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    followTeam: PropTypes.func.isRequired,
    unfollowTeam: PropTypes.func.isRequired,
  };

  componentDidMount() {
    //already following the selected team ?
    const id = this.props.user.user.teams_followed.filter((teamid) => {
      return teamid == this.props.team.selected_team._id;
    });

    if (id == "") {
      //if not following
      this.setState({ followed: false });
    } else {
      this.setState({ followed: true });
    }

    //this.props.isTeamFollowed(this.state.followed); //set redux: auth.team_followed to true or false
  }

  componentDidUpdate(prevProps, prevState) {
    //check if following has changed
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
  }

  //user clicks follow button
  follow = () => {
    this.setState({ followed: !this.state.followed }); //toggle isfollowed
  };

  render() {
    return (
      <div>
        <h1 className="heading">Athletia</h1>
        <BackButton styling="backarrow-selected-team" />
        <div className="homepage-team-header">
          <div className="d-flex">
            <img
              className="organization-logo"
              src={`${proxy}public/${this.props.organization.selected.logo}`}
              alt=""
            />
            <div className="organization-team-header-homepage px-2">
              <h5>{this.props.organization.selected.name}</h5>
              <h6>{this.props.team.selected_team.sport}</h6>
            </div>
          </div>
          <div>
            <button
              onClick={this.follow}
              className={
                this.state.followed
                  ? "btn btn-outline-primary btn-small .bg-white px-4 py-1"
                  : "btn btn-primary btn-small .bg-white px-4 py-1"
              }
            >
              {this.state.followed ? "following" : "follow"}
            </button>
          </div>
        </div>
        {this.props.team.selected_team.events != "" ? (
          <Slider /> //displays event cards
        ) : (
          "This team does not have any events scheduled at this moment"
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
  followTeam,
  unfollowTeam,
  isTeamFollowed,
})(EventCards);
