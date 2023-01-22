import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createTeam, getSports } from "../actions/teamActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFilteredUsers } from "./../actions/authActions";

class CreateTeam extends Component {
  state = {
    sport: "",
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    createTeam: PropTypes.func.isRequired,
    team: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getSports();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { sport } = this.state;
    const userid = this.props.user.user._id;
    const organizationid = this.props.organization.selected._id;

    const team = {
      userid,
      organizationid,
      sport,
    };

    this.props.createTeam(team);
  };

  render() {
    return (
      <React.Fragment>
        <div className="create-team">
          <select
            name="sport"
            id="sport"
            placeholder="Select an option"
            className="py-3"
            onChange={this.onChange}
          >
            <option selected="selected" disabled>
              Select a sport
            </option>
            {this.props.team.all_sports
              ? this.props.team.all_sports.map((s) => (
                  <React.Fragment>
                    <option key={`${s._id}1`} value={`Men's ${s.sport}`}>
                      Men's {s.sport}
                    </option>
                    <option key={`${s._id}2`} value={`Women's ${s.sport}`}>
                      Women's {s.sport}
                    </option>
                  </React.Fragment>
                ))
              : ""}
          </select>
          <div></div>
          <span>
            <button onClick={this.onSubmit} className="btn btn-success">
              Create
            </button>
          </span>
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
  createTeam,
  getFilteredUsers,
  getSports,
})(CreateTeam);
