import React, { Component } from 'react'
import SignInUpNav from '../Nav/SignInUpNav'
import SignInForm2 from './SignInForm2'

class SignIn2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                <SignInUpNav signIn = {true}/>
                <SignInForm2/>
            </React.Fragment>

        )
    }
}

export default SignIn2