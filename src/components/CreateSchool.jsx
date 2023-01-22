import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createOrganization,
  getOrganizationList,
} from "../actions/organizationActions";
import { Alert } from "reactstrap";

class CreateSchool extends Component {
  state = {
    logo: "",
    url: "",
    name: "",
    admin_email: "",
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    createOrganization: PropTypes.func.isRequired,
    getOrganizationList: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = (e) => {
    this.setState({ logo: e.target.files[0] });
    if (e.target.files[0])
      this.setState({ url: URL.createObjectURL(e.target.files[0]) });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { logo, name } = this.state;
    const user = this.props.user.user._id;

    const organization = {
      user,
      logo,
      name,
    };

    this.props.createOrganization(organization);
    this.updateOrg(user);
    this.setState({ logo: "" });
    this.setState({ url: "" });
    this.setState({ name: "" });
  };

  updateOrg = (user) => {
    this.props.getOrganizationList(user);
  };

  render() {
    return (
      <React.Fragment>
        <form className="create-school" onSubmit={this.onSubmit}>
          <div className="upload-logo">
            <div>
              {this.state.logo ? (
                <img src={this.state.url} width="100px" alt="" />
              ) : (
                ""
              )}
            </div>
            <div>
              <label for="inputTag" className="label-style">
                <FontAwesomeIcon icon={["fa", "pen"]} size="1x" />
                <input
                  type="file"
                  name="logo"
                  id="inputTag"
                  onChange={this.onFileChange}
                />
              </label>
            </div>
          </div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Club/School Name"
            onChange={this.onChange}
          />
          <span>
            <button type="submit" className="btn btn-success">
              Create
            </button>
          </span>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
});

export default connect(mapStateToProps, {
  createOrganization,
  getOrganizationList,
})(CreateSchool);
