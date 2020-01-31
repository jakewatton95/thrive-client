import React from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const StudentLinks = props => (
    <React.Fragment>
        <NavLink to="/dashboard/sessions" onClick={props.toggle ? props.toggle : null} activeClassName="active-tab" className="nav-link">
            Schedule
        </NavLink>
        <NavLink to="/dashboard/tutors" onClick={props.toggle ? props.toggle : null} activeClassName="active-tab" className="nav-link">
            Tutors
        </NavLink>
        <NavLink to="/dashboard/invoice" onClick={props.toggle ? props.toggle : null} activeClassName="active-tab" className="nav-link">
            Invoices
        </NavLink>
        <NavLink to="/dashboard/messages" onClick={props.toggle ? props.toggle : null} activeClassName="active-tab" className="nav-link">
            Messages
        </NavLink>
        <NavLink to="/sign_in" className="nav-link" onClick={() => Auth.signOut()}>
            Sign Out
        </NavLink>
    </React.Fragment>
)

export default StudentLinks