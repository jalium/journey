
import React, { Component } from 'react'
class SellerForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            listingTitle: "",
            destination: "",
            amenities: "", //categories to click --> Look at airbnb
            rating: "", //leave it as a string for now but we want real stars
            date: "", //leave it as a string for now but we want a calender 
            price: "",
            photo: null
        //  XXX: ""
        //  XXX: ""
        }
    }
handleTitleChange = () => {
    console.log("You're in the handleTitleChange")
    console.log("This is the listTitle input", event.target.value)
    this.setState({listingTitle: event.target.value})
}
handleDestinationChange = () => {
    console.log("You're in the handleDestinationChange")
    console.log("This is the destintion input", event.target.value)
    this.setState({destination: event.target.value})
}
handleAmenitiesChange = () => {
    console.log("You're in the handleAmenitiesChange")
    console.log("This is the amenities input", event.target.value)
    this.setState({amenities: event.target.value})
}
handleRatingChange = () => {
    console.log("You're in the handleRatingChange")
    console.log("This is the rating input", event.target.value)
    this.setState({rating: event.target.value})
}
handleDateChange = () => {
    console.log("You're in the handleDateChange")
    console.log("This is the date input", event.target.value)
    this.setState({date: event.target.value})
}
handlePriceChange = () => {
    console.log("You're in the handlePriceChange")
    console.log("This is the price input", event.target.value)
    this.setState({price: event.target.value})
}
handlePhotoChange = () => {
    console.log("You're in the handlePhotoChange")
    console.log("This is the photo input", event.target.files[0])
    this.setState({photo: event.target.value})
}
/* use this to add informtion from the form to the state
handleXXXChange = () => {
    console.log("You're in the XXXChange")
    console.log("This is the XXX input", event.target.value)
    this.setState({XXX: event.target.value})
}
*/
handleSubmit = evt => {
    evt.preventDefault()
    console.log("You're in the handleSubmit")
    let data = new FormData()
    data.append("listingTitle", this.states.listingTitle)
    data.append("destination", this.states.destination)
    data.append("amenities"), this.states.amenities
    data.append("rating"), this.states.rating
    data.append("date"), this.states.date
    data.append("price", this.states.price)
    data.append("photo", this.state.photo)
    // data.append other info that we'll add to the form
    fetch('/XXXX',{ //sellerform endpoint
        method: "POST",
        body: data
    })
}
render = () => {
    return(
        <form onSubmit = {this.handleSubmit}>
            <div>
                What is the listing title?
                <input type = 'text' onChange = {this.handleTitleChange}/>
                <div>
                   What is the destination? 
                   <input type = 'text' onChange = {this.handleDestinationChange}/>
                   <div>
                       What are the amenities?
                       <input type = 'text' onChange = {this.handleAmenitiesChange}/>
                       <div>
                            What is the rating of this vacation?
                            <input type = 'text' onChange = {this.handleRatingChange}/>
                           <div>
                                What are the dates of this vacation?
                                <input type = 'text' onChange = {this.handleDateChange}/>
                               <div>
                                   What is the price? 
                                   <input type = 'text' onChange = {this.handleDateChange}/>
                                   <div>
                                       Please upload a nice picutre
                                       <input type = 'file' onChange = {this.handlePhotoChange}/>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
            <input type = 'submit'/>
        </form>
        )
    }
}
export default SellerForm