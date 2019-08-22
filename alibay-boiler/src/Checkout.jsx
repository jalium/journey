import React, { Component } from "react";
import "./main.css";
import RatingStatic from "./RatingStatic.jsx";
import Payment from "./Stripe.jsx";
import { Link } from "react-router-dom";
import DateSelect from "./DateSelect.jsx";

class Checkout extends Component {
  render = () => {
    console.log(this.props.range);
    let amenitiesArray = [];
    if (Array.isArray(this.props.card.amenities)) {
      amenitiesArray = this.props.card.amenities;
    } else {
      // the new uploads are sent to Mongo as strings, so we're converting them here into arrays
      let amenitiesString = this.props.card.amenities;
      amenitiesArray = amenitiesString.split(",");
    }
    const perks = amenitiesArray.map(amen => {
      return (
        <div>
          <img height="15px" src={"/uploads/" + amen + ".png"} /> {amen}
        </div>
      ); //listing each one but we want to list each one with the image of the same name
    });
    return (
      <div className="scroll">
        <div className="oneCard">
          <div classname="cardText">
            <h2>{this.props.card.listingTitle}</h2>
            <div>
              Rating: <RatingStatic rating={this.props.card.rating} />
            </div>
            <div>Destination: {this.props.card.destination}</div>
            <div className="amenities">
              <h3>{"Amenities"}</h3>
              {perks}
            </div>
            <div>Total Price: {this.props.card.price}</div>
            <div>
              Dates Selected:{" "}
              {this.props.range.map(date => {
                return <div> {date.toDateString()} </div>;
              })}
            </div>
            <div>
              <Payment
                price={this.props.card.price}
                listingTitle={this.props.card.listingTitle}
              />
            </div>{" "}
            {/* this is the payment button */}
          </div>
          <img
            height="393px"
            width="590px"
            src={this.props.card.frontendPath}
          />
        </div>
      </div>
    );
  };
}

export default Checkout;

// i want to post the stars in each card. I'll take the this.props.card.rating and then display it as stars using RatingStatic.
