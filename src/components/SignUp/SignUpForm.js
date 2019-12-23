import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './SignUpForm.css'


class SignUpForm extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            phone_number: '',
            email: '',
            parentEmail: '',
            parentPhone: '',
            confirmationCode: '',
            userRole: '',
            verified: false,
            signUpError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.handleAlreadySignedUp=this.handleAlreadySignedUp.bind(this)
        this.addUser = this.addUser.bind(this)
    }
  
    signUp() {
        const { password, email, phone_number, firstName, lastName} = this.state;  
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                phone_number: phone_number,
                name: firstName + ' ' + lastName
            }
        }).then(data => {
          this.setState({
            verified: true,
            signUpError: false
          })
        }).catch(err => {
          console.log(`Error signing up: ${ err }`)
          this.setState({
            signUpError: true
          })
        }) 
    }
    
    addUser(){
      let {userRole} = this.state
      if (userRole && userRole !== '' && userRole !== 'Admin') {
          const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/"
          const fullURL = endpoint + this.state.userRole.toLowerCase() + "s?name=" + this.state.firstName + " " + this.state.lastName + "&email=" + this.state.email
          fetch(fullURL, {method: "POST"})
          .then(response => console.log(response.json()))
          .catch(err => console.log("ERR: " + err))
      }
    }
  
    confirmSignUp() {
        const { email, confirmationCode } = this.state;
        Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            console.log('Successfully confirmed signed up')
            this.addUser();
            this.props.handleSignup();
        })
        .catch((err) => console.log(`Error confirming sign up - ${ err }`))
    }
  
    handleSubmit(e) {
      const { verified } = this.state;
  
        e.preventDefault();
  
        if (verified) {
          this.confirmSignUp();
          this.setState({
             confirmationCode: '',
          });
        } else {
          this.signUp();
          this.setState({
            password: '',
          });
        }
        e.target.reset();
    }
    
    handleAlreadySignedUp(e){
      e.preventDefault();
      this.props.handleSignup();
    }
  
    handleChange(e) {
        if (e.target.id === 'password') {
          this.setState({
              password: e.target.value
          });
        } else if (e.target.id === 'phone_number') {
          this.setState({
              phone_number: e.target.value
          });
        } else if (e.target.id === 'email') {
          this.setState({
              email: e.target.value
          });
        } else if (e.target.id === 'confirmationCode') {
          this.setState({
              confirmationCode: e.target.value
          });
        } else if (e.target.name === 'userRole') {
          this.setState({
              userRole: e.target.value
          });
        } else if (e.target.id === 'firstName') {
          this.setState({
            firstName: e.target.value
          });
        } else if (e.target.id === 'lastName') {
          this.setState({
            lastName: e.target.value
          });
        } else if (e.target.id === 'parentEmail') {
          this.setState({
            parentEmail: e.target.value
          });
        } else if (e.target.id === 'parentPhone') {
          this.setState({
            parentPhone: e.target.value
          });
        }
    }
  
    render() {
      const { verified } = this.state;
      if (verified) {
          return (
              <div>
                <div> Please check your email ({this.state.email}) for your confirmation code!</div>
                <div> It may take up to 5 minutes to appear. </div>
                <form onSubmit={ this.handleSubmit }>
                    <label>Confirmation Code</label>
                    <input id='confirmationCode' type='text' onChange={ this.handleChange }/>
                    <button>Confirm Sign up</button>
                </form>
              </div>
          );
      } else {
        return (
          <React.Fragment>
            <div className={this.state.signUpError ? 'signUpError' : 'noError'}>
                There was an Error with one or more of your fields... please make sure of the following: 
                <ul>
                  <li> Username has no spaces </li>
                  <li> Password is at least 8 characters </li>
                  <li> Phone number is of the format +12223334444 </li>
                  <li> email is of the format: email@website.com </li>
                  <li> You have selected 'Student', 'Tutor', or 'Admin' </li>
                </ul>
            </div>            
            <div className="signUpForm">
              <form onSubmit={ this.handleSubmit }>
                  <div> 
                    <label>Student First Name</label>
                    <input id='firstName' type='text' onChange={ this.handleChange } value={this.state.firstName}/>
                  </div>
                  <div> 
                    <label>Student Last Name</label>
                    <input id='lastName' type='text' onChange={ this.handleChange } value={this.state.lastName}/>
                  </div>
                  <div>
                    <label>Password</label>
                    <input id='password' type='password' onChange={ this.handleChange }/>
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <input id='phone_number' type='text' onChange={ this.handleChange } value={this.state.phone_number} placeholder="+14445556666"/>
                  </div>
                  <div>
                    <label>Email</label>
                    <input id='email' type='text' onChange={ this.handleChange } value={this.state.email}/>
                  </div>
                  <div>
                    <label>Parent Phone Number</label>
                    <input id='parentPhone' type='text' onChange={ this.handleChange } value={this.state.parentPhone} placeholder="+19102223333"/>
                  </div>
                  <div>
                    <label>Parent Email</label>
                    <input id='parentEmail' type='text' onChange={ this.handleChange } value={this.state.parentEmail}/>
                  </div>
                  <div>
                    <label>Student</label>
                    <input name = "userRole" id = "ur1" type='radio' value="Student" onChange={this.handleChange} checked={this.state.userRole==="Student"}/>
                    <label>Tutor</label>
                    <input name = "userRole" id = "ur2" type='radio' value="Tutor" onChange={this.handleChange} checked={this.state.userRole==="Tutor"}/>
                    <label>Admin</label>
                    <input name= "userRole" id = "ur3" type='radio' value="Admin" onChange={this.handleChange} checked={this.state.userRole==="Admin"}/>
                  </div>
                  <div>
                    <button>Sign up</button>
                  </div>
              </form>
              <div> Already signed up? <a href="/" onClick={this.handleAlreadySignedUp}>Click Here to sign in</a></div>
            </div>
          </React.Fragment>
        );
      }
    }
}

export default SignUpForm;