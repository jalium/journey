import React, { Component } from "react";
import "./main.css";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import SellerForm from "./SellerForm.jsx";

let renderMain = () => {
  return (
    <div>
      <Signup />
      <Login />
    </div>
  );
};

let renderSellerForm = () => {
  return (
    <div>
      <SellerForm />
    </div>
  );
};

let renderExperiences = () => {
  return (
    <div>
      <Experiences />
    </div>
  );
};

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderMain} />
          <Route exact={true} path="/new-list" render={renderSellerForm} />
          <Route exact={true} path="/experiences" render={renderExperiences} />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
