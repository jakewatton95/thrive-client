import React from 'react'
import '../InfoPage/InfoPage.css'
import { NavLink } from 'react-router-dom'


const SignInUpNav = ({signIn}) => 
    (
        <React.Fragment>
            <header className="header sign-up-pages">
                <div className="nav-container sign-in-up">
                    <nav>
                        <div className="nav-buttons-wrapper sign-in-up">
                            <NavLink to="/" className="nav-tab sign-in-up-home" exact={true}>
                                HOME
                            </NavLink>
                            {signIn ?
                                <NavLink to="/sign_up" className="nav-tab sign-in-up" exact={true}>
                                    SIGN UP
                                </NavLink>
                                :
                                <NavLink to="/sign_in" className="nav-tab sign-in-up" exact={true}>
                                    SIGN IN
                                </NavLink>
                            }
                        </div>
                    </nav>
                </div>
            </header>
        </React.Fragment>
    )

export default SignInUpNav