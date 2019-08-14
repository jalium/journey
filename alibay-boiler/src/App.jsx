import React, { Component } from "react";
import { connect } from "react-redux";
import "./main.css";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import SellerForm from "./SellerForm.jsx";
import Experience from "./Experiences.jsx";
import SelectCard from "./SelectCard.jsx";
import RatingStaticApp from "./RatingStatic.jsx"

class UnconnectedApp extends Component {
  renderListing = routerData => {
    let listingId = routerData.match.params.lid;
    let candidate = this.props.posts.filter(listing => {
      return listing._id === listingId;
    });
    console.log(candidate);
    return <SelectCard card={candidate[0]} />;
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderMain} />
          <Route exact={true} path="/new-list" render={renderSellerForm} />
          <Route exact={true} path="/experiences" render={renderExperiences} />
          <Route
            exact={true}
            path="/experiences/:lid"
            render={this.renderListing}
          />
        </div>
      </BrowserRouter>
    );
  };
}

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
      <Experience />
    </div>
  );
};

let mapStateToProps = state => {
  return { posts: state.listings };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
