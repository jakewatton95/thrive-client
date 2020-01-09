import React, { Component } from 'react'
import SignInUpNav from '../Nav/SignInUpNav'
import ConfirmationForm2 from './ConfirmationForm2'

class Confirmation2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <React.Fragment>
                <SignInUpNav signIn = {true}/>
                <ConfirmationForm2/>
            </React.Fragment>

        )
    }
}

export default Confirmation2