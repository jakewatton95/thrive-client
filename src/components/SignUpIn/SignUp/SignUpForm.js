import React, { useState } from 'react'
import './SignUpForm.css'
import { Auth } from 'aws-amplify';
import {useHistory} from 'react-router-dom'


const SignUpForm = props =>
{
    let history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [userRole, setUserRole] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = e => 
    {
        e.preventDefault();
        if (password !== confirmPassword) 
            setErrorMessage("Passwords do not match")
        else 
            signUp()
    }

    const signUp = () =>
    {
        let name = firstName + ' ' + lastName
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                phone_number: "+1" + phoneNumber,
                name: name
            }
        }).then(() => {
            addUser()
        }).then(()=>{
            history.push("/confirm")
        }).catch(err => {
            setPassword('')
            setConfirmPassword('')
            setErrorMessage(err.message)
        }) 
    } 

    const addUser = async () => 
    {
        let name = firstName + ' ' + lastName
        const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/users"
        await fetch(endpoint, {method: "POST", body:JSON.stringify({userRole: userRole, name: name, email: email, phone_number: phoneNumber})}) 
        .then(() => console.log("User Signed Up"))
        .catch(err => console.log("Error", err))
    }

    return (
        <React.Fragment>
            <div className="sign-up-title">
                Get Started
            </div>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                {errorMessage != '' && <div className="error-message">Error: {errorMessage} </div>}
                <input required type="text" id="firstName" value = {firstName} placeholder="FIRST NAME" className = "sign-in-form-field" onChange={e => setFirstName(e.target.value)} />
                <input required type="text" id="lastName" value = {lastName} placeholder="LAST NAME" className = "sign-in-form-field" onChange={e => setLastName(e.target.value)} />
                <input required type="email" id="email" value={email} placeholder="EMAIL" className = "sign-in-form-field" onChange={e => setEmail(e.target.value)} />
                <input required type="tel" id="phoneNumber" value={phoneNumber} placeholder="PHONE NUMBER" className = "sign-in-form-field has-tip" pattern="[0-9]{10}" onChange={e => setPhoneNumber(e.target.value)} />
                <div className="tip phone-number-tip">Format: 1234567890</div>
                <input required type="password" id="password" value={password} placeholder="PASSWORD" className = "sign-in-form-field has-tip" onChange={e => setPassword(e.target.value)} />
                <div className="tip password-tip">At least 8 characters long, one uppercase letter, one lowercase letter, and one number </div>
                <input required type="password" id="confirmPassword" value={confirmPassword} placeholder="CONFIRM PASSWORD" className = "sign-in-form-field" onChange={e => setConfirmPassword(e.target.value)} />
                <div className="user-type-wrapper">
                    <label className="field-label">STUDENT</label><input required type="radio" name="user-type" id="userRole-a" value="Student" onChange={e => setUserRole(e.target.value)}/>
                    <label className="field-label">TUTOR</label><input required type="radio" name="user-type" id="userRole-b" value="Tutor" onChange={e => setUserRole(e.target.value)}/>
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

export default SignUpForm