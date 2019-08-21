import React, { Component } from "react";
import "./main.css";
import RatingStatic from './RatingStatic.jsx'
import Payment from './Stripe.jsx'
import { Link } from "react-router-dom";
import DateSelect from "./DateSelect.jsx"


class DateAppearing extends Component {
  render = () => {
      return(
          <div>
            {this.props.range}
          </div>
      )
  }
}
export default DateAppearing;

// i want to post the stars in each card. I'll take the this.props.card.rating and then display it as stars using RatingStatic.
