import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import StudentContainer from '../../containers/StudentContainer.js'
import AdminContainer from '../../containers/AdminContainer.js'
import TutorContainer from '../../containers/TutorContainer.js'
import ConfirmationForm from '../ConfirmationForm/ConfirmationForm'
import {Redirect} from 'react-router-dom'
import './SignInForm.css'

class SignInForm extends Component {
    constructor(props) {
        super(props)
  
        this.state = {
            email: '',
            password: '',
            userRole: '',
            signedIn: false,
            showLoading: false,
            showConfirmation: false,
            showError: false,
            userInfo: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.signIn = this.signIn.bind(this)
        this.confirmSignIn = this.confirmSignIn.bind(this)
        this.handleNotSignedUp = this.handleNotSignedUp.bind(this)
        this.getUserRole = this.getUserRole.bind(this)
        this.signOut=this.signOut.bind(this)
        this.checkAlreadySignedIn = this.checkAlreadySignedIn.bind(this)
    }
    
    componentDidMount(){
        this.checkAlreadySignedIn();
    }
 
    signIn() {
        const { email, password } = this.state  
        console.log(email)
        Auth.signIn({
            username: email,
            password: password
        })
        .then(() => this.getUserRole())
        .catch(err => {
            if (err.code == "UserNotConfirmedException"){
                this.setState({
                    showConfirmation: true
                })
            }
            console.log(err)
            this.setState({
                showLoading: false,
                showError: true
            })
        })
    }
  
    confirmSignIn() {
        const { email } = this.state
        Auth.confirmSignIn(email)
        .then(() => console.log('successfully confirmed signed in'))
        .catch((err) => console.log(`Error confirming sign up - ${ err }`))
    }
  
    handleSubmit(e) {
        console.log("A")
        e.preventDefault()
        this.setState({
            showLoading: true
        })
        this.signIn()
        //this.getUserRole();
        //this.confirmSignIn() only needed for 2FA
    }
  
    handleChange(e) {
        if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          })
        } else if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          })
        }
    }
    
    handleNotSignedUp(e){
      e.preventDefault()
      this.props.handleSignup()
    }
    
    getUserRole(){
        Auth.currentUserInfo()
        .then(user => {
            this.setState({
                userRole: "Admin", //have to get user role here TODO
                signedIn: true,
                showError: false,
                userInfo: {}//user
            })
        })
        .catch(err => console.log(err))
    }
    
    signOut(){
        Auth.signOut()
        .catch(err=>console.log(err))
        this.setState({
            signedIn: false,
            showLoading: false,
            userRole: '',
            showError: false
        })
    }
    
    checkAlreadySignedIn(){
        Auth.currentAuthenticatedUser()
        .then(()=>{
            this.setState({
                signedIn: true
            })
            this.getUserRole()
        })
        .catch(err => console.log("err: " + err))
    }
    
    render() {
        const { signedIn, showConfirmation, email } = this.state
        console.log("Signed In", signedIn)
        if (signedIn) {
            if (this.state.userRole === "Tutor")
                return <TutorContainer signOut={this.signOut} userInfo={this.state.userInfo}/>
            else if (this.state.userRole === "Student")
                return <StudentContainer signOut={this.signOut} userInfo={this.state.userInfo}/>
            else if (this.state.userRole === "Admin")
                return <AdminContainer signOut={this.signOut} userInfo={this.state.userInfo}/>
            else 
                return <div> Loading... </div>
        } else if (showConfirmation){
            return (
                <ConfirmationForm email={email} />
            )
        } else {
            console.log(this.state.showLoading)
            return (
                <div>
                    <div className={this.state.showLoading ? 'showLoading' : 'hideLoading'}>Loading...</div>
                    <form className="signInForm" onSubmit={ this.handleSubmit }>
                        <label>Email</label>
                        <input id='email' type='text' onChange={ this.handleChange }/>
                        <br/>
                        <label>Password</label>
                        <input id='password' type='password' onChange={ this.handleChange }/>
                        <br/>
                        <div className={this.state.showError ? 'showError' : 'hideError'}>Error! The information you entered was incorrect</div>
                        <button>Sign In</button>
                        <div> New User? <a href="/" onClick={this.handleNotSignedUp}>Click Here to sign up!</a></div>
                    </form>
                </div>
        )
      }
    }
}

export default SignInForm