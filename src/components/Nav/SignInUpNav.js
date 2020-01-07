import React, { Component } from 'react'
import '../InfoPage.css'
import {NavLink} from 'react-router-dom'


class SignInUpNav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signInPage: true
        }
    }



    render() {
        let {signIn} = this.props
        return (
            <React.Fragment>
                <header className="header">
                    <div className="nav-container sign-in-up">
                        <nav>
                            <div className="nav-buttons-wrapper sign-in-up">
                                    <NavLink to="/" className = "nav-tab sign-in-up-home" exact={true}>
                                         HOME
                                    </NavLink>
                                    {signIn ? 
                                        <NavLink  to="/sign_up" className = "nav-tab sign-in-up" exact={true}>
                                            SIGN UP
                                        </NavLink> 
                                        :
                                        <NavLink to="/sign_in" className = "nav-tab sign-in-up" exact={true}>
                                            SIGN IN
                                        </NavLink>
                                    }
                            </div>
                        </nav>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}

export default SignInUpNav