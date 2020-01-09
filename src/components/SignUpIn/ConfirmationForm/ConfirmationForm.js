import React, {useState} from 'react'
import '../SignIn/SignInForm.css'
import './ConfirmationForm.css'
import {NavLink, useHistory} from 'react-router-dom'
import { Auth } from 'aws-amplify'

const ConfirmationForm = props => 
{
    let history = useHistory()

    const [email, setEmail] = useState('')
    const [confirmationCode, setConfirmationCode] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = e =>
    {
        e.preventDefault()
        Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            alert("Your account has been confirmed! Please sign in again.")
            history.push("/sign_in")
        })
        .catch(err => setErrorMessage(err.message))
    }

    return (
        <React.Fragment>
            <div className="confirmation-title">
                Confirm Your Email
            </div>
            <div className="confirmation-sub-title">
                Please check your email for a confirmation code
            </div>
            <form className="sign-in-form-2" onSubmit={handleSubmit}>
                {errorMessage != '' && <div className="error-message">Error: {errorMessage}</div>}
                <br />
                <input required type="email" placeholder="EMAIL" id="email" value={email} className="sign-in-form-field" onChange={e => setEmail(e.target.value)} />
                <input required type="number" placeholder="CONFIRMATION CODE" id="confirmationCode" value={confirmationCode} className="sign-in-form-field" onChange={e => setConfirmationCode(e.target.value)} />
                <NavLink to="/forgot_password" className="forgot-password">
                    Can't find your confirmation code?
                </NavLink>
                <div className="sign-in-button-wrapper">
                    <button type="submit" className="sign-in-button" value="CONFIRM">
                        CONFIRM
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ConfirmationForm