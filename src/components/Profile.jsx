import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfilePicture } from "../actions/authActions";

class Profile extends Component {
  state = {
    logo: "",
    url: "",
    username: "",
    name: "",
    email: "",
    isHovering: "",
  };

  static propTypes = {
    organization: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateProfilePicture: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.setState({ logo: this.props.user.user.profileImg });
  }

  onFileChange = (e) => {
    this.setState({ logo: e.target.files[0] });
    if (e.target.files[0])
      this.setState({ url: URL.createObjectURL(e.target.files[0]) });
  };

  submit = (e) => {
    e.preventDefault();
    const { logo } = this.state;
    const userid = this.props.user.user._id;
    const user = {
      userid,
      logo,
    };
    this.props.updateProfilePicture(user);
    this.setState({ url: "" });
  };

  handleMouseOver = () => {
    this.setState({ isHovering: true });
  };

  handleMouseOut = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const followed_org = this.props.user.user.organizations_followed;
    const followed_org_nr = followed_org.length;
    return (
      <div className="profile">
        <div className="profile-header">
          <div className="upload-logo">
            {this.state.logo ? (
              <div className="input-pb">
                <label className="hover-text" for="inputTag">
                  <img
                    className="hover-text"
                    src={
                      this.state.url
                        ? this.state.url
                        : `http://localhost:5000/public/${this.props.user.user.profileImg}`
                    }
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                    alt=""
                  />
                  {this.state.isHovering && (
                    <div className="hover-text">edit</div>
                  )}
                  <input
                    type="file"
                    name="logo"
                    id="inputTag"
                    onChange={this.onFileChange}
                  />
                </label>
              </div>
            ) : (
              <div>
                <label for="inputTag" className="label-style-profile-picture">
                  <FontAwesomeIcon icon={["fa", "camera"]} size="2x" />
                  <input
                    type="file"
                    name="logo"
                    id="inputTag"
                    onChange={this.onFileChange}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="profile-info">
            <div>
              <h3>{this.props.user.user.name}</h3>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={this.submit}
            disabled={this.state.url ? false : true}
            className="btn btn-success"
          >
            Save Changes
          </button>
        </div>
        {followed_org
          ? followed_org.map((org) => {
              <React.Component key={org._id}>
                <div className="">
                  <div>
                    <img
                      src={`http://localhost:5000/public/${org.logo}`}
                      alt=""
                    />
                  </div>
                  <div>{org.name}</div>
                </div>
              </React.Component>;
            })
          : ""}
        <div className="profile-teams-followed">
          <div>
            <h3>Teams followed: {followed_org_nr}</h3>
          </div>
          {followed_org
            ? followed_org.map((org) => (
                <div className="teams-followed" key={org._id}>
                  <div className="logo-team-label">
                    <div>
                      <img
                        src={`http://localhost:5000/public/${org.logo}`}
                        alt=""
                      />
                    </div>
                    <div>{org.name}</div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.organization,
  user: state.auth,
});

export default connect(mapStateToProps, { updateProfilePicture })(Profile);
