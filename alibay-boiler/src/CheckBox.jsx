import React, { Component } from 'react'
class Amenities extends Component {
  constructor() {
    super()
    this.state = {
      amenities: []
    }
  }

handleOnChange = (e) => {
    let amenities = this.state.amenities //get the current state
    if (e.target.checked) { //if the checkbox is clicked, then push the amenity in the array
      amenities.push(e.target.value)
    } else { // else, remove it from the array
      let index = amenities.indexOf(e.target.value)
      amenities.splice(index, 1)
    }

    this.setState({ amenities: amenities }) // set the state back to amenities
    this.props.onCheck(amenities)
    console.log(this.state.amenities) 
  }

  render() {
    return (
        <form>
          <div>
            <label>Wi-Fi</label> {/* Copy Paste this for the rest of the amenities */}
            <input type="checkbox" value={"Wifi"} onChange={this.handleOnChange.bind(this)} />
          </div>
          <div>
            <label>Hiking</label>
            <input type="checkbox" value={"Hiking"} onChange={this.handleOnChange.bind(this)} />
          </div>
          <div>
            <label>Spa</label>
            <input type="checkbox" value={"Spa"} onChange={this.handleOnChange.bind(this)} />
          </div>
          <div>
            <label>Pool</label>
            <input type="checkbox" value={"Pool"} onChange={this.handleOnChange.bind(this)} />
          </div>
          <div>
            <label>Parking</label>
            <input type="checkbox" value={"Parking"} onChange={this.handleOnChange.bind(this)} />
          </div>
          <div>
            <label>Butler</label>
            <input type="checkbox" value={"Butler"} onChange={this.handleOnChange.bind(this)} />
          </div>
        </form>
    )
  }
}
export default Amenities