import React, { Component } from 'react'
import './SignInForm2.css'
import {NavLink} from 'react-router-dom'


class SignInForm2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        let errorMessage = false;
        let email = "";
        let password = ""
        return (
            <React.Fragment>
                <div className="log-in-title">
                    Log in to <span className = "big-thrive"> THRIVE </span>
                </div>
                <form className="sign-in-form-2">
                    {errorMessage != '' && <div className="error-message">Error: {errorMessage} Please make sure the information entered is correct.</div>}
                    <br/>
                    <input required type="text" placeholder="EMAIL" className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="password" placeholder="PASSWORD" className = "sign-in-form-field" onChange={this.handleChange} />
                    <NavLink to="/forgot_password" className = "forgot-password">
                        Forgot your password?
                    </NavLink>
                    <div className = "sign-in-button-wrapper">
                        <button type="submit" className = "sign-in-button" value="LOGIN">
                            LOGIN
                        </button>
                    </div>
                </form>
            </React.Fragment>

        )
    }
}

export default SignInForm2