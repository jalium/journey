import React, { Component } from "react";
import { connect } from "react-redux";
import Experience from "./Experiences.jsx";
import { Redirect } from "react-router";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: undefined
    };
  }
  handleUsernameChange = () => {
    console.log("You're in the handleUsernameChange");
    console.log("This is the username input", event.target.value);
    this.setState({ usernameInput: event.target.value });
  };

  handlePasswordChange = () => {
    console.log("You're in the handPasswordChange");
    console.log("This is the password input", event.target.value);
    this.setState({ passwordInput: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("Form has been submitted");
    let data = new FormData();
    data.append("username", this.state.usernameInput);
    data.append("password", this.state.passwordInput);
    let response = await fetch("/login", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    console.log("Login This is the responseBody", responseBody);
    let body = JSON.parse(responseBody);
    console.log("Login This is the parsed body", body);
    if (body.success) {
      this.setState({ username: this.state.usernameInput });
    }
    if (!body.success) {
      alert("Invalid LogIn");
      return;
    }
    /*this.props.dispatch({
      type: "login-success"
    }); */
  };
  render = () => {
    if (this.state.username === undefined) {
      console.log("usernameInput", this.username);
      return (
        <div>
          <div>Sign In</div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Enter username"
                onChange={this.handleUsernameChange}
              />
              <input
                type="password"
                placeholder="Enter password"
                onChange={this.handlePasswordChange}
              />
              <input type="submit" value="Sign in" />
            </form>
          </div>
        </div>
      );
    }
    return <Redirect to="/experiences" />;
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
