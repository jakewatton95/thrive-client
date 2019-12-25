import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import {Form, Button, InputGroup} from 'react-bootstrap'
import './SignUpForm.css'
import ConfirmationForm from '../ConfirmationForm/ConfirmationForm'


class SignUpForm extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            name: '',
            password: '',
            phone_number: '',
            email: '',
            parentEmail: '',
            parentPhone: '',
            userRole: '',
            verified: false,
            signUpError: false,
            phoneError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        this.handleAlreadySignedUp=this.handleAlreadySignedUp.bind(this)
        this.addUser = this.addUser.bind(this)
        this.leaveConfirmation=this.leaveConfirmation.bind(this)
    }
  
    signUp() {
        const { password, email, phone_number, name} = this.state;  
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                phone_number: "+1" + phone_number,
                name: name
            }
        }).then(data => {
            this.addUser()
            this.setState({
                verified: true,
                signUpError: false
            })
        }).catch(err => {
        	console.log(err)
          	if (err.code == "InvalidParameterException" || err.code == "InvalidPasswordException") {
            	alert("Please make sure your password follows the guidelines")
            	this.setState({
              		signUpError: true,
              		password: ''
            	})
          	} else {
            	alert(err.message)
          	}
        }) 
    }
    
    addUser() {
      let {userRole, name, email, phone_number} = this.state
      const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/users"
      fetch(endpoint, {method: "POST", body:JSON.stringify({userRole: userRole, name: name, email: email, phone_number: phone_number})}) //TODO body userRole name email phone number
      .then(response => console.log(response.json()))
      .catch(err => console.log("ERR: " + err))
    }

    handleSubmit(e) {
        let {userRole, phone_number} = this.state
        e.preventDefault();
        if (userRole == ''){
          alert("Please choose Student or Tutor")
        } else if (phone_number.length != 10){
          this.setState({phoneError:true})
        } else {
          this.setState({phoneError:false})
          this.signUp();
        }
    }
    
    handleAlreadySignedUp(e){
      e.preventDefault();
      this.props.handleSignup();
    }

    leaveConfirmation(e){
      e.preventDefault()
      this.setState({
        verified: false,
        password: ''
      })
    }
  
    handleChange(e) {
        if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          });
        } else if (e.target.id === 'phone_number') {
          this.setState({
              phone_number: e.target.value
          });
        } else if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          });
        } else if (e.target.name === 'userRole') {
          this.setState({
              userRole: e.target.id
          });
        } else if (e.target.id === 'name') {
          this.setState({
            name: e.target.value
          });
        } else if (e.target.id === 'parentEmail') {
          this.setState({
            parentEmail: e.target.value
          });
        } else if (e.target.id === 'parentPhone') {
          this.setState({
            parentPhone: e.target.value
          });
        }
    }
  
    render() {
      const { verified, email, signUpError, phoneError, name, phone_number, password} = this.state;
      if (verified) {
          return (
            <ConfirmationForm email = {email} handleSignup={this.props.handleSignup} exit={this.leaveConfirmation}/>
          );
      } else {
        return (
          <div className="signUpWrapper">     
              <Form className="signUpForm" onSubmit={this.handleSubmit}>
                <div className="signUpTitle">Sign Up Form</div>
                <br/>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control required type="text" value={name} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control required type="email" value={email} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="phone_number">
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">+1</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control required type="number" value={phone_number} onChange={this.handleChange}/>
                  </InputGroup>
                  <Form.Text className={"text-muted phone-info " + (phoneError ? "sign-up-error" : '')}>
                    Please make sure your phone number is 10 digits and includes the area code.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" value={password} onChange={this.handleChange}/>
                  <Form.Text className={"text-muted password-info " + (signUpError ? "sign-up-error" : '')}>
                    Your password must be 8 characters long and include an upercase letter, lowercase letter, and number.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="userRole">
                <Form.Label>Are you a student or tutor?</Form.Label><br/>
                  <Form.Check inline name='userRole' label="Student" type='radio' id="Student" onChange={this.handleChange} checked={this.state.userRole==="Student"}/>
                  <Form.Check inline name='userRole' label="Tutor" type='radio' id="Tutor" onChange={this.handleChange} checked={this.state.userRole==="Tutor"}/>              
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
              </Form>
            <div> Already signed up? <a href="/" onClick={this.handleAlreadySignedUp}>Click Here to sign in</a></div>
          </div>
        );
      }
    }
}

export default SignUpForm;