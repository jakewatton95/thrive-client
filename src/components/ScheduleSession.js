import React, {Component, useState} from 'react'
import './ScheduleSession.css'
import DatePicker from "react-datepicker"
import {Form, Button} from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import Times from "../data/times"
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { addSession } from '../store/actions/actions'

const ScheduleSession = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)
    const tutors = useSelector(state => state.tutors)
    const students = useSelector(state => state.students)
    const userInfo = useSelector(state => state.userInfo)

    const [productID, setProductID] = useState('')
    const [date, setDate] = useState(moment().startOf('day').add(1, 'day').hour(19))
    const [sessionLength, setSessionLength] = useState('1.5')
    const [location, setLocation] = useState('')

    const userRole = userInfo.UserType

    const findStudentID =  () => {
        const studentName = products.find(product => product.ProductID == productID).Student
        const student = students.find(student => student.Name == studentName)
        return student ? student.StudentID : null
    }

    const findTutorID =  () => {
        const tutorName = products.find(product => product.ProductID == productID).Tutor
        const tutor = tutors.find(tutor => tutor.Name == tutorName)
        return tutor ? tutor.TutorID : null
    }

    const handleSubmit = e => {
            e.preventDefault()
            const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions"
            const fullURL = endpoint + "?productID=" + productID + "&userRole=" + userRole + "&location=" + location + "&sessionLength=" + sessionLength + "&date=" + date.toISOString().slice(0, 19).replace('T', ' ');
            fetch(fullURL, {method: "POST"})
                .then(response => response.json())
                .then(response => ({
                        Student: products.find(product => product.ProductID == productID).Student,
                        Tutor: products.find(product => product.ProductID == productID).Tutor,
                        ProductID: productID,
                        TutorID: findTutorID(),
                        StudentID: findStudentID(),
                        Subject: products.find(product => product.ProductID == productID).Subject,
                        ID: response.insertId,
                        date: date.toISOString(),
                        SessionLength: sessionLength,
                        Location: location,
                        StudentConfirmed: userRole == "Student",
                        TutorConfirmed: userRole == "Tutor"
                    }))
                .then(response => {
                    dispatch(addSession(response))
                    //maybe move all this to middleware
                    //store in redux
                    alert ("Session Requested!")
                })
                .catch(err => {
                    console.log("ERR: " + err)
                    alert("There was an Error Requesting this Session: " + err)
                })
            }

    let productSelect
    let defaultString = ''
    if (userRole === "Admin")
    {
        defaultString = "Product"
        productSelect = products.map(product => 
            <option key = {product.ProductID} value = {product.ProductID}>Student: {product.Student}, Tutor: {product.Tutor}, Subject: {product.Subject}</option>)
    } else if (userRole === "Student"){
        defaultString = "Tutor"
        productSelect = products.map(product => 
            <option key = {product.ProductID} value = {product.ProductID}>{product.Subject} with {product.Tutor}</option>)
    } else if (userRole === "Tutor") {
        defaultString = "Student"
        productSelect = products.map(product => 
            <option key = {product.ProductID} value = {product.ProductID}>{product.Subject} with {product.Student}</option>)
    }

    return (
        <Form className="new-session-form" onSubmit={handleSubmit}>
            <div className="new-session-title">Request A Session</div>
            <br />
            <Form.Group controlId="sessionType">
                <Form.Label>Product:</Form.Label>
                <Form.Control className="session-type-input" required as="select" defaultValue='' onChange={e => setProductID(e.target.value)}>
                    <option disabled="disabled" value=''>---Select a {defaultString}---</option>
                    {productSelect}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="date">
                <Form.Label>Date:</Form.Label><br/>
                <DatePicker className="schedule-session-datepicker" selected={date.toDate()} onChange={date => setDate(moment(date))} showTimeSelect dateFormat = 'Pp' minDate={moment().toDate()}/>
            </Form.Group>
            <Form.Group controlId="sessionLength">
                <Form.Label>Length:</Form.Label>
                <Form.Control className="length-input" required as="select" value={sessionLength} onChange={e => setSessionLength(e.target.value)}>
                    {Times.map(time => <option key={time.time} value={time.value}>{time.time}</option>)}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="location">
                <Form.Label>Location:</Form.Label>
                <Form.Control className="location-input" required type="text" value={location} onChange={e=> setLocation(e.target.value)} />
            </Form.Group>
            <Button variant="success" type="submit">
                Schedule Session
            </Button>
        </Form>
    )
}
export default ScheduleSession