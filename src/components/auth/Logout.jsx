import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <Link to="/login" onClick={this.props.logout} className="link">
          Logout
        </Link>
      </React.Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
