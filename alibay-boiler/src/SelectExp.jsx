import React, { Component } from "react";
import "./main.css";
import RatingStatic from "./RatingStatic.jsx";
import Payment from "./Stripe.jsx";
import { Link } from "react-router-dom";
import DateSelect from "./DateSelect.jsx";
import Checkout from "./Checkout.jsx";

class SelectExp extends Component {
  constructor() {
    super();
    this.state = {
      dates: []
    };
  }
  handleDates = dateArray => {
    console.log("You're in the handleDates");
    console.log("This is the dateArray", dateArray);
    this.setState({ dates: dateArray });
  };
  render = () => {
    console.log("helllloooo");
    let amenitiesArray = [];
    if (Array.isArray(this.props.card.amenities)) {
      //the orignals from Mongo are set as arrays, right now it's check if it's an array
      //console.log("Yo")
      amenitiesArray = this.props.card.amenities;
    } else {
      // the new uploads are sent to Mongo as strings, so we're converting them here into arrays
      let amenitiesString = this.props.card.amenities;
      amenitiesArray = amenitiesString.split(",");
    }
    //console.log("amenitiesArray", amenitiesArray)
    const perks = amenitiesArray.map(amen => {
      return (
        <li>
          {amen} <img height="15px" src={"/uploads/" + amen + ".png"} />
        </li>
      ); //listing each one but we want to list each one with the image of the same name
    });
    return (
      <div className="scroll">
        <div className="oneCard">
          <div className="cardText">
            <div>{this.props.card.listingTitle}</div>
            <div>Destination: {this.props.card.destination}</div>
            <div>{perks}</div>
            <div>
              Rating: <RatingStatic rating={this.props.card.rating} />
            </div>
            <div>
              Travel Dates:
              <DateSelect onClick={this.handleDates} />
            </div>
            <div>Total Price: {this.props.card.price}</div>
            <div>
              <Link
                to={{
                  pathname: "/checkout/" + this.props.card._id,
                  state: { range: this.state.dates }
                }}
              >
                <button type="button">Book Now!</button>
              </Link>
            </div>
          </div>
          <div>
            <img
              height="393px"
              width="590px"
              src={this.props.card.frontendPath}
            />
          </div>
        </div>
        {/*<div><Payment price = {this.props.card.price} listingTitle = {this.props.card.listingTitle}/></div>*/}{" "}
        {/* this is the payment button */}
      </div>
    );
  };
}

export default SelectExp;

// i want to post the stars in each card. I'll take the this.props.card.rating and then display it as stars using RatingStatic.

//SellerForm.jsx --> Parent
/*   handleRatingChange = rating => {
    console.log("You're in the handleRatingChange");
    console.log("This is the rating input", rating);
    this.setState({ rating: rating });
  };*/
//<RatingChangeApp onClick={this.handleRatingChange} />
