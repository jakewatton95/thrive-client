import React, {Component} from 'react';
import './Nav.css'
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import Home from '../Home'
import BillingView from '../BillingView'
import ErrorPage from '../ErrorPage'
//import { Auth } from 'aws-amplify'
import StudentView from '../StudentView'
import TutorView from '../TutorView'
import SessionView from '../SessionView'
import PaymentView from '../PaymentView'
import StudentProfile from '../StudentProfile'
import TutorProfile from '../TutorProfile'
import './Nav.css'


class AdminNav extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    
    render(){
        let {students, tutors, billings, payments, sessions, userInfo, products} = this.props
        return(
            <React.Fragment>
                <Nav className= "nav-tabs">
                    <div className = "navItem">
                        <NavLink to="/admin" exact={true} activeClassName="active-tab" className="nav-link">
                            Home
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/students" activeClassName="active-tab" className="nav-link">
                            Students
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/tutors" activeClassName="active-tab" className="nav-link">
                            Tutors
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/sessions" exact={true} activeClassName="active-tab" className="nav-link">
                            Sessions
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/billing" exact={true} activeClassName="active-tab" className="nav-link">
                            Billing
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <NavLink to="/payment" exact={true} activeClassName="active-tab" className="nav-link">
                            Payments
                        </NavLink>
                    </div>
                    <div className = "navItem">
                        <button className="nav-link" onClick={this.props.signOut}> Sign Out </button>
                    </div>
                </Nav>
                <Switch>
                    <Route exact path="/students" render={() => <StudentView students={students}/>}>
                    </Route>
                    <Route path = "/students/:studentID" render={props => <StudentProfile {...props} students={students} payments={payments} sessions = {sessions} billings={billings}/>}>
                    </Route>
                    <Route exact path ="/tutors" render={() => <TutorView tutors={tutors}/>}>
                    </Route>
                    <Route path = "/tutors/:tutorID" render={props => <TutorProfile {...props} tutors={tutors} payments={payments} sessions = {sessions} billings={billings}/>}>
                    </Route>
                    <Route exact path ="/sessions" render={()=> <SessionView sessions={sessions} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/billing" render={()=><BillingView billings={billings} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path="/admin" render={()=><Home userInfo={userInfo} students={students} tutors={tutors} products={products} sessions = {sessions}/>}>
                    </Route>
                    <Route exact path="/payment" render={()=><PaymentView userInfo={userInfo} students = {students} payments={payments} tutors = {tutors}/>}>
                    </Route>
                    <Redirect exact from='/' to="/admin"/>
                    <Route component = {ErrorPage}>
                    </Route>


                </Switch>
            </React.Fragment>      
        )
    }
}

export default AdminNav;