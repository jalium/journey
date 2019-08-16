import React, { Component } from "react";
import { connect } from "react-redux";
import Experience from "./Experiences.jsx";
import { Redirect } from "react-router";

class SignInOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInputSignIn: "",
      passwordInputSignIn: "",
      usernameInputSignUp: "",
      passwordInputSignUp: "",
      confirmPasswordInputSignUp: "",
      username: undefined
    };
  }
  handleUsernameChangeSignIn = event => {
    console.log("new username(signin)", event.target.value);
    this.setState({ usernameInputSignIn: event.target.value });
  };

  handlePasswordChangeSignIn = event => {
    console.log("new password(signin)", event.target.value);
    this.setState({ passwordInputSignIn: event.target.value });
  };

  handleUsernameChangeSignUp = event => {
    console.log("new username(signup)", event.target.value);
    this.setState({ usernameInputSignUp: event.target.value });
  };

  handlePasswordChangeSignUp = event => {
    console.log("new password(signup)", event.target.value);
    this.setState({ passwordInputSignUp: event.target.value });
  };

  handleConfirmPasswordChangeSignUp = event => {
    console.log("new confirmed password(signup)", event.target.value);
    this.setState({ confirmPasswordInputSignUp: event.target.value });
  };

  handleSubmitSignIn = async evt => {
    evt.preventDefault();
    console.log("Form has been submitted");
    let data = new FormData();
    data.append("username", this.state.usernameInputSignIn);
    data.append("password", this.state.passwordInputSignIn);
    let response = await fetch("/login", {
      method: "POST",
      body: data
    });
    let responseBody = await response.text();
    console.log("Login This is the responseBody", responseBody);
    let body = JSON.parse(responseBody);
    console.log("Login This is the parsed body", body);
    if (body.success) {
      this.setState({ username: this.state.usernameInputSignIn });
    }
    if (!body.success) {
      alert("Invalid LogIn");
      return;
    }
    /*this.props.dispatch({
      type: "login-success"
    }); */
  };
  handleSubmitSignup = async evt => {
    evt.preventDefault();
    if (
      this.state.passwordInputSignUp === this.state.confirmPasswordInputSignUp
    ) {
      console.log("signup form submitted");
      let data = new FormData();
      data.append("username", this.state.usernameInputSignUp);
      data.append("password", this.state.passwordInputSignUp);
      console.log(data);
      let response = await fetch("/signup", { method: "POST", body: data });
      let bodyRes = await response.text();
      console.log("/signup response", bodyRes);
      let parsed = JSON.parse(bodyRes);
      if (parsed.success) {
        this.setState({ username: this.state.usernameInputSignUp });
      }
    } else {
      alert("Something went wrong! Make sure both passwwords are the same.");
    }
  };
  render = () => {
    if (this.state.username === undefined) {
      return (
        <div class="login-wrap">
          <div class="login-html">
            <input
              id="tab-1"
              type="radio"
              name="tab"
              class="sign-in"
              defaultChecked
            />
            <label for="tab-1" class="tab">
              Sign In
            </label>
            <input id="tab-2" type="radio" name="tab" class="sign-up" />
            <label for="tab-2" class="tab">
              Sign Up
            </label>
            <div class="login-form">
              <form onSubmit={this.handleSubmitSignIn}>
                <div class="sign-in-htm">
                  <div class="group">
                    <label for="user" class="label">
                      Username
                    </label>
                    <input
                      id="user"
                      type="text"
                      class="input"
                      onChange={this.handleUsernameChangeSignIn}
                    />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">
                      Password
                    </label>
                    <input
                      id="pass"
                      type="password"
                      class="input"
                      data-type="password"
                      onChange={this.handlePasswordChangeSignIn}
                    />
                  </div>
                  <div class="group">
                    <input type="submit" class="button" value="Sign In" />
                  </div>
                  <div class="hr" />
                </div>
              </form>
              <form onSubmit={this.handleSubmitSignup}>
                <div class="sign-up-htm">
                  <div class="group">
                    <label for="user" class="label">
                      Username
                    </label>
                    <input
                      id="user"
                      type="text"
                      class="input"
                      onChange={this.handleUsernameChangeSignUp}
                    />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">
                      Password
                    </label>
                    <input
                      id="pass"
                      type="password"
                      class="input"
                      data-type="password"
                      onChange={this.handlePasswordChangeSignUp}
                    />
                  </div>
                  <div class="group">
                    <label for="pass" class="label">
                      Confirm Password
                    </label>
                    <input
                      id="pass"
                      type="password"
                      class="input"
                      data-type="password"
                      onChange={this.handleConfirmPasswordChangeSignUp}
                    />
                  </div>
                  <div class="group">
                    <input type="submit" class="button" value="Sign Up" />
                  </div>
                  <div class="hr" />
                  <div class="foot-lnk">
                    <label for="tab-1">Already a member?</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return <Redirect to="/experiences" />;
  };
}

// let SignUpApp = connect()(Signup);
export default SignInOut;
