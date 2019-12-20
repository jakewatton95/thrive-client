import React, {Component} from 'react'
import './ScheduleSession.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Times from "../data/times"

class ScheduleSession extends Component {
    _isMounted = false
    constructor(props){
        super(props)
        
        this.state = {
            productID: '',
            userRole: props.userInfo.attributes["custom:userRole"],
            date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(20,0,0),
            sessionLength: '1.5',
            tutorID: '',
            studentID: '',
            username: props.userInfo.username,
            location: ''
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCalendarChange = this.handleCalendarChange.bind(this)
    }
    
    handleSubmit(e){
        e.preventDefault()
        let {productID, userRole, location, sessionLength, date} = this.state
        if (productID === '')
            alert("Please Select your Tutor and Subject")
        else {
            const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions"
            const fullURL = endpoint + "?productID=" + productID + "&userRole=" + userRole + "&location=" + location + "&sessionLength=" + sessionLength + "&date=" + new Date(date).toISOString().slice(0, 19).replace('T', ' ');
            fetch(fullURL, {method: "POST"})
            .then(response => {
                console.log(response.json())
                alert ("Session Requested!")
                this.setState({
                    productID : '',
                    location : '',
                    sessionLength: '1.5',
                    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(20,0,0)
                })
                window.location.reload()
            })
            .catch(err => {
                console.log("ERR: " + err)
                alert("There was an Error Requesting this Session: " + err)
            })
        }
    }
    
    handleChange(e){
        let {id, value} = e.target
        if (id === 'sessionType') {
            this.setState({
                productID: value
            })
        } else if (id === "sessionLength") {
            this.setState({
                sessionLength: value
            })
        } else if (id === "location") {
            this.setState({
                location: value
            })
        }
    }
    
    handleCalendarChange(date) {
        this.setState({
            date: date
        });
    };
    
    render(){
        let products
        let defaultString = ''
        let {userRole} = this.state
        if (userRole === "Admin")
        {
            defaultString = "Product"
            products = this.props.products.map(product => 
                <option key = {product.ProductID} value = {product.ProductID}>Student: {product.Student}, Tutor: {product.Tutor}, Subject: {product.Subject}</option>)
        } else if (userRole === "Student"){
            defaultString = "Tutor"
            products = this.props.products.map(product => 
                <option key = {product.ProductID} value = {product.ProductID}>{product.Subject} with {product.Tutor}</option>)
        } else if (userRole === "Tutor") {
            defaultString = "Student"
            products = this.props.products.map(product => 
                <option key = {product.ProductID} value = {product.ProductID}>{product.Subject} with {product.Student}</option>)
        }
        return (
            <div className = "scheduleSessionField">
                <h2> Request a Session Here: </h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <select id="sessionType" onChange={this.handleChange} value={this.state.productID}>
                            <option disabled="disabled" value=''>---Select a {defaultString}---</option>
                            {products}
                        </select>               
                    </div>
                    <div>
                        Date: <DatePicker selected={this.state.date} onChange={this.handleCalendarChange} showTimeSelect dateFormat = 'Pp' minDate={new Date()}/>
                    </div>
                    <div>
                        Length: <select id = "sessionLength" onChange={this.handleChange} value = {this.state.sessionLength}>
                            {Times.map(time => <option key = {time.time} value = {time.value}>{time.time}</option>)}
                        </select>
                    </div>
                    <div>
                        Location: <input id = "location" type="text" placeholder='i.e. Online, Library, etc.' value={this.state.location} onChange={this.handleChange} required>
                        </input>
                    </div>
                    <button> Request</button>
                </form>
            </div>
        )
    }
}


export default ScheduleSession

