import React, { Component } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Checkout from './Checkout.jsx'

class DateSelect extends Component {
  state = {
    date: [new Date(), new Date()],
  }

  onChange = (date) =>{
      this.setState({ date })
      console.log(date)
      this.props.onClick(date)
  }
  

  render() {
    return (
      <div style = {{color: "lightgrey"}}>
        <DateRangePicker 
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}
export default DateSelect

