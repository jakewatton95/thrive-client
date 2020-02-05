import React, { useState } from 'react'
import './SignUpForm.css'
import '../SignInUp.css'
import { Auth } from 'aws-amplify';
import {useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag';
import {createUser, createStudent, createTutor} from '../../../graphql/mutations'

const SignUpForm = props =>
{
    let history = useHistory()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [companyid, setCompanyid]  = useState(1)

    const [addTutorToDB] = useMutation(gql(createTutor), {
        onCompleted: data => {
            console.log("Tutor Data", data)
            history.push("/confirm")
        },
        onError: err => console.log("Error adding Tutor", err)
    })
    const [addStudentToDB] = useMutation(gql(createStudent), {
        onCompleted: data => {
            console.log("Student Data", data)
            history.push("/confirm")
        },
        onError: err => console.log("Error adding Student", err)
    })
    const [addUserToDB] = useMutation(gql(createUser), {
        onCompleted: (data) => {
            console.log("data", data)
            if (data.createUser.role == 'Student')
                addStudentToDB({variables: {email: data.createUser.email, phone: phoneNumber, name: firstName + ' ' + lastName, companyid, userid: parseInt(data.createUser.id)}})
            else if (data.createUser.role == 'Tutor')
                addTutorToDB({variables: {email: data.createUser.email, phone: phoneNumber, name: firstName + ' ' + lastName, companyid, userid: parseInt(data.createUser.id)}})    
        },
        onError: (err) => console.log("There was an error signing up", err)
    })

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
            username: email.toLowerCase(),
            password: password,
            attributes: {
                email: email.toLowerCase(),
                phone_number: "+1" + phoneNumber,
                name: name
            }
        }).then(() => {
            addUserToDB({variables:{email, role, companyid}})
        }).catch(err => {
            setPassword('')
            setConfirmPassword('')
            if (err.code === "InvalidParameterException")
                setErrorMessage("Please make sure your password fits the requirements")
            else 
                setErrorMessage(err.message)
        }) 
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
                <div className="tip phone-number-tip">Format: 1234567890 (your 10 digit phone number)</div>
                <input required type="password" id="password" value={password} placeholder="PASSWORD" className = "sign-in-form-field has-tip" onChange={e => setPassword(e.target.value)} />
                <div className="tip password-tip">At least 8 characters long, one uppercase letter, one lowercase letter, and one number </div>
                <input required type="password" id="confirmPassword" value={confirmPassword} placeholder="CONFIRM PASSWORD" className = "sign-in-form-field" onChange={e => setConfirmPassword(e.target.value)} />
                <div className="user-type-wrapper">
                    <label className="field-label">STUDENT</label><input required type="radio" name="user-type" id="role-a" value="Student" onChange={e => setRole(e.target.value)}/>
                    <label className="field-label">TUTOR</label><input required type="radio" name="user-type" id="role-b" value="Tutor" onChange={e => setRole(e.target.value)}/>
                </div>
                <div className="tip user-tip"> Select one </div>
                 <div className = "sign-up-button-wrapper">
                    <button type="submit" className = "sign-in-button" value="LOGIN">
                        LET'S GO
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default SignUpForm