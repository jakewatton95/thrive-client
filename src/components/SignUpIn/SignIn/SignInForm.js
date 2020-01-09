import React, { useState, useEffect } from 'react'
import './SignInForm.css'
import {NavLink, useHistory} from 'react-router-dom'
import { Auth } from 'aws-amplify'


const SignInForm = (props) => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    let history = useHistory();
    
    useEffect(() => checkAlreadySignedIn(), [])

    const checkAlreadySignedIn = () => 
    {
        Auth.currentAuthenticatedUser()
        .then(response=> getUserRole(response.attributes.email))
        .then((ret) => history.push("/home", {source: "checkAlreadySignedIn", userInfo: ret}))
        .catch(err => {})
            //TODO Set User Info in Redux?
        //.catch(err => console.log("Error", err)) Usually just userNotAuthenticated so no need for this
    }

    const getUserRole = async (email) => 
    {
        let userInfo = {};
        const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/users?email="+email
        await fetch(endpoint)
        .then(response => userInfo = response.json())
        .catch(err => console.log("Error", err))
        return userInfo
    }

    const signIn = () =>
    {  
        Auth.signIn({
            username: email,
            password: password
        })
        .then(() => setErrorMessage(''))
        .then(() =>  getUserRole(email))
        .then((ret) => history.push("/home", {source: "normalSignIn", userInfo: ret}))
        .catch(err => {
            if (err.code == "UserNotConfirmedException"){
                history.push("/confirm")
            } else {
                console.log(err)
                setErrorMessage(err.message)
            }
        })
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        signIn()
    }

    return (
        <React.Fragment>
            <div className="log-in-title">
                Log in to <span className="big-thrive"> THRIVE </span>
            </div>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                {errorMessage != '' && <div className="error-message">Error: {errorMessage} Please make sure the information entered is correct.</div>}
                <br />
                <input required type="email" placeholder="EMAIL" id="email" value={email} className="sign-in-form-field" onChange={e => setEmail(e.target.value)} />
                <input required type="password" placeholder="PASSWORD" id="password" value={password} className="sign-in-form-field" onChange={e => setPassword(e.target.value)} />
                <NavLink to="/forgot_password" className="forgot-password">
                    Forgot your password?
                    </NavLink>
                <div className="sign-in-button-wrapper">
                    <button type="submit" className="sign-in-button" value="LOGIN">
                        LOGIN
                        </button>
                </div>
            </form>
        </React.Fragment>

    )
}

export default SignInForm