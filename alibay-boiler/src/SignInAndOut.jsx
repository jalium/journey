import React, { Component } from "react";
import { connect } from "react-redux";
import Experience from "./Experiences.jsx";
import { Redirect } from "react-router";

class UnconnectedSignInOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInputSignIn: "",
      passwordInputSignIn: "",
      fullNameInputSignUp: "",
      emailInputSignUp: "",
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

  handleFullNameChangeSignUp = event => {
    this.setState({ fullNameInputSignUp: event.target.value });
  };

  handleEmailChangeSignUp = event => {
    this.setState({ emailInputSignUp: event.target.value });
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
    console.log("-------------------------------", );
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("Login This is the responseBody", responseBody);
    let body = JSON.parse(responseBody);
    console.log("Login This is the parsed body", body);
    if (body.success) {
      this.setState({ username: this.state.usernameInputSignIn });
      this.props.dispatch({
        type: "cookie",
        useCookie: body.firstName
      });
      this.props.dispatch({
        type: "login"
      });
    }
    if (!body.success) {
      alert("Invalid LogIn");
      return;
    }
  };
  handleSubmitSignup = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("fullName", this.state.fullNameInputSignUp);
    data.append("email", this.state.emailInputSignUp);
    data.append("username", this.state.usernameInputSignUp);
    data.append("password", this.state.passwordInputSignUp);
    console.log(data);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let bodyRes = await response.text();
    console.log("/signup response", bodyRes);
    let parsed = JSON.parse(bodyRes);
    if (parsed.success) {
      this.setState({ username: this.state.usernameInputSignUp });
      this.props.dispatch({
        type: "cookie",
        useCookie: parsed.firstName
      });
      this.props.dispatch({
        type: "login"
      });
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
                      Full Name
                    </label>
                    <input
                      id="user"
                      type="text"
                      class="input"
                      onChange={this.handleFullNameChangeSignUp}
                    />
                  </div>
                  <div class="group">
                    <label for="user" class="label">
                      E-mail
                    </label>
                    <input
                      id="user"
                      type="text"
                      class="input"
                      onChange={this.handleEmailChangeSignUp}
                    />
                  </div>
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

    return (
      <div>
        <Redirect to="/experiences" />
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    cookie: state.cookie
  };
};
let SignInOut = connect(mapStateToProps)(UnconnectedSignInOut);
export default SignInOut;
