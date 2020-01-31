import React from 'react';
import { NavLink } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const TutorLinks = props => (
    <React.Fragment>
        <NavLink to="/dashboard/sessions" onClick={props.toggle ? props.toggle : null} activeClassName="active-tab" className="nav-link">
            Schedule
        </NavLink>
        <NavLink to="/dashboard/students" onClick={props.toggle ? props.toggle : null} activeClassName="active-tab" className="nav-link">
            Students
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

export default TutorLinks