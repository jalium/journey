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
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

let RatingChangeApp = connect()(RatingChange);
export default RatingChangeApp

//SellerForm.jsx --> Parent
/*   handleRatingChange = rating => {
    console.log("You're in the handleRatingChange");
    console.log("This is the rating input", rating);
    this.setState({ rating: rating });
  };*/
//<RatingChangeApp onClick={this.handleRatingChange} />
//RatingChange.jsx --> Child
/*
onStarClick(nextValue, prevValue, name) {
    this.props.onClick(nextValue)
    this.setState({rating: nextValue});
  }
*/