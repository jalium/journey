import React, { Component } from "react";
import "./main.css";
import RatingStatic from './RatingStatic.jsx'
import Payment from './Stripe.jsx'

class SelectCard extends Component {
  render = () => {
    return (
      <div className="oneCard">
        <div>{this.props.card.listingTitle}</div>
        <div>destination: {this.props.card.destination}</div>
        <div>
          amenities:
          {this.props.card.amenities.map(amen => {
            if (amen === "hiking") {
              return <div>"hiking img"</div>;
            }
            if (amen === "luxury hotel") {
              return <div>"luxury hotel img"</div>;
            }
          })} 
        </div>
        <div>rating: <RatingStatic rating = {this.props.card.rating}/></div>
        <div>travel dates: {this.props.card.date}</div>
        <div>total price: {this.props.card.price}</div>
        <img height="100px" src={this.props.card.frontendPath} />
        <div><Payment /></div> 
      </div>
    );
  };
}

export default SelectCard;

// i want to post the stars in each card. I'll take the this.props.card.rating and then display it as stars using RatingStatic.