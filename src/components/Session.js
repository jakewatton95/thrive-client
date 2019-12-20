import React, {Component} from 'react'
import './Session.css'
import {Modal, Button} from 'react-bootstrap'
import Times from "../data/times"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class Session extends Component {
    constructor(props){
        super(props)
        this.state = {
            confirmed :'',
            show : true,
            newDate: null,
            newSessionLength: null,
            newLocation: null,
            studentConfirmed: props.sessionInfo.StudentConfirmed,
            tutorConfirmed: props.sessionInfo.TutorConfirmed,
            editing : false,
            cancelling : false
        }
        this.confirm = this.confirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleModalCloseSave = this.handleModalCloseSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCalendarChange = this.handleCalendarChange.bind(this)
        this.handleCancelSession = this.handleCancelSession.bind(this)
    }
    
    handleCalendarChange(date) {
        this.setState({
            newDate: date
        });
    };
    
    handleChange(e){
       let {id, value} = e.target
       if (id == 'sessionLength') {
            this.setState({
                newSessionLength: value
            })
       } else if (id == 'location') {
           this.setState({
               newLocation: value
           })
       }
    }
    
    handleEdit(){
        this.setState({
            editing: true
        })
    }
    
    handleModalClose(){
        this.setState({
            editing: false,
            cancelling: false
        })
    }
    
    handleModalCloseSave(){//TODO alert counterparty
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/updateSession"
        let {ID} = this.props.sessionInfo
        let {newLocation, newSessionLength, newDate} = this.state
        let {Location, date, SessionLength} = this.props.sessionInfo

        let updateLocation = newLocation ? newLocation : Location 
        let updateDate = newDate ? newDate : date
        let updateLength = newSessionLength ? newSessionLength : SessionLength
        endpoint += '?sessionID=' + ID + '&length=' + updateLength + '&date=' + new Date(updateDate).toISOString().slice(0, 19).replace('T', ' ') + '&location=' + updateLocation
        console.log(endpoint)
        
        fetch(endpoint, {method: "PUT"})
        .then(() =>        
            this.setState({
                editing: false
            })
        ).then(()=>window.location.reload())
        .catch(err => console.log("ERR: " + err))
    }
    
    handleCancel(){
        this.setState({
            cancelling: true
        })
    }
    
    handleCancelSession(){
        console.log(Date.parse(this.props.sessionInfo.date) - Date.parse(new Date()))
        if (Date.parse(this.props.sessionInfo.date) - Date.parse(new Date()) < (3*24*60*60*1000))
            console.log('Late Cancel')
        if (confirm("Are you sure you want to cancel this session? You may be charged if you have violated the late cancellation policy! Please speak to your administrator if you have questions.")) {
            let {ID} = this.props.sessionInfo
            let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?ID=" + ID
            fetch(endpoint, {method: "DELETE"})
            .then(response => response.json())
            .then(response => {
                alert('Session was successfully cancelled')
                this.setState({
                    show: false,
                    cancelling: false
                })
            })
            .then(() => window.location.reload())
            .catch(err => alert("Error cancelling session: " + err))
        }
    }
    
    confirm(){
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions"
        let {ID} = this.props.sessionInfo

        if (this.props.userRole === 'Student') {
            this.setState({
                studentConfirmed: true
            })
            endpoint += '?userRole=Student&sessionID=' + ID
        } else if (this.props.userRole === 'Tutor') {
            this.setState({
                tutorConfirmed: true
            })
            endpoint += '?userRole=Tutor&sessionID=' + ID
        }
        fetch(endpoint, {method: "PUT"})
        .catch(err => console.log("ERR: " + err))
    }
    
    render(){
        let {Tutor, Student, Subject, Location, date, SessionLength} = this.props.sessionInfo
        let {studentConfirmed, tutorConfirmed, show, cancelling, editing, newLocation, newDate, newSessionLength} = this.state
        let {userRole, secondaryRole} = this.props
        let dateFormatted = new Date(Date.parse(date))
        return (
        <React.Fragment>
        <Modal show={cancelling} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cancel Session</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {userRole !== 'Student' ? <div>Student: {Student} </div> : null}
                {userRole !== 'Tutor' ? <div> Tutor: {Tutor} </div> : null}
                <div>
                    Date: {dateFormatted.toLocaleDateString()} at {dateFormatted.toLocaleTimeString()}
                </div>
                <div>
                    Location: {Location}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleModalClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleCancelSession}>
                    Cancel Session
                </Button>
            </Modal.Footer>
        </Modal>
            
        <Modal show={editing} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Session Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {userRole !== 'Student' ? <div>Student: {Student} </div> : null}
                {userRole !== 'Tutor' ? <div> Tutor: {Tutor} </div> : null}
                <div>
                    Date: <DatePicker id = "date" selected={newDate ? newDate : dateFormatted } onChange={this.handleCalendarChange} showTimeSelect dateFormat = 'Pp' minDate={new Date()}/>
                </div>
                <div>
                    Length: <select id = "sessionLength" onChange={this.handleChange} value = {newSessionLength ? newSessionLength : SessionLength}>
                        {Times.map(time => <option key = {time.time} value = {time.value}>{time.time}</option>)}
                            </select>
                </div>
                <div>
                    Location: <input id = "location" type="text" placeholder='i.e. Online, Library, etc.' value={newLocation ? newLocation : Location} onChange={this.handleChange} required>
                        </input>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleModalClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleModalCloseSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
            
        <div className = {show ? "flexContainer sessionWrapper" : "hiddenWrapper"}>
            <div>
                {userRole !== 'Student' ? <div>Student: {Student} </div> : null}
                {userRole !== 'Tutor' ? <div> Tutor: {Tutor} </div> : null}
                <div> Subject: {Subject}
                </div>
                <div>
                Location: {Location} on {dateFormatted.toLocaleDateString()} at {dateFormatted.toLocaleTimeString()}
                </div>
                {userRole == 'Student' && !studentConfirmed && 
                !this.props.secondaryRole && new Date() < new Date(Date.parse(date)) ? // && this.props.isPrimary ? 
                    <button onClick={this.confirm}> Confirm </button> : null}
                {userRole == 'Tutor' && !tutorConfirmed && !this.props.secondaryRole && new Date() < new Date(Date.parse(date)) ? //&& this.props.isPrimary ?
                    <button onClick={this.confirm}> Confirm </button> : null}
                <div>
                    StudentConfirmed: {studentConfirmed == 1? 'yes' : 'no'}
                    <br/>
                    TutorConfirmed: {tutorConfirmed == 1? 'yes': 'no'}
                </div>
            </div>
            <div> 
                <div>
                    {(userRole == 'Student' || userRole == 'Tutor') && secondaryRole !== 'Admin' && new Date() < new Date(Date.parse(date)) ? <button className="cancel-button" onClick = {this.handleCancel}> Cancel </button> : null} 
                </div>
                <div>
                    {(userRole == 'Student' || userRole == 'Tutor') && secondaryRole !== 'Admin' && new Date() < new Date(Date.parse(date)) ? <button className="edit-button" onClick = {this.handleEdit}> Edit </button> : null}
                </div>
            </div>
        </div>
        </React.Fragment>
        )
    }
}
export default Session