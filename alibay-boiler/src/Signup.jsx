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
      username: "",
      password: ""
    };
  }
  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    fetch("/signup", { method: "POST", body: data });
    this.props.dispatch({
      //might need to change if we put in travel agent vs. traveller
      type: "login-success"
    });
  };
  render = () => {
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
  };
}
let SignUpApp = connect()(Signup);
export default SignUpApp;

//7. In the backend, we need to send the username and password to MongoDB using insert.one
//7. dbo.collection('users').insertOne({ username: XXX, password: XXX })
