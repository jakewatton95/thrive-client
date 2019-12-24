import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import {Form, Button} from 'react-bootstrap'
import StudentContainer from '../../containers/StudentContainer.js'
import AdminContainer from '../../containers/AdminContainer.js'
import TutorContainer from '../../containers/TutorContainer.js'
import ConfirmationForm from '../ConfirmationForm/ConfirmationForm'
import './SignInForm.css'

class SignInForm extends Component {
    constructor(props) {
        super(props)
  
        this.state = {
            email: '',
            password: '',
            userRole: '',
            signedIn: false,
            showConfirmation: false,
            showError: false,
            errorMessage: '',
            userInfo: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.signIn = this.signIn.bind(this)
        this.confirmSignIn = this.confirmSignIn.bind(this)
        this.handleNotSignedUp = this.handleNotSignedUp.bind(this)
        this.getUserRole = this.getUserRole.bind(this)
        this.signOut=this.signOut.bind(this)
        this.checkAlreadySignedIn = this.checkAlreadySignedIn.bind(this)
    }
    
    componentDidMount(){
        this.checkAlreadySignedIn();
    }
 
    signIn() {
        const { email, password } = this.state  
        Auth.signIn({
            username: email,
            password: password
        })
        .then(() => {
            this.setState({
                signedIn: true,
                showError: false,
                showConfirmation: false,
                password: ''
            })
            this.getUserRole()
        })
        .catch(err => {
            if (err.code == "UserNotConfirmedException"){
                this.setState({
                    showConfirmation: true
                })
            } else {
                console.log(err)
                this.setState({
                    showError: true,
                    errorMessage: err.message
                })
            }
        })
    }
  
    confirmSignIn() {
        const { email } = this.state
        Auth.confirmSignIn(email)
        .then(() => console.log('successfully confirmed signed in'))
        .catch((err) => console.log(`Error confirming sign up - ${ err }`))
    }
  
    handleSubmit(e) {
        e.preventDefault()
        this.signIn()
        //this.confirmSignIn() only needed for 2FA
    }
  
    handleChange(e) {
        if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          })
        } else if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          })
        }
    }
    
    handleNotSignedUp(e){
      e.preventDefault()
      this.props.handleSignup()
    }
    
    getUserRole(){
        let {email} = this.state
        const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/users?email="+email
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            this.setState({
                userRole: response.UserType,
                userInfo: response
            })
        })
        .catch(err => console.log("Error", err))
    }
    
    signOut(){
        Auth.signOut()
        .catch(err=>console.log(err))
        this.setState({
            signedIn: false,
            userRole: '',
            showError: false
        })
    }
    
    checkAlreadySignedIn(){
        Auth.currentAuthenticatedUser()
        .then(response=>{
            this.setState({
                signedIn: true,
                email: response.attributes.email
            })
            this.getUserRole()
        })
        .catch(err => {})
    }
    
    render() {
        const {signedIn, showConfirmation, email, password, errorMessage, userRole} = this.state
        if (signedIn) {
            if (this.state.userRole === "Tutor")
                return <TutorContainer signOut={this.signOut} userInfo={this.state.userInfo}/>
            else if (this.state.userRole === "Student")
                return <StudentContainer signOut={this.signOut} userInfo={this.state.userInfo}/>
            else if (this.state.userRole === "Admin")
                return <AdminContainer signOut={this.signOut} userInfo={this.state.userInfo}/>
            else 
                return <div> Loading... </div>
        } else if (showConfirmation){
            return (
                <ConfirmationForm email={email} handleSignup={this.signIn}/>
            )
        } else {
            return (
                <div className = "sign-in-wrapper">
                    <Form className="sign-in-form" onSubmit={this.handleSubmit}>
                        <div className="sign-in-title">Sign In</div>
                        {errorMessage != '' && <div className="error-message">Error: {errorMessage} Please make sure the information entered is correct.</div>}
                        <br/>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" value={email} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" value={password} onChange={this.handleChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                    <div> New User? <a href="/" onClick={this.handleNotSignedUp}>Click Here to sign up!</a></div>
                </div>
            )
        }
    }
}

export default SignInForm