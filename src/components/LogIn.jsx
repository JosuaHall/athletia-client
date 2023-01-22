//not used currently
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LogIn extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="">Welcome to Wolf Watch</h1>
        <div className="login-site">
          <h1 className="login-heading">Login</h1>
          <form className="login-form" onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LogIn;
