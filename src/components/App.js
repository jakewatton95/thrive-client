import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import SignIn from './SignUpIn/SignIn/SignIn'
import SignUp from './SignUpIn/SignUp/SignUp'
import InfoPage from './InfoPage/InfoPage'
import ErrorPage from './ErrorPage/ErrorPage'
import PortalContainer from '../containers/UserPortalContainer'
import ForgotPassword from './SignUpIn/ForgotPassword/ForgotPassword'
import './App.css'
import Confirmation from './SignUpIn/ConfirmationForm/Confirmation';

Amplify.configure(awsconfig);

const App = () => (
    <Switch>
        <Route exact path="/" component={InfoPage}/>
        <Route exact path="/sign_in" component={SignIn}/>
        <Route exact path="/sign_up" component={SignUp}/>
        <Route exact path="/forgot_password" component={ForgotPassword}/>
        <Route exact path="/confirm" component={Confirmation}/>
        <Route path="/dashboard" component={PortalContainer}/>
        <Route component={ErrorPage}/>
    </Switch>
)
export default App