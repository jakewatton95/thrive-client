import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import SignIn from './SignUpIn/SignIn/SignIn'
import SignUp from './SignUpIn/SignUp/SignUp'
import HomePage from './InfoPage/InfoPage'
import ErrorPage from './ErrorPage'
import PortalContainer from '../containers/UserPortalContainer'
import ForgotPassword from './SignUpIn/ForgotPassword/ForgotPassword'
import './App.css'
import Confirmation from './SignUpIn/ConfirmationForm/Confirmation';

Amplify.configure(awsconfig);

const App = () => (
    <Switch>
        <Route exact path="/" render={() => <HomePage />}>
        </Route>
        <Route exact path="/sign_in" render={() => <SignIn />}>
        </Route>
        <Route exact path="/sign_up" render={() => <SignUp />}>
        </Route>
        <Route exact path="/forgot_password" render={() => <ForgotPassword />}>
        </Route>
        <Route exact path="/confirm" render={() => <Confirmation />}>
        </Route>
        <Route path="/dashboard" render={() => <PortalContainer />}>
        </Route>
        <Route component={ErrorPage}>
        </Route>
    </Switch>
)
export default App