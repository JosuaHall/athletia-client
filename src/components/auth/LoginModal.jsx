import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    userloaded: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated, user, userloaded } = this.props;
    if (error !== prevProps.error) {
      // CHeck for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };
    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="mb-5">Welcome to Athletia</h1>
        <div className="login-logout-form">
          <h2 className="m-4 login-label">
            <FontAwesomeIcon
              icon={["fas", "user"]}
              size="2x"
              color="rgb(0,128,255)"
              className="user-icon"
            />
            Sign In
          </h2>
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={this.onChange}
              />

              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={this.onChange}
              />
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: "2rem" }}
                block
                className="login-button"
              >
                Login
              </Button>
              <Link to="/register" className="mt-3 link-register">
                Don't have an account yet?
              </Link>
              {/*<Link to="/events">continue as a guest</Link>*/}
            </FormGroup>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userloaded: state.auth.userloaded,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
