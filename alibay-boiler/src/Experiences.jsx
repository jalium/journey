import React, { Component } from "react";
import { connect } from "react-redux";
import SellerForm from "./SellerForm.jsx";
class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  reload = async () => {
    let response = await fetch("/experiences");
    let body = await response.text();
    console.log("/experiences response", body);
    body = JSON.parse(body);
    this.setState({ posts: body });
  };
  render = () => {
    return (
      <div>
        {this.state.posts.map(p => {
          p;
        })}
      </div>
    );
  };
}
