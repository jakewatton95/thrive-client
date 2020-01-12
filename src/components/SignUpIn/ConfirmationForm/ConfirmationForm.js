import React, {useState} from 'react'
import '../SignInUp.css'
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

    const cantFindCode = e =>
    {
        e.preventDefault()
        if (email === '') {
            setErrorMessage("Please enter your email and then press the link again")
        } else {
            Auth.resendSignUp(email)
            .then(() => alert("Your code has been resent. Please make sure you check your spam folder. If you still cannot find the code, please contact an administrator."))
            .catch(err => setErrorMessage(err.message))
        }
        Auth.resendSignUp(email)
    }

    return (
        <React.Fragment>
            <div className="confirmation-title">
                Confirm Your Email
            </div>
            <div className="confirmation-sub-title">
                Please check your email for a confirmation code
            </div>
            <form className="confirmation-form" onSubmit={handleSubmit}>
                {errorMessage != '' && <div className="error-message">Error: {errorMessage}</div>}
                <br />
                <input required type="email" placeholder="EMAIL" id="email" value={email} className="sign-in-form-field" onChange={e => setEmail(e.target.value)} />
                <input required type="number" placeholder="CONFIRMATION CODE" id="confirmationCode" value={confirmationCode} className="sign-in-form-field" onChange={e => setConfirmationCode(e.target.value)} />
                <NavLink to="/confirmation" className="forgot-password" onClick = {cantFindCode}>
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