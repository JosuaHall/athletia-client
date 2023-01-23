import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { proxy } from "../../package.json";
import {
  getOrganizationList,
  setCurrentOrganization,
} from "../actions/organizationActions";
import { Link } from "react-router-dom";

class SchoolList extends Component {
  state = {
    organization_list: [],
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    getOrganizationList: PropTypes.func.isRequired,
    setCurrentOrganization: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const id = this.props.user.user._id;
    this.props.getOrganizationList(id);
  }

  setCurrentOrganization = (id) => {
    this.props.setCurrentOrganization(id);
  };

  displayOrganizations() {
    const organizations = this.props.organization.organization_list;
    return (
      <ul className="organization-list">
        {organizations.map((organization) => (
          <Link
            to={`/manage/team/${organization.owner}/${organization._id}`}
            onClick={() => this.setCurrentOrganization(organization._id)}
            className="organization-list-item organization-list-item-link"
            key={organization._id}
          >
            <img
              className="organization-logo"
              src={`${proxy}/public/${organization.logo}`}
              alt=""
            />
            <div>{organization.name}</div>
            <div>
              <FontAwesomeIcon
                icon={["fa", "check"]}
                size="2x"
                color="rgb(0,128,255)"
              />
            </div>
          </Link>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="school-list">
          <h6>Logo</h6>
          <h6>Name</h6>
          <h6>Status</h6>
        </div>

        {this.displayOrganizations()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
});

export default connect(mapStateToProps, {
  getOrganizationList,
  setCurrentOrganization,
})(SchoolList);
