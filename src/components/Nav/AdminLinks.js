import React from 'react';
import { NavLink } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { Auth } from 'aws-amplify'



const AdminLinks = props => (
    <React.Fragment>
        <NavLink to="/dashboard/students" onClick={props.toggle ? props.toggle : null} activeClassName="active-tab" className="nav-link">
            Students
        </NavLink>
        <NavLink to="/dashboard/tutors" onClick={props.toggle ? props.toggle : null} activeClassName="active-tab" className="nav-link">
            Tutors
        </NavLink>
        <NavLink to="/dashboard/sessions" onClick={props.toggle ? props.toggle : null} exact={true} activeClassName="active-tab" className="nav-link">
            Schedule
        </NavLink>
        <NavLink to="/dashboard/billing" onClick={props.toggle ? props.toggle : null} exact={true} activeClassName="active-tab" className="nav-link">
            Billing
        </NavLink>
        <NavLink to="/dashboard/payment" onClick={props.toggle ? props.toggle : null} exact={true} activeClassName="active-tab" className="nav-link">
            Payments
        </NavLink>
        <NavLink to="/sign_in" className="nav-link" onClick={() => Auth.signOut()}>
            Sign Out
        </NavLink>
    </React.Fragment>

)


export default AdminLinks;