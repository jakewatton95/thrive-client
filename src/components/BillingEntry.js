import React, {Component} from 'react'
import './BillingEntry.css'
import Times from "../data/times"

class BillingEntry extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: '',
            sessionLength: '',
            location: ''
        }
    }
    
    render(){
        let {Tutor, Student, Rate, Location, date, SessionLength, TutorShare} = this.props.billingInfo
        let {userRole} = this.props
        let dateFormatted = new Date(Date.parse(date))
        let totalCost = parseFloat(Rate) * parseFloat(SessionLength)
        let tutorOwed = totalCost * parseFloat(TutorShare)/100.0
        let tutorRate = parseFloat(Rate) * parseFloat(TutorShare)/100.0
        return (
        <div className = "billingEntryWrapper">
            {userRole !== 'Student' ? <div>Student: {Student} </div> : null}
            {userRole !== 'Tutor' ? <div> Tutor: {Tutor} </div> : null}
            {userRole !== 'Tutor' ? <div> Rate: {Rate}$/hr </div> : null}
            {userRole == 'Tutor' ? <div> My Rate: {tutorRate.toFixed(2)}$/hr </div> : null}
            <div> Session Length: {SessionLength} hours</div>
            {userRole !== 'Tutor' ? <div> Total Cost: ${totalCost.toFixed(2)} </div> : null}
            {userRole !== 'Student' ? <div>Tutor is owed ${tutorOwed.toFixed(2)}</div> : null}
            <div> Location: {Location} on {dateFormatted.toLocaleDateString()} at  {dateFormatted.toLocaleTimeString()} </div>
        </div>
        
        )
    }
}
export default BillingEntry