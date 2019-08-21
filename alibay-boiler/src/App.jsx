import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./main.css";
import "./login.css";
import "./calendar.css";
import "./search.css";
import { BrowserRouter, Route } from "react-router-dom";
import SellerForm from "./SellerForm.jsx";
import Experience from "./Experiences.jsx";
import SelectExp from "./SelectExp.jsx";
import SignInOut from "./SignInAndOut.jsx";
import Search from "./Search.jsx";
import Checkout from "./Checkout.jsx";
import { Redirect } from "react-router";

class UnconnectedApp extends Component {
  renderListing = routerData => {
    let listingId = routerData.match.params.lid;
    let candidate = this.props.posts.filter(listing => {
      return listing._id === listingId;
    });
    return (
      <div>
        <Link to="/experiences/">
          <div className="top-bar">
            <img src="/uploads/logo2.png" />
            <Search />
            <div>{"Hi, " + this.props.name}</div>
            <Link to={"/sellExp"}>List a Vacation</Link>
            <button className="logout" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </Link>
        <SelectExp card={candidate[0]} />;
      </div>
    );
  };

  renderSearchDest = () => {
    return (
      <div>
        <SearchDest />
      </div>
    );
  };
  renderCheckout = routerData => {
    console.log("routerdata", routerData);
    let listingId = routerData.match.params.lid;
    console.log("listingId", listingId);
    let candidate = this.props.posts.filter(listing => {
      return listing._id === listingId;
    });
    console.log("candidatecheckout", candidate);
    return (
      <div>
        <Link to="/experiences/">
          <div className="top-bar">
            <img src="/uploads/logo2.png" />
            <Search />
            <div>{"Hi, " + this.props.name}</div>
            <Link to={"/sellExp"}>List a Vacation</Link>
            <button className="logout" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </Link>
        <Checkout card={candidate[0]} range={routerData.location.state.range} />
        ;
      </div>
    );
  };

  renderMain = () => {
    return (
      <div>
        <div className="top-bar">
          <img src="/uploads/logo2.png" />
        </div>
        <div>
          <div>
            <SignInOut />
          </div>
        </div>
      </div>
    );
  };

  renderSellerForm = () => {
    return (
      <div>
        <Link to="/experiences/">
          <div className="top-bar">
            <img src="/uploads/logo2.png" />
            <Search />
            <div>{"Hi, " + this.props.name}</div>
            <Link to={"/sellExp"}>List a Vacation</Link>
            <button className="logout" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </Link>
        <div className="scroll">
          <SellerForm />
        </div>
      </div>
    );
  };

  handleLogout = () => {
    this.props.dispatch({
      type: "logout"
    });
  };

  renderExperiences = () => {
    return (
      <div>
        <div className="top-bar">
          <img src="/uploads/logo2.png" />
          <Search />
          <div>{"Hi, " + this.props.name}</div>
          <Link to={"/sellExp"}>List a Vacation</Link>
          <button className="logout" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
        <div>
          <Experience />
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <BrowserRouter>
        {!this.props.loggedIn ? <Redirect to="/" /> : null}
        <video ref="vidRef" className="video-background" loop autoPlay>
          <source src="/uploads/Alibay Background 2.mp4" type="video/mp4" />
        </video>
        <div className="scroll">
          <Route exact={true} path="/" render={this.renderMain} />
          <Route exact={true} path="/sellExp" render={this.renderSellerForm} />
          <Route
            exact={true}
            path="/experiences"
            render={this.renderExperiences}
          />
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
          <Route
            exact={true}
            path="/checkout/:lid"
            render={this.renderCheckout}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    posts: state.listings,
    name: state.cookie
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
