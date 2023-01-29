import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrganization } from "../actions/organizationActions";
import TeamList from "./TeamList";
import LoadingSpinner from "./LoadingSpinner";
import CreateTeam from "./CreateTeam";
import BackButton from "./BackButton";

class TeamDetails extends Component {
  state = {};
  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getOrganization: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const organizationid = this.props.organization.selected;
    this.props.getOrganization(organizationid);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.organization.isLoading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            {" "}
            {/* Organization Header */}
            <BackButton styling="back-arrow" />
            <div className="d-inline-flex gap-3 mb-4 justify-content-center align-items-center">
              <img
                className="organization-logo"
                src={`${this.props.organization.selected.logo}`}
                alt=""
              />
              <h2>{this.props.organization.selected.name}</h2>
            </div>
            {/* Teams Content */}
            <h5>Current Teams</h5>
            <TeamList />
            <CreateTeam />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
});

export default connect(mapStateToProps, { getOrganization })(TeamDetails);
