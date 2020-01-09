import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import SignIn from './SignUpIn/SignIn/SignIn'
import SignUp from './SignUpIn/SignUp/SignUp'
import HomePage from './InfoPage/InfoPage'
import ErrorPage from './ErrorPage'
import Home from './Home'
import './App.css'
import Confirmation from './SignUpIn/ConfirmationForm/Confirmation';
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
                <Route exact path="/sign_in" render={() => <SignIn/>}>
                </Route>
                <Route exact path="/sign_up" render={() => <SignUp/>}>
                </Route>
                <Route exact path="/confirm" render = {() => <Confirmation/>}>
                </Route>
                <Route exact path ="/home" render = {(props) => <Home {...props}/>}>
                </Route>
                <Route component={ErrorPage}>
                </Route>
            </Switch>
        )
    }
}
export default App