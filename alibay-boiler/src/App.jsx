import React, { Component } from "react";
import "./main.css";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import SellerForm from "./SellerForm.jsx";

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Signup />
          <Login />
          <SellerForm />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
