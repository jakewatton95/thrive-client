import React, { Component } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import './AddProduct.css'


//TODO Note that products should have an active/inactive field (lets say the price changes, rather than 
//changing the product rate [which will affect prior sessions] the tutor should make a new product and maake
//the old product inactive)

class AddProduct extends Component {
    constructor(props) {
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
        let { id, value } = e.target
        if (id === 'student') {
            this.setState({
                studentID: value
            })
        } else if (id === 'tutor') {
            this.setState({
                tutorID: value
            })
        } else if (id === 'rate') {
            this.setState({
                rate: value
            })
        } else if (id === 'subject') {
            this.setState({
                subject: value
            })
        } else if (id === 'tutorShare') {
            this.setState({
                tutorShare: value
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        let { studentID, tutorID, rate, subject, tutorShare } = this.state
        if (studentID === '' || tutorID === '' || rate === '' || subject === '' || tutorShare === '') {
            alert("Please enter an option in each field")
        } else {
            const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products"
            const fullURL = endpoint + "?tutorID=" + tutorID + "&studentID=" + studentID + "&rate=" + rate + "&subject=" + subject + "&tutorShare=" + tutorShare
            fetch(fullURL, { method: "POST" })
                .then(response => {
                    alert("Product Added!")
                    window.location.reload()
                })
                .catch(err => {
                    console.log("ERR: " + err)
                    alert("There was an Error Adding this Product: " + err)
                })
            e.target.reset()
        }
    }

    render() {
        let {subject, rate, tutorShare} = this.state
        return (
                <Form className="new-product-form" onSubmit={this.handleSubmit}>
                    <div className="new-product-title">Create New Product</div>
                    <br />
                    <Form.Group controlId="tutor">
                        <Form.Label>Tutor:</Form.Label>
                        <Form.Control className="tutor-input" required as="select" defaultValue='' onChange={this.handleChange}>
                            <option disabled="disabled" value=''>---Select a Tutor---</option>
                            {this.props.tutors.map(tutor => <option key={tutor.TutorID} value={tutor.TutorID}>{tutor.Name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="student">
                        <Form.Label>Student:</Form.Label>
                        <Form.Control className="student-input" required as="select" defaultValue='' onChange={this.handleChange}>
                            <option disabled="disabled" value=''>---Select a Student---</option>
                            {this.props.students.map(student => <option key={student.StudentID} value={student.StudentID}>{student.Name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="subject">
                        <Form.Label>Subject:</Form.Label>
                        <Form.Control className="subject-input" required type="text" value={subject} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="rate">
                        <Form.Label>Rate:</Form.Label>
                        <InputGroup>
                            <Form.Control className="rate-input" required type="number" value={rate} onChange={this.handleChange} /> 
                            <InputGroup.Append>
                                <InputGroup.Text id="append-dollars-hr">$/hr</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="tutorShare">
                        <Form.Label>Tutor Share:</Form.Label>
                        <InputGroup>
                        <Form.Control className="tutor-share-input" required type="number" value={tutorShare} onChange={this.handleChange} />
                        <InputGroup.Append>
                            <InputGroup.Text id="append-pct">%</InputGroup.Text>
                        </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Add Product
                    </Button>
                </Form>
        )
    }
}

export default AddProduct

