import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav, Navbar} from 'react-bootstrap'
import Home from '../Home'
import BillingView from '../BillingView'
import ErrorPage from '../ErrorPage'
import SessionView from '../SessionView'
import StudentTutorView from '../StudentTutorView'
import PaymentView from '../PaymentView'
import './Nav.css'

class TutorNav extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render(){
        let {sessions, payments, userInfo, billings, tutorID, products} = this.props
        return(
            <React.Fragment>

            <Navbar collapseOnSelect expand = "lg"  variant = "dark" bg = "dark">
                <Navbar.Brand>Thrive Tutors</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                        <NavLink to="/tutor" activeClassName="active" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/students" activeClassName="active" className="nav-link">
                            Students
                        </NavLink>
                        <NavLink to="/sessions" activeClassName="active" className="nav-link">
                            Schedule
                        </NavLink>
                        <NavLink to="/billing" activeClassName="active" className="nav-link">
                            Billing
                        </NavLink>
                        <NavLink to="/payment" activeClassName="active" className="nav-link">
                            Payments
                        </NavLink>
                        <button className = "sign-out-button" onClick={this.props.signOut}> Sign Out </button>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            

                <Switch>
                    <Route exact path="/tutor" render={()=><Home tutorID = {tutorID} sessions = {sessions} products={products} userInfo={userInfo}/>}>
                    </Route>
                    <Route path ="/sessions" render={()=> <SessionView tutorID = {tutorID} sessions = {sessions} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/students" render={() => <StudentTutorView tutorID = {tutorID} products={products}/>}>
                    </Route>
                    <Route exact path ="/billing" render={()=><BillingView billings={billings} tutorID = {tutorID} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/payment" render = {() => <PaymentView tutorID = {tutorID} userInfo={userInfo} payments={payments} tutors={[]} students={[]}/>}>
                    </Route>
                    <Redirect exact from="/" to="/tutor" />
                    <Route component = {ErrorPage}>
                    </Route>
                </Switch>
            </React.Fragment>      
        )
    }
}

export default TutorNav