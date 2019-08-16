import React from 'react'
import { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';

class Payment extends Component{
onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        label= "Book now!"
        amount = {this.props.price*100} //*100 because 1 = $0.01
        billingAddress
        name = {this.props.listingTitle}
        image="/uploads/Japan.jpeg"
        stripeKey="pk_test_qRGpFETRAqOH6ezj3M3lYdgI00WjINP97n"
        locale="auto"
        description="Journey Get Away Today"
      />
    )
  }
}

export default Payment 