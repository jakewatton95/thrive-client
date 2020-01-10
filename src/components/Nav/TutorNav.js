import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import BillingView from '../BillingView'
import ErrorPage from '../ErrorPage'
import SessionView from '../SessionView'
import StudentTutorView from '../StudentTutorView'
import PaymentView from '../PaymentView'

const TutorNav = props => {
    let { sessions, payments, userInfo, billings, tutorID, products } = props
    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
                <Navbar.Brand>Thrive Tutors</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <NavLink to="/dashboard" activeClassName="active" className="nav-link" exact>
                            Home
                        </NavLink>
                        <NavLink to="/dashboard/students" activeClassName="active" className="nav-link">
                            Students
                        </NavLink>
                        <NavLink to="/dashboard/sessions" activeClassName="active" className="nav-link">
                            Schedule
                        </NavLink>
                        <NavLink to="/dashboard/billing" activeClassName="active" className="nav-link">
                            Billing
                        </NavLink>
                        <NavLink to="/dashboard/payment" activeClassName="active" className="nav-link">
                            Payments
                        </NavLink>
                        <NavLink to="/sign_in" className="nav-link" onClick={() => Auth.signOut()}>
                            Sign Out
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <Switch>
                <Route exact path="/dashboard" render={() => <div>ProfilePage</div>}>
                </Route>
                <Route path="/dashboard/sessions" render={() => <SessionView tutorID={tutorID} sessions={sessions} userInfo={userInfo} />}>
                </Route>
                <Route exact path="/dashboard/students" render={() => <StudentTutorView tutorID={tutorID} products={products} />}>
                </Route>
                <Route exact path="/dashboard/billing" render={() => <BillingView billings={billings} tutorID={tutorID} userInfo={userInfo} />}>
                </Route>
                <Route exact path="/dashboard/payment" render={() => <PaymentView tutorID={tutorID} userInfo={userInfo} payments={payments} tutors={[]} students={[]} />}>
                </Route>
                <Route component={ErrorPage}>
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default TutorNav