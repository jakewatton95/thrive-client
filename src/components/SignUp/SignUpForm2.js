import React, { Component } from 'react'
import './SignUpForm2.css'
import { Auth } from 'aws-amplify';


class SignUpForm2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            email: '',
            userRole: '',
            verified: false,
            errorMessage: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        this.addUser = this.addUser.bind(this)
    }

    signUp() {
        const { password, email, phoneNumber, firstName, lastName} = this.state;  
        let name = firstName + ' ' + lastName
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                phone_number: "+1" + phoneNumber,
                name: name
            }
        }).then(data => {
            this.addUser()
        }).then(()=>{
            window.location.href ="/confirm"
        }).catch(err => {
        	console.log(err)
            this.setState({
                  password: '',
                  confirmPassword: '',
                  errorMessage: err.message
        	})
        }) 
    }    

    addUser() {
        let {userRole, name, email, phone_number} = this.state
        const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/users"
        fetch(endpoint, {method: "POST", body:JSON.stringify({userRole: userRole, name: name, email: email, phone_number: phone_number})}) 
        .then(response => console.log("User Signed Up"))
        .catch(err => console.log("Error", err))
    }

    handleSubmit(e) {
        let {password, confirmPassword} = this.state
        e.preventDefault();
        if (password !== confirmPassword) {
            this.setState({
                errorMessage: "Passwords do not match"
            })
        } else {
            this.signUp();
        }
    }

    handleChange(e) {
        let {id, value} = e.target
        if (id.includes('userRole')){
            this.setState({
                userRole: value
            })
        } else {
            this.setState({
                [id] : value
            })
        }
    }

    render() {
        let {firstName, lastName, email, phoneNumber, password, confirmPassword, userRole, errorMessage} = this.state;
        return (
            <React.Fragment>
                <div className="sign-up-title">
                    Get Started
                </div>
                <form className="sign-up-form-2" onSubmit={this.handleSubmit}>
                    {errorMessage != '' && <div className="error-message">Error: {errorMessage} </div>}
                    <input required type="text" id="firstName" value = {firstName} placeholder="FIRST NAME" className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="text" id="lastName" value = {lastName} placeholder="LAST NAME" className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="email" id="email" value={email} placeholder="EMAIL" className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="tel" id="phoneNumber" value={phoneNumber} placeholder="PHONE NUMBER" className = "sign-in-form-field has-tip" pattern="[0-9]{10}" onChange={this.handleChange} />
                    <div className="tip phone-number-tip">Format: 1234567890</div>
                    <input required type="password" id="password" value={password} placeholder="PASSWORD" className = "sign-in-form-field has-tip" onChange={this.handleChange} />
                    <div className="tip password-tip">At least 8 characters long, one uppercase letter, one lowercase letter, and one number </div>
                    <input required type="password" id="confirmPassword" value={confirmPassword} placeholder="CONFIRM PASSWORD" className = "sign-in-form-field" onChange={this.handleChange} />
                    <div className="user-type-wrapper">
                        <label className="field-label">STUDENT</label><input required type="radio" name="user-type" id="userRole-a" value="student" onChange={this.handleChange}/>
                        <label className="field-label">TUTOR</label><input required type="radio" name="user-type" id="userRole-b" value="tutor" onChange={this.handleChange}/>
                    </div>
                    <div className="tip user-tip"> Select one </div>
                     <div className = "sign-in-button-wrapper">
                        <button type="submit" className = "sign-in-button" value="LOGIN">
                            LET'S GO
                        </button>
                    </div>
                </form>
            </React.Fragment>

        )
    }
}

export default SignUpForm2