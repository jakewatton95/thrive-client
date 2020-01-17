import React, {Component} from 'react'
import UpcomingSessions from './Sessions/UpcomingSessions'
import './Profile.css'

class StudentProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentID: props.match.params.studentID,
            paymentAmount: 100,
            addedPayment: 0
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.recordPayment = this.recordPayment.bind(this)
        this.getAmountPaid = this.getAmountPaid.bind(this)
        this.getStudent = this.getStudent.bind(this)
        this.getAmountOwed = this.getAmountOwed.bind(this)
    }
    
    recordPayment(e){
        e.preventDefault()
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?studentID=" + this.state.studentID + "&amount=" +  this.state.paymentAmount
        fetch(endpoint, {method: "POST"})
        .then(() => {
            alert("Payment Logged")
            this.setState({
                addedPayment: parseFloat(this.state.addedPayment) + parseFloat(this.state.paymentAmount),
                paymentAmount: 100
            })
        })
        .catch(err => console.log("Error Recording Payment:" + err))
    }
    
    handleChange(e){
        let {id, value} = e.target
        if (id === 'payment'){
            this.setState({
                paymentAmount: value
            })
        }
    }
    getStudent(){
        return this.props.students.find(student => student.StudentID == this.state.studentID)
    }
    getAmountPaid(){
        let totalAmount = this.props.payments.filter(payment => payment.StudentID == this.state.studentID).reduce((total, payment) => total += payment.Amount, 0)
        return totalAmount + this.state.addedPayment
    }
    getAmountOwed(){
        let amountOwed = this.props.billings.filter(billing => billing.StudentID == this.state.studentID && Date.now() > Date.parse(billing.date)).reduce((total, billing) => total+= billing.Rate * billing.SessionLength, 0)
        return amountOwed
    }
    render() {
        let student = this.getStudent()
        let amountPaid = this.getAmountPaid()
        let amountOwed = this.getAmountOwed()
        let {sessions} = this.props
        return (
            <React.Fragment>
                <h2> Viewing info for {student ? student.Name : null}</h2>
                <div> Email: {student ? student.Email : null} </div>
                <div> Phone: {student ? student.Phone : null} </div>
                <div className="amountOwed" > Amount Student Owes: ${amountOwed.toFixed(2)} </div> 
                <div className="amountPaid" > Amount Student Paid: ${amountPaid.toFixed(2)} </div>
                {amountOwed > amountPaid ? <div> {student.Name} owes you ${Math.ceil((parseFloat(amountOwed)-parseFloat(amountPaid))*100)/100} </div> : null}
                <div> Record a payment: <form onSubmit = {this.recordPayment} ><input type="number" min="0.01" step = ".01" value = {this.state.paymentAmount} onChange = {this.handleChange} id="payment"/> $ <button> Submit </button></form></div>
                <UpcomingSessions userRole = "Student" secondaryRole="Admin" studentID={this.state.studentID} sessions={sessions}/> 
            </React.Fragment>
        )
    }
}


export default StudentProfile