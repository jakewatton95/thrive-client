import React, { Component } from 'react'
import './SignInForm2.css'
import {NavLink} from 'react-router-dom'
import { Auth } from 'aws-amplify'


class SignInForm2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            showError: false,
            errorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.signIn = this.signIn.bind(this)
        //this.confirmSignIn = this.confirmSignIn.bind(this)
        //this.handleNotSignedUp = this.handleNotSignedUp.bind(this)
        //this.signOut=this.signOut.bind(this)
        this.checkAlreadySignedIn = this.checkAlreadySignedIn.bind(this)
        //this.leaveConfirmation = this.leaveConfirmation.bind(this)
    }
        //setTimeout(() => window.location.href = "/sign_up", 3000)

    componentDidMount(){
        this.checkAlreadySignedIn();
    }

    checkAlreadySignedIn(){
        Auth.currentAuthenticatedUser()
        .then(response=>{
            this.setState({
                signedIn: true,
                email: response.attributes.email
            })
            //TODO Set User Info in Redux?
            //TODO what happens if already signed in but not authenticated?
            window.location.href = "/home"
        })
        .catch(err => console.log("Error", err))
    }

    signIn() {
        const { email, password } = this.state  
        Auth.signIn({
            username: email,
            password: password
        })
        .then(() => {
            this.setState({
                showError: false,
                showConfirmation: false,
            })
        })
        .then(() => window.location.href = "/home")
        .catch(err => {
            if (err.code == "UserNotConfirmedException"){
                window.location.href="/confirm"
            } else {
                console.log(err)
                this.setState({
                    showError: true,
                    errorMessage: err.message
                })
            }
        })
    }

    handleChange(e) {
        let {id, value} = e.target
        this.setState({
            [id] : value
        })
    }

    handleSubmit(e) {
        console.log("Submit")
        e.preventDefault()
        this.signIn()
    }

    render() {
        let {email, password, errorMessage} = this.state 
        return (
            <React.Fragment>
                <div className="log-in-title">
                    Log in to <span className = "big-thrive"> THRIVE </span>
                </div>
                <form className="sign-in-form-2" onSubmit={this.handleSubmit}>
                    {errorMessage != '' && <div className="error-message">Error: {errorMessage} Please make sure the information entered is correct.</div>}
                    <br/>
                    <input required type="email" placeholder="EMAIL" id="email" value = {email} className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="password" placeholder="PASSWORD" id = "password" value = {password} className = "sign-in-form-field" onChange={this.handleChange} />
                    <NavLink to="/forgot_password" className = "forgot-password">
                        Forgot your password?
                    </NavLink>
                    <div className = "sign-in-button-wrapper">
                        <button type="submit" className = "sign-in-button" value="LOGIN">
                            LOGIN
                        </button>
                    </div>
                </form>
            </React.Fragment>

        )
    }
}

export default SignInForm2