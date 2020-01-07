import React, { Component } from 'react'
import './InfoPage.css'
import {NavLink} from 'react-router-dom'
import book_logo from '../media/book_logo.png'
import calendar_logo from '../media/calendar_logo.png'
import clock_logo from '../media/clock_logo.png'
import down_arrow from '../media/down_arrow.png'

class InfoPage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }



    render() {
        let {signIn, signUp} = this.props
        return (
            <React.Fragment>
                <header className="header">
                    <div className="promotions">

                    </div>
                    <div className="nav-container">
                        <nav>
                            <div className="nav-buttons-wrapper">
                                    <NavLink to="/sign_in" className = "nav-tab">
                                        Sign In
                                    </NavLink>
                                    <NavLink  to="/sign_up" className = "nav-tab">
                                        Sign Up
                                    </NavLink>
                            </div>
                        </nav>
                    </div>
                </header>
                <div className ="hero-section contained">
                <section className="welcome-section">
                    <div className="welcome-text">
                        Welcome to
                    </div>
                    <div className="company-name">
                        THRIVE
                    </div>
                    <div className="mission-statement">
                        Thrive streamlines the logistics of your tutoring business, saving time and allowing you to focus on what really matters: <span className="emphasize">the students</span>.
                    </div>
                </section>
                <section className="icons">
                    <img className="icon" src={book_logo} alt="learn more"></img>
                    <img className="icon" src={calendar_logo} alt = "plan ahead"></img>
                    <img className="icon" src={clock_logo} alt = "save time"></img>
                </section>
                <section className="learn-more">
                    <div className="learn-more-text">
                        Learn more
                    </div>
                    <img className="down-arrow" src={down_arrow} alt = "learn more below"></img>
                </section>
                </div>
            </React.Fragment>
        )
    }
}

export default InfoPage