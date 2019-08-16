import React, { Component } from "react";
import RatingChangeApp from "./RatingChange.jsx";
import Amenities from "./CheckBox.jsx";

class SellerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listingTitle: "",
      destination: "",
      amenities: [], //this needs to submit as an array into mongo
      rating: "",
      date: [], //leave it as a string for now but we want a calender
      price: "",
      img: null
      //  XXX: ""
      //  XXX: ""
    };
  }
  handleTitleChange = () => {
    console.log("You're in the handleTitleChange");
    console.log("This is the listTitle input", event.target.value);
    this.setState({ listingTitle: event.target.value });
  };
  handleDestinationChange = () => {
    console.log("You're in the handleDestinationChange");
    console.log("This is the destintion input", event.target.value);
    this.setState({ destination: event.target.value });
  };
  handleAmenitiesChange = amenities => {
    console.log("You're in the handleAmenitiesChange");
    console.log("This is the amenities input", amenities);
    this.setState({ amenities: amenities });
  };
  handleRatingChange = rating => {
    console.log("You're in the handleRatingChange");
    console.log("This is the rating input", rating);
    this.setState({ rating: rating });
  };
  handleDateChange = (dateRange) => {
    console.log("You're in the handleDateChange");
    console.log("This is the date input", dateRange);
    this.setState({ date: dateRange });
  };
  handlePriceChange = () => {
    console.log("You're in the handlePriceChange");
    console.log("This is the price input", event.target.value);
    this.setState({ price: event.target.value });
  };
  handlePhotoChange = () => {
    console.log("You're in the handlePhotoChange");
    console.log("This is the photo input", event.target.files[0]);
    this.setState({ img: event.target.files[0] });
  };
  /* use this to add informtion from the form to the state
handleXXXChange = () => {
    console.log("You're in the XXXChange")
    console.log("This is the XXX input", event.target.value)
    this.setState({XXX: event.target.value})
}
*/
  handleSubmit = evt => {
    evt.preventDefault();
    console.log("You're in the handleSubmit", this.state);
    let data = new FormData();
    data.append("listingTitle", this.state.listingTitle);
    data.append("destination", this.state.destination);
    data.append("amenities", this.state.amenities);
    data.append("rating", this.state.rating);
    data.append("date", this.state.date);
    data.append("price", this.state.price);
    data.append("img", this.state.img);
    // data.append other info that we'll add to the form
    fetch("/sellExp", {
      //sellerform endpoint
      method: "POST",
      body: data
    });
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>List a vacation</h2>
        <div>
          What is the listing title?
          <input type="text" onChange={this.handleTitleChange} />
          <div>
            What is the destination?
            <input type="text" onChange={this.handleDestinationChange} />
            <div>
              What are the amenities?
              <Amenities onCheck={this.handleAmenitiesChange} />
              <div>
                <RatingChangeApp onClick={this.handleRatingChange} />
                  <div>
                    What is the price?
                    <input type="text" onChange={this.handlePriceChange} />
                    <div>
                      Please upload a nice picutre
                      <input type="file" onChange={this.handlePhotoChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <input type="submit" />
      </form>
    );
  };
}
export default SellerForm;
