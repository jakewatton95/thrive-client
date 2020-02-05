import React, { Component, useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import './AddProduct.css'
import { addProduct } from '../store/actions/actions'
import {getUserInfo, getStudentList, getTutorList} from '../helpers'

//TODO Note that products should have an active/inactive field (lets say the price changes, rather than 
//changing the product rate [which will affect prior sessions] the tutor should make a new product and maake
//the old product inactive)
const AddProduct = () => {
    const {currentUserInfo} = getUserInfo()
    const {data: studentData, loading: loading1, errors: studentErrors} = getStudentList(currentUserInfo)()
    const {data: tutorData, loading: loading2, errors: tutorErrors} = getTutorList(currentUserInfo)()
    const tutors = tutorData && tutorData.tutorsByCompany
    const students = studentData && studentData.studentsByCompany

    const [studentID, setStudentID] = useState('')
    const [tutorID, setTutorID] = useState('')
    const [subject, setSubject] = useState('')
    const [rate, setRate] = useState('')
    const [tutorShare, setTutorShare] = useState('')

    const handleSubmit = e => {
        console.log("Clicked")
        e.preventDefault()
        // const studentName = students.find(student => student.id == studentID).name
        // const tutorName = tutors.find(tutor => tutor.id == tutorID).name
        // const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products"
        // const fullURL = endpoint + "?tutorID=" + tutorID + "&studentID=" + studentID + "&rate=" + rate + "&subject=" + subject + "&tutorShare=" + tutorShare
        // fetch(fullURL, { method: "POST" })
        //     .then(response => response.json())
        //     .then(response => {
        //         dispatch(addProduct({ ProductID: response.insertId, Student: studentName, Subject: subject, Tutor: tutorName }))
        //         alert("Product Added!")
        //         //maybe move this to middleware
        //     })
        //     .catch(err => {
        //         console.log("ERR: " + err)
        //         alert("There was an Error Adding this Product: " + err)
        //     })
    }
    if (loading1 || loading2) return <div>Loading...</div>
    return (
        <Form className="new-product-form" onSubmit={handleSubmit}>
            <div className="new-product-title">Create New Product</div>
            <br />
            <Form.Group controlId="tutor">
                <Form.Label>Tutor:</Form.Label>
                <Form.Control className="tutor-input" required as="select" value={tutorID} onChange={e => setTutorID(e.target.value)}>
                    <option disabled="disabled" value=''>---Select a Tutor---</option>
                    {tutors.map(tutor => <option key={tutor.id} value={tutor.id}>{tutor.name}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="student">
                <Form.Label>Student:</Form.Label>
                <Form.Control className="student-input" required as="select" value={studentID} onChange={e => setStudentID(e.target.value)}>
                    <option disabled="disabled" value=''>---Select a Student---</option>
                    {students.map(student => <option key={student.id} value={student.id}>{student.name}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="subject">
                <Form.Label>Subject:</Form.Label>
                <Form.Control className="subject-input" required type="text" value={subject} onChange={e => setSubject(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="rate">
                <Form.Label>Rate:</Form.Label>
                <InputGroup>
                    <Form.Control className="rate-input" required type="number" value={rate} onChange={e => setRate(e.target.value)} />
                    <InputGroup.Append>
                        <InputGroup.Text id="append-dollars-hr">$/hr</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="tutorShare">
                <Form.Label>Tutor Share:</Form.Label>
                <InputGroup>
                    <Form.Control className="tutor-share-input" required type="number" value={tutorShare} onChange={e => setTutorShare(e.target.value)} />
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
export default AddProduct

