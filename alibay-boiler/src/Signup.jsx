import React, { Component } from "react";
import { connect } from "react-redux";
import Experience from "./Experiences.jsx";
import { Redirect } from "react-router";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: undefined
    };
  }
  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ usernameInput: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ passwordInput: event.target.value });
  };

  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("username", this.state.usernameInput);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/signup", { method: "POST", body: data });
    let bodyRes = await response.text();
    console.log("/signup response", bodyRes);
    let parsed = JSON.parse(bodyRes);
    if (parsed.success) {
      this.setState({ username: this.state.usernameInput });
    }
  };
  render = () => {
    if (this.state.username === undefined) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>Sign Up</div>
          <div>
            <input
              type="text"
              placeholder="Choose a username"
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Choose a password"
              onChange={this.handlePasswordChange}
            />
          </div>
          <input type="submit" value="Sign up now!" />
        </form>
      );
    }
    return <Redirect to="/experiences" />;
  };
}

let SignUpApp = connect()(Signup);
export default SignUpApp;
