import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import SignInForm from './SignIn/SignInForm';
import SignUpForm from './SignUp/SignUpForm';
import HomePage from './InfoPage'
import ErrorPage from './ErrorPage'
import './App.css'
Amplify.configure(awsconfig);

class App extends Component{
    constructor(){
        super()
        this.state={
        }
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
            <Switch>
                <Route exact path="/" render={() => <HomePage/>}>
                </Route>
                <Route exact path="/sign_in" render={() => <SignInForm/>}>
                </Route>
                <Route exact path="/sign_up" render={() => <SignUpForm/>}>
                </Route>
                <Route component={ErrorPage}>
                </Route>
            </Switch>
        )
    }
}
export default App