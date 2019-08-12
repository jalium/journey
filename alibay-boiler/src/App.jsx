import React, { Component } from "react";
import "./main.css";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from './Signup.jsx'
import Login from './Login.jsx'

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Signup/>
          <Login/>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
