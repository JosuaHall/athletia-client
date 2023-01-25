import React, { Component } from "react";
import { NavbarText, DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from "./auth/Logout";
import { Link } from "react-router-dom";
import pic2 from "../pictures/athletia_logo_white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../actions/authActions";
class AppNavbar extends Component {
  state = {
    isOpen: false,
    isAuthenticated: false,
    user: null,
    logo: "",
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.setState({ isOpen: false });
  }

  componentWillUnmount() {
    this.setState({ isOpen: false });
  }

  //toggle option field in navbar
  toggle = (e) => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  logUserOut = () => {
    this.toggle();
    this.props.logout();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    //navbar when logged in
    const authLinks = (
      <div className="auth-navbar-items">
        <div>
          {user ? <div className="profile-navbar-name">{user.name}</div> : ""}
        </div>

        <div>
          <div className="link nav-expand-button" onClick={this.toggle}>
            <FontAwesomeIcon icon={["fa", "bars"]} size="2x" />
          </div>

          {this.state.isOpen ? (
            <div className="nav-dropdown-list">
              <Link
                onClick={this.toggle}
                to={`/events/${user ? user._id : ""}`}
                className="link-dropdown"
              >
                <div className="py-2 px-3">Athletia Home</div>
              </Link>
              <Link
                onClick={this.toggle}
                to={`/setup/school/${user ? user._id : ""}`}
                className="link-dropdown"
              >
                <div className="py-2 px-3">Organization Setup</div>
              </Link>
              <Link
                onClick={this.toggle}
                to={`/profile/settings/${user ? user._id : ""}`}
                className="link-dropdown"
              >
                <div className="py-2 px-3">Edit Profile</div>
              </Link>
              <Link
                onClick={this.toggle}
                to={`/your/teams/${user ? user._id : ""}`}
                className="link-dropdown"
              >
                <div className="py-2 px-3">Your Teams</div>
              </Link>
              <Link
                onClick={this.logUserOut}
                to="/login"
                className="link-dropdown"
              >
                <div className="py-2 px-3">Logout</div>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );

    const authAdmin = (
      <React.Fragment>
        <NavbarText>
          {/*Profile Picture*/}
          {user ? `${user.name}` : ""}
        </NavbarText>
        <Logout />
      </React.Fragment>
    );

    //navbar if not authorized
    const guestLinks = (
      <div className="guest-navbar-items">
        <div>
          <Link
            onClick={this.props.clearErrors}
            to="/register"
            className="link"
          >
            Register
          </Link>
        </div>
        <div>
          <Link onClick={this.props.clearErrors} to="/login" className="link">
            Login
          </Link>
        </div>
      </div>
    );
    return (
      <div className="navbar">
        <div className="nav-brand">
          <Link
            className="link"
            onClick={() => this.setState({ isOpen: false })}
            to={`/events/${user ? user._id : ""}`}
          >
            <img className="athletia-logo" src={pic2} width="40px" />
          </Link>
        </div>

        {isAuthenticated ? authLinks : guestLinks}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  team: state.team,
});

export default connect(mapStateToProps, { logout })(AppNavbar);
