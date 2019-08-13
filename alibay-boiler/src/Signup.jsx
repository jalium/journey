//1. Import React/Component
//2. Create a class Signup and set this states of username and password to empty strings
//3. Create a render function similar to the one previously (copy paste)
//4. Create the function handleUsernameChange and handlePasswordChange (copy paste)
//5. Create the fucntion handleSubmit that takes an evt
//5. Stop the page from refreshing
//5. get the data from the form
//5. append that both states
//5. fetch (the path, the object {method... body...}
//6. export default

import React, { Component } from "react";
import { connect } from "react-redux";
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
      // this.props.dispatch({
      //   //might need to change if we put in travel agent vs. traveller
      //   type: "login-success"
      // });
    }
  };
  render = () => {
    if (this.state.username === undefined) {
      return (
        <form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
          Username
          <input
            type="text"
            placeholder="Choose a username"
            onChange={this.handleUsernameChange}
          />
          Password
          <input
            type="text"
            placeholder="Choose a password"
            onChange={this.handlePasswordChange}
          />
          <input type="submit" />
        </form>
      );
    }
    return <Experiences />;
  };
}

let SignUpApp = connect()(Signup);
export default SignUpApp;
