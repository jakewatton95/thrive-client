import React, {Component} from 'react'
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import SignInForm from './SignIn/SignInForm';
import SignUpForm from './SignUp/SignUpForm';
import SiteHeader from './SiteHeader'
import {withAuthenticator} from 'aws-amplify-react'

Amplify.configure(awsconfig);

class App extends Component{
    constructor(){
        super()
        this.state={
            signedUp : false
        }
        this.handleSignup = this.handleSignup.bind(this)
    }
    
    handleSignup(e) {
        let {signedUp} = this.state
        this.setState({
            signedUp: !signedUp
        })
    }

    render(){
        const {signedUp} = this.state
        return (
            <React.Fragment>
                <SiteHeader/>
                { !signedUp ? <SignInForm handleSignup = {this.handleSignup}/> : <SignUpForm handleSignup={ this.handleSignup }/>}
            </React.Fragment>
        )
    }
}
export default App
//export default withAuthenticator(App); 