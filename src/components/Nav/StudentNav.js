import React, {Component} from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
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
                <Nav className= "nav-tabs">
                    <div className = "navItem">
                        <NavLink to="/student" activeClassName="active-tab" className="nav-link">
                            Home
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/sessions" activeClassName="active-tab" className="nav-link">
                            Schedule
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/tutors" activeClassName="active-tab" className="nav-link">
                            Tutors
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/billing" activeClassName="active-tab" className="nav-link">
                            Billing
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/payment" activeClassName="active-tab" className="nav-link">
                            Payment
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <button className="nav-link" onClick={this.props.signOut}> Sign Out </button>
                    </div>
                </Nav>
                <Switch>
                    <Route exact path="/student" render={()=><Home studentID = {studentID} sessions = {sessions} products={products} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/sessions" render={()=> <SessionView sessions = {sessions} studentID = {studentID} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/tutors" render={() => <StudentTutorView studentID = {studentID} products={products}/>}>
                    </Route>
                    <Route exact path ="/billing" render={()=><BillingView studentID = {studentID} billings={billings} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/payment" render = {() => <PaymentView studentID = {studentID} userInfo={userInfo} payments={payments} tutors={[]} students={[]}/>}>
                    </Route>
                    <Redirect exact from="/" to="/student" />
                    <Route component = {ErrorPage}>
                    </Route>
                </Switch>
            </React.Fragment>      
        )
    }
}

export default StudentNav