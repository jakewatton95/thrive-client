import React, { Component } from 'react'
import './SignUpForm2.css'

class SignUpForm2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        let errorMessage = false;

        return (
            <React.Fragment>
                <div className="sign-up-title">
                    Get Started
                </div>
                <form className="sign-up-form-2">
                    {errorMessage != '' && <div className="error-message">Error: {errorMessage} Please make sure the information entered is correct.</div>}
                    <input required type="text" placeholder="FIRST NAME" className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="text" placeholder="LAST NAME" className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="email" placeholder="EMAIL" className = "sign-in-form-field" onChange={this.handleChange} />
                    <input required type="tel" placeholder="PHONE NUMBER" className = "sign-in-form-field has-tip" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={this.handleChange} />
                    <div className="tip phone-number-tip">Format: 123-456-7890</div>
                    <input required type="password" placeholder="PASSWORD" className = "sign-in-form-field has-tip" onChange={this.handleChange} />
                    <div className="tip password-tip">At least 8 characters long, one uppercase letter, one lowercase letter, and one number </div>
                    <input required type="password" placeholder="CONFIRM PASSWORD" className = "sign-in-form-field" onChange={this.handleChange} />
                    <div className="user-type-wrapper">
                        <label className="field-label">STUDENT</label><input required type="radio" name="user-type"/>
                        <label className="field-label">TUTOR</label><input required type="radio" name="user-type"/>
                    </div>
                    <div className="tip user-tip"> Select one </div>
                     <div className = "sign-in-button-wrapper">
                        <button type="submit" className = "sign-in-button" value="LOGIN">
                            LET'S GO
                        </button>
                    </div>
                </form>
            </React.Fragment>

        )
    }
}

export default SignUpForm2