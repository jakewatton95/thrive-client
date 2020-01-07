import React, { Component } from 'react'
import SignInUpNav from '../Nav/SignInUpNav'
import SignUpForm2 from './SignUpForm2'

class SignUp2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                <SignInUpNav signIn={false}/>
                <SignUpForm2/>
            </React.Fragment>

        )
    }
}

export default SignUp2