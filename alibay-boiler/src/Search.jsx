import { connect } from "react-redux";
import React, { Component } from "react";

class UnconnectedSearch extends Component {
  handleSubmit = event => {
    event.preventDefault();
    console.log("search form submitted");
    console.log("search", this.props.query);
    this.props.dispatch({ type: "query", q: this.searchInput.value });
  };

  handleClear = event => {
    event.preventDefault();
    this.props.dispatch({ type: "query", q: "" });
  };

  render = () => {
    return (
      <div class="search-container">
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              class="search-input"
              placeholder="Search experiences..."
              type="text"
              ref={ref => (this.searchInput = ref)}
            />
            <input type="submit" value="Search" />
          </form>
          <form onSubmit={this.handleClear}>
            <input type="submit" value="Clear Search" />
          </form>
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
