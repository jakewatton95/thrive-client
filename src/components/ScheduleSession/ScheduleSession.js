import React, {useState} from 'react'
import './ScheduleSession.css'
import DatePicker from "react-datepicker"
import {Form, Button} from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import Times from "../../data/times"
import moment from 'moment'
import { getUserInfo, getProductList, addSession } from '../../helpers'

const ScheduleSession = ({fromInvoice}) => {

    const {currentUserInfo} = getUserInfo()
    const userRole = currentUserInfo.role
    const {data: productData, loading, errors: productErrors} = getProductList(currentUserInfo)
    const products = userRole == "Admin" ? (productData && productData.productsByCompany) : 
                                userRole == "Student" ? productData && productData.productsByStudent : 
                                    userRole == "Tutor" ? productData && productData.productsByTutor : []

    const [scheduleNewSession] = addSession(currentUserInfo)

    const [productID, setProductID] = useState('')
    const [date, setDate] = useState(fromInvoice ? moment().startOf('day') : moment().startOf('day').add(1, 'day').hour(19))
    const [sessionLength, setSessionLength] = useState('1.5')
    const [location, setLocation] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        scheduleNewSession({variables: {
            productid: parseInt(productID),
            date: date.toISOString(),
            length: parseFloat(sessionLength),
            location,
            studentconfirmed : userRole == 'Student',
            tutorconfirmed : userRole == 'Tutor'
        }})
    }

    let productSelect
    let defaultString = ''
    if (!loading) {
        if (userRole === "Admin") {
            defaultString = "Product"
            productSelect = products.map(product => 
                <option key = {product.id} value = {product.id}>Student: {product.student.name}, Tutor: {product.tutor.name}, Subject: {product.subject}</option>)
        } else if (userRole === "Student"){
            defaultString = "Tutor"
            productSelect = products.map(product => 
                <option key = {product.id} value = {product.id}>{product.subject} with {product.tutor.name}</option>)
        } else if (userRole === "Tutor") {
            defaultString = "Student"
            productSelect = products.map(product => 
                <option key = {product.id} value = {product.id}>{product.subject} with {product.student.name}</option>)
        }
    }

    if (loading) return <div> loading...</div>
    return (
        <Form className="new-session-form" onSubmit={handleSubmit}>
            <div className="new-session-title">{fromInvoice ? "Create Old Session" : "Request A Session"}</div>
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
                <DatePicker className="schedule-session-datepicker" selected={date.toDate()} onChange={date => setDate(moment(date))} showTimeSelect dateFormat = 'Pp' maxDate = {fromInvoice ? moment().toDate() : null} minDate={fromInvoice? null: moment().toDate()}/>
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
                {fromInvoice ? "Create Session" : "Schedule Session"}
            </Button>
        </Form>
    )
}
export default ScheduleSession