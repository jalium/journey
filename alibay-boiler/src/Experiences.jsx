import React, { Component } from "react";
import { connect } from "react-redux";
import ListingCard from "./ListingCard.jsx";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/experiences");
    let body = await response.text();
    console.log("/experiences response", body);
    body = JSON.parse(body);
    this.setState({ posts: body });
  };

  render = () => {
    return (
      <div>
        {this.state.posts.map(post => {
          return (
            <ListingCard
              listingTitle={post.listingTitle}
              destination={post.destination}
              amenities={post.amenities}
              rating={post.rating}
              date={post.date}
              price={post.price}
              frontendPath={post.frontendPath}
            />
          );
        })}
      </div>
    );
  };
}

export default Experience;
