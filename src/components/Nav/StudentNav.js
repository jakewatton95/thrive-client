import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import Home from '../Dashboard'
import ErrorPage from '../ErrorPage'
import BillingView from '../BillingView'
import { Auth } from 'aws-amplify'
import SessionView from '../SessionView'
import StudentTutorView from '../StudentTutorView'
import PaymentView from '../PaymentView'
import './Nav.css'


const StudentNav = (props) => {

    const signOut = e =>
    {
        Auth.signOut()
    }

    let { sessions, studentID, userInfo, payments, billings, products } = props
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
                <Navbar.Brand>Thrive Tutors</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="nav-tabs">
                        <NavLink to="/dashboard" activeClassName="active-tab" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/dashboard/sessions" activeClassName="active-tab" className="nav-link">
                            Schedule
                        </NavLink>
                        <NavLink to="/dashboard/tutors" activeClassName="active-tab" className="nav-link">
                            Tutors
                        </NavLink>
                        <NavLink to="/dashboard/billing" activeClassName="active-tab" className="nav-link">
                            Billing
                        </NavLink>
                        <NavLink to="/dashboard/payment" activeClassName="active-tab" className="nav-link">
                            Payment
                        </NavLink>
                        <NavLink to="/sign_in" className="nav-link" onClick={signOut}> 
                            Sign Out
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Switch>
                <Route exact path="/dashboard" render={() => <div>Profile Page</div>}>
                </Route>
                <Route path="/dashboard/sessions" render={() => <SessionView sessions={sessions} studentID={studentID} userInfo={userInfo} />}>
                </Route>
                <Route path="/dashboard/tutors" render={() => <StudentTutorView studentID={studentID} products={products} />}>
                </Route>
                <Route path="/dashboard/billing" render={() => <BillingView studentID={studentID} billings={billings} userInfo={userInfo} />}>
                </Route>
                <Route path="/dashboard/payment" render={() => <PaymentView studentID={studentID} userInfo={userInfo} payments={payments} tutors={[]} students={[]} />}>
                </Route>
                <Route component={ErrorPage}>
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default StudentNav