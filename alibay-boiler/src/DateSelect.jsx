import React, { Component } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

class DateSelect extends Component {
  state = {
    date: [new Date(), new Date()],
  }

  onChange = (date) =>{
      this.setState({ date })
      console.log(date)
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