import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./main.css";
import Checkout from "./Checkout.jsx";

class BrowseExp extends Component {
  render = () => {
    return (
      <div className="card">
        <div>
          <Link to={"/experiences/" + this.props.listingId}>
            {this.props.listingTitle}
          </Link>
          <br />
          <br />
          <div> {this.props.rating}</div>
          <div>destination: {this.props.destination}</div>
          <div>total price: {"$" + this.props.price}</div>
        </div>
        <img height="100px" src={this.props.frontendPath} />
      </div>
    );
  };
}

export default BrowseExp;
