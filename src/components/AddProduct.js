import React, {Component} from 'react'
import './AddProduct.css'

class AddProduct extends Component {
    constructor (props){
        super(props)
        this.state = {
            studentID: '',
            tutorID: '',
            subject: '',
            rate: 100,
            tutorShare: 70
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(e) {
        let {id, value} = e.target
        if (id === 'student') {
            this.setState({
                studentID: e.target.value
            })
        } else if (id === 'tutor') {
            this.setState({
                tutorID: e.target.value
            })
        } else if (id === 'rate') {
            this.setState({
                rate: e.target.value
            })
        } else if (id === 'subject') {
            this.setState({
                subject: e.target.value
            })
        } else if (id === 'tutorShare') {
            this.setState({
                tutorShare: e.target.value
            })
        }
    }
    
    handleSubmit(e){
        e.preventDefault()
        let {studentID, tutorID, rate, subject, tutorShare} = this.state
        if(studentID === '' || tutorID === '' || rate === '' || subject === '' ||  tutorShare ==='') {
            alert ("Please enter an option in each field")
        } else {
            const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products"
            const fullURL = endpoint + "?tutorID=" + tutorID + "&studentID=" + studentID + "&rate=" + rate + "&subject=" + subject + "&tutorShare=" + tutorShare
            fetch(fullURL, {method: "POST"})
            .then(response => {
                alert ("Product Added!")
                window.location.reload()
            })
            .catch(err => {
                console.log("ERR: " + err)
                alert("There was an Error Adding this Product: " + err)
            })
            e.target.reset()
        }
    }
    
    render(){
        return (
            <div className = "newProductForm">
                <h3> Create New Product </h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label className="formLabel">Tutor: </label>
                        <select id="tutor" onChange={this.handleChange} defaultValue=''>
                            <option disabled="disabled" value=''>---Select a Tutor---</option>
                            {this.props.tutors.map(tutor => <option key = {tutor.Name} value = {tutor.TutorID}>{tutor.Name}</option> )}
                        </select>
                    </div>
                    <div>
                        <label className="formLabel">Student: </label>
                        <select id='student' onChange={this.handleChange} defaultValue=''>
                             <option disabled="disabled" value=''>---Select a Student---</option>
                            {this.props.students.map(student => <option key = {student.Name} value = {student.StudentID}>{student.Name}</option> )}
                        </select>
                    </div>
                    <div>
                        <label className="formLabel">Subject: </label>
                        <input id='subject' type='text' onChange={this.handleChange} value={this.state.subject} required/>
                    </div>
                    <div>
                        <label className="formLabel">Hourly Rate: </label>
                        <input id = 'rate' type='number' onChange={this.handleChange} value={this.state.rate} min='0' max='1000' required/> $/hr
                    </div>
                    <div>
                        <label className="formLabel">Tutor Percentage: </label>
                        <input id = 'tutorShare' type='number' onChange={this.handleChange} value = {this.state.tutorShare} min='0' max='100' required/>%
                    </div>
                    <div>
                        <button> Add </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddProduct

