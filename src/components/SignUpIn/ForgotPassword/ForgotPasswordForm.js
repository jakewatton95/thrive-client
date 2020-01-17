import React, { useState } from 'react'
import './ForgotPasswordForm.css'
import '../SignInUp.css'
import {NavLink, useHistory} from 'react-router-dom'
import { Auth } from 'aws-amplify'


const ForgotPassword = (props) => {
   
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [hasCode, setHasCode] = useState(false)
    
    let history = useHistory();

    const getCode = () =>
    {  
        Auth.forgotPassword(email.toLowerCase())
        .then(() => {
            setHasCode(true)
            setErrorMessage('')
        })
        .catch(err => setErrorMessage(err.message))
    }

    const resetPassword = () => 
    {
        Auth.forgotPasswordSubmit(email.toLowerCase(), code, newPassword)
        .then(() => {
            alert("You have successfully reset your password. Please login again.")
            history.push("/sign_in")
        })
        .catch(err => {
            if (err.code === "InvalidParameterException")
                setErrorMessage("Please make sure your password fits the requirements")
            else 
                setErrorMessage(err.message)
        })
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        hasCode ? resetPassword() : getCode()
    }

    const toggleResetView = bool => {
        setHasCode(bool)
        setErrorMessage('')
    }

    return (
        <React.Fragment>
            <div className="forgot-password-title">
                Reset Your Password
            </div>
            {hasCode && 
            <div className="forgot-password-sub-title">
                Check your email for a code to reset your password
            </div>
            }
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                {errorMessage != '' && <div className="error-message">Error: {errorMessage}</div>}
                <br />
                <input required type="email" placeholder="EMAIL" id="email" value={email} className="forgot-password-form-field" onChange={e => setEmail(e.target.value)} />
                {hasCode ? 
                    <React.Fragment>
                        <input required type="number" placeholder="CODE" id="code" value={code} className="forgot-password-form-field" onChange={e => setCode(e.target.value)} />
                        <input required type="password" placeholder="NEW PASSWORD" id="newPasswor" value={newPassword} className="forgot-password-form-field" onChange={e => setNewPassword(e.target.value)} />
                        <NavLink to = "/forgot_password" className="forgot-password" onClick = {() => toggleResetView(false)}>
                            I don't have a code
                        </NavLink> 
                        <div className="forgot-password-button-wrapper">
                            <button type="submit" className="forgot-password-button" value="reset">
                                RESET PASSWORD
                            </button>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <NavLink to = "/forgot_password" className="forgot-password" onClick = {() => toggleResetView(true)}>
                            I already have a code
                        </NavLink> 
                        <div className="forgot-password-button-wrapper">
                            <button type="submit" className="forgot-password-button" value="getCode">
                                GET CODE
                            </button>
                        </div>
                    </React.Fragment>
                }
            </form>
        </React.Fragment>

    )
}

export default ForgotPassword