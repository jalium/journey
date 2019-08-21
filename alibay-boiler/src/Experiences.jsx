import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BrowseExp from "./BrowseExp.jsx";
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
      <div className="card-wrapper">
        <div className="content">
          {this.props.posts
            .filter(experience =>
              experience.destination
                .toLowerCase()
                .includes(this.props.query.toLowerCase())
            )
            .map(post => {
              return (
                <BrowseExp
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
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    posts: state.listings,
    query: state.searchQuery,
    name: state.cookie
  };
};

let Experience = connect(mapStateToProps)(UnconnectedExperience);
export default Experience;
