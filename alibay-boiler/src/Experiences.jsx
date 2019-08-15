import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListingCard from "./ListingCard.jsx";
import RatingStatic from "./RatingStatic.jsx";

class UnconnectedExperience extends Component {
  componentDidMount = async () => {
    let response = await fetch("/experiences");
    let body = await response.text();
    console.log("/experiences response", body);
    body = JSON.parse(body);
    this.props.dispatch({
      type: "load-posts",
      posts: body
    });
  };

  render = () => {
    return (
      <div>
        <div>
          <Link to={"/new-list"}>List a Vacation</Link>
        </div>
        {this.props.posts.map(post => {
          return (
            <ListingCard
              listingTitle={post.listingTitle}
              destination={post.destination}
              amenities={post.amenities}
              rating={<RatingStatic rating={post.rating} />}
              date={post.date}
              price={post.price}
              frontendPath={post.frontendPath}
              listingId={post._id}
            />
          );
        })}
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    posts: state.listings
  };
};

let Experience = connect(mapStateToProps)(UnconnectedExperience);
export default Experience;
