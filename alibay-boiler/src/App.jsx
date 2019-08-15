import React, { Component } from "react";
import { connect } from "react-redux";
import "./main.css";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import SellerForm from "./SellerForm.jsx";
import Experience from "./Experiences.jsx";
import SelectExp from "./SelectExp.jsx";

// Testing ta cronjob

class UnconnectedApp extends Component {
  renderListing = routerData => {
    let listingId = routerData.match.params.lid;
    let candidate = this.props.posts.filter(listing => {
      return listing._id === listingId;
    });
    console.log(candidate);
    return <SelectExp card={candidate[0]} />;
  };

  renderSearchDest = () => {
    return (
      <div>
        <SearchDest />
      </div>
    );
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderMain} />
          <Route exact={true} path="/sellExp" render={renderSellerForm} />
          <Route exact={true} path="/experiences" render={renderExperiences} />
          <Route
            exact={true}
            path="/experiences/:lid"
            render={this.renderListing}
          />
          <Route
            exact={true}
            path="/searchDest"
            render={this.renderSearchDest}
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
