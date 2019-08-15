import React, { Component } from "react";
import "./main.css";
import RatingStatic from './RatingStatic.jsx'
import Payment from './Stripe.jsx'

class SelectExp extends Component {
  render = () => {
    let amenitiesArray = []
    if(Array.isArray(this.props.card.amenities)){ //the orignals from Mongo are set as arrays, right now it's check if it's an array
      console.log("Yo")
      amenitiesArray = this.props.card.amenities
    } else { // the new uploads are sent to Mongo as strings, so we're converting them here into arrays
    let amenitiesString = this.props.card.amenities
    amenitiesArray = amenitiesString.split(",")
    }
    console.log("amenitiesArray", amenitiesArray)
    const perks = amenitiesArray.map(amen => {
      return <li>{amen} <img height = "15px" src = {"/uploads/"+amen+".png"}/></li>; //listing each one but we want to list each one with the image of the same name
 });
    return (
      <div className="oneCard">
        <div>{this.props.card.listingTitle}</div>
        <div>Destination: {this.props.card.destination}</div>
        <div>{perks}</div>
        {/*<div>
          amenities:
          {this.props.card.amenities.map(amen => {
            if (amen === "hiking") {
              return <div>"hiking img"</div>;
            }
            if (amen === "luxury hotel") {
              return <div>"luxury hotel img"</div>;
            }
          })} 
        </div>*/}
        <div>Rating: <RatingStatic rating = {this.props.card.rating}/></div>
        <div>Travel Dates: {this.props.card.date}</div>
        <div>Total Price: {this.props.card.price}</div>
        <img height="100px" src={this.props.card.frontendPath} />
        <div><Payment /></div> 
      </div>
    );
  };
}

export default SelectExp;

// i want to post the stars in each card. I'll take the this.props.card.rating and then display it as stars using RatingStatic.