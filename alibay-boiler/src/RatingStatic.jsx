import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import {Component} from 'react'
 
class RatingStatic extends Component {

  render() {
    return (                
      <div>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={this.props.rating} 
        /> {/* want to send props of this.props.card.rating here */}
      </div>
    );
  }
}

export default RatingStatic

