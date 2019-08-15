import { connect } from "react-redux";
import React, { Component } from "react";

class UnconnectedSearchResult extends Component {
    componentDidMount = async () => {
        let response = await fetch("/searchResult");
        let body = await response.text();
        console.log("/searchResult response", body);
        body = JSON.parse(body);
        this.props.dispatch({
          type: "searchQuery",
          query: body
        });
      };
  render = () => {
    return (
      <div>
        {this.props.query.map(post => {
          return (
            <ListingCard
              listingTitle={post.listingTitle}
              destination={post.destination}
              amenities={post.amenities}
              rating={post.rating}
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
    posts: state.listings,
    query: state.searchQuery
  };
};

let Search = connect(mapStateToProps)(UnconnectedSearchResult);
export default Search;
