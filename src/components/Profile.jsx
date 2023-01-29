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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.user.profileImg !== this.props.user.user.profileImg) {
      this.setState({ logo: this.props.user.user.profileImg });
      this.setState({ url: "" });
    }
  }

  onFileChange = (e) => {
    const file = e.target.files[0];
    this.getBase64(file)
      .then((result) => {
        file["base64"] = result;
        this.setState({
          logo: file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    if (e.target.files[0])
      this.setState({ url: URL.createObjectURL(e.target.files[0]) });
  };

  getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  submit = () => {
    const { logo } = this.state;
    const userid = this.props.user.user._id;
    console.log(logo);
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
    const followed_org = this.props.user.user.organizations_followed
      ? this.props.user.user.organizations_followed
      : null;
    const followed_org_nr = followed_org ? followed_org.length : 0;
    return (
      <div className="profile">
        <div className="profile-header">
          <div className="upload-logo">
            {this.state.logo ? (
              <div className="input-pb">
                <label className="hover-text" htmlFor="inputTag">
                  <img
                    className="hover-text"
                    src={
                      this.state.url
                        ? this.state.url
                        : `${this.props.user.user.profileImg}`
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
                <label
                  htmlFor="inputTag"
                  className="label-style-profile-picture"
                >
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
        {/*followed_org
          ? followed_org.map((org) => {
              <React.Component key={org._id}>
                <div className="">
                  <div>
                    <img src={`${proxy}/public/${org.logo}`} alt="" />
                  </div>
                  <div>{org.name}</div>
                </div>
              </React.Component>;
            })
          : ""*/}
        <div className="profile-teams-followed">
          <div>
            <h3>Teams followed: {followed_org_nr}</h3>
          </div>
          {followed_org
            ? followed_org.map((org) => (
                <div className="teams-followed" key={org._id}>
                  <div className="logo-team-label">
                    <div>
                      <img src={`${org.logo}`} alt="" />
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
