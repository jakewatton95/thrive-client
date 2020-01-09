import React, { Component } from 'react'
import '../SignIn/SignInForm2.css'
import './ConfirmationForm2.css'
import {NavLink} from 'react-router-dom'
import { Auth } from 'aws-amplify'


class ConfirmationForm2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            confirmationCode: '',
            errorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        let {id, value} = e.target
        this.setState({
            [id]: value
        })
    }

    handleSubmit(e){
        let {email, confirmationCode} = this.state
        console.log(email)
        e.preventDefault()
        Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            window.location.href = "/sign_in"
        })
        .catch(err => {
            this.setState({
                errorMessage: err.message
            })
        })
    }

    render() {
        let {email, confirmationCode, errorMessage} = this.state 
        return (
            <React.Fragment>
                <div className="confirmation-title">
                    Confirm Your Email
                </div>
                <div className="confirmation-sub-title">
                    Please check your email for a confirmation code
                </div>
                <form className="sign-in-form-2" onSubmit={this.handleSubmit}>
                    {errorMessage != '' && <div className="error-message">Error: {errorMessage}</div>}
                    <br/>
                    <input required type="email" placeholder="EMAIL" id="email" value = {email} className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="number" placeholder="CONFIRMATION CODE" id = "confirmationCode" value = {confirmationCode} className = "sign-in-form-field" onChange={this.handleChange} />
                    <NavLink to="/forgot_password" className = "forgot-password">
                        Can't find your confirmation code?
                    </NavLink>
                    <div className = "sign-in-button-wrapper">
                        <button type="submit" className = "sign-in-button" value="CONFIRM">
                            CONFIRM
                        </button>
                    </div>
                </form>
            </React.Fragment>

        )
    }
}

export default ConfirmationForm2