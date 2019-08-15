import { connect } from "react-redux";
import React, { Component } from "react";
class UnconnectedSearch extends Component {
  handleSubmit = event => {
    this.props.dispatch({ type: "query", q: event.target.value });
  };
  render = () => {
    return (
      <div>
        <div>
          Search for a destination
          <input type="text" list="data" onSubmit={this.onSubmit} />
          <datalist id="data">
            {this.props.posts.map(destination => (
              <option key={destination} value={desitnation.displayValue} />
            ))}
          </datalist>
        </div>
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

let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
