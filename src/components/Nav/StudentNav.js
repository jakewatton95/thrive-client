import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav, Navbar} from 'react-bootstrap'
import Home from '../Home'
import ErrorPage from '../ErrorPage'
import BillingView from '../BillingView'
//import { Auth } from 'aws-amplify'
import SessionView from '../SessionView'
import StudentTutorView from '../StudentTutorView'
import PaymentView from '../PaymentView'
import './Nav.css'


class StudentNav extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render(){
        let {sessions, studentID, userInfo, payments, billings, products} = this.props
        return(
            <React.Fragment>
                 <Navbar collapseOnSelect expand = "lg"  variant = "dark" bg = "dark">
                <Navbar.Brand>Thrive Tutors</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className= "nav-tabs">
                        <NavLink to="/" activeClassName="active-tab" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/sessions" activeClassName="active-tab" className="nav-link">
                            Schedule
                        </NavLink>
                        <NavLink to="/tutors" activeClassName="active-tab" className="nav-link">
                            Tutors
                        </NavLink>
                        <NavLink to="/billing" activeClassName="active-tab" className="nav-link">
                            Billing
                        </NavLink>
                        <NavLink to="/payment" activeClassName="active-tab" className="nav-link">
                            Payment
                        </NavLink>
                        <button className="sign-out-button" onClick={this.props.signOut}> Sign Out </button>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
                
                <Switch>
                    <Route exact path="/" render={()=><Home studentID = {studentID} sessions = {sessions} products={products} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/sessions" render={()=> <SessionView sessions = {sessions} studentID = {studentID} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/tutors" render={() => <StudentTutorView studentID = {studentID} products={products}/>}>
                    </Route>
                    <Route exact path ="/billing" render={()=><BillingView studentID = {studentID} billings={billings} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/payment" render = {() => <PaymentView studentID = {studentID} userInfo={userInfo} payments={payments} tutors={[]} students={[]}/>}>
                    </Route>
                    <Route component = {ErrorPage}>
                    </Route>
                </Switch>
            </React.Fragment>      
        )
    }
}

export default StudentNav