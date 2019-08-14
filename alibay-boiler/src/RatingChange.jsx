import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {connect} from 'react-redux'
import {Component} from 'react'
 
class RatingChange extends Component {
  constructor() {
    super();
 
    this.state = {
      rating: 0
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.props.onClick(nextValue)
    this.setState({rating: nextValue});
  }
 
  render() {
    const { rating } = this.state;
    
    return (                
      <div>
        <div>What is the rating of this Vacation?</div>
        <StarRatingComponent 
          name="rate1" 
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

let RatingChangeApp = connect()(RatingChange);
export default RatingChangeApp
