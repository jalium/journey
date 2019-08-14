import React, { Component } from "react";
import "./main.css";

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
        <div>rating: {this.props.card.rating}</div>
        <div>travel dates: {this.props.card.date}</div>
        <div>total price: {this.props.card.price}</div>
        <img height="100px" src={this.props.card.frontendPath} />
      </div>
    );
  };
}

export default SelectCard;
