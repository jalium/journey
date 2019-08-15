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
        stripeKey="pk_test_qRGpFETRAqOH6ezj3M3lYdgI00WjINP97n"
      />
    )
  }
}

export default Payment 