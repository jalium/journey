//1. Import React/Component and connect
//2. Create a class UnconnectedLogin
//2. Include constructor and super props that will take in the state (which is a key property of react)
//2. Include the username and password in this state
//3. Create the render function which will RETURN
//3. A form that will include an onSubbmit. Make sure it uses the correct function
//3. Includes username which wil be an input tag of type text with an onChange to the correct function
//3. Includes password which will be an input tag of type text with an onChange
//3. Include a submit button as an input tag in the form
//4. Create an event function for handleUsernameChange
//4. Console.log where you are and also the value of the username which uses event.target.value
//4. set the state using this.setstate
//5. Do the same with handlePasswordChange
//6. Grab the data from the form and set it into a new variable
//6. Create a handleSubmit function that will have an await!
//6. Stop the page from reloading (evt.preventDefault())
//6. console.log that the form has been submitted
//6. Grab the data from the form and set it into a new variable
//6. Append (which takes a name and a value(state)) into the data (x2 for the two states)
//6. Create the response with an await fetch function(the path, the object)
//6. The object contains the three keys things in a response object:
//6. Method, body, credentials
//6. Create the responseBody (hint: what do you need after an await fetch) -------> response.text()
//6. create the body with JSON.parse and console log it
//6. If success is false, return. Else, dispatch the login page
//7. connect() the unconnected function and name it
//7. export default it
import React, { Component } from "react";
import { connect } from "react-redux";
import Experience from "./Experiences.jsx";

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
    console.log("This is the usernaem input", event.target.value);
    this.setState({ usernameInput: event.target.value });
  };

  handlePasswordChange = () => {
    console.log("You're in the handPasswordChage");
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
        <form onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          Username
          <input type="text" onChange={this.handleUsernameChange} />
          Password
          <input type="text" onChange={this.handlePasswordChange} />
          <input type="submit" />
        </form>
      );
    }
    return <Experience />;
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
