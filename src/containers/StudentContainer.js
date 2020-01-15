import React, { Component } from 'react'
import Nav from '../components/Nav/Nav'
import SessionView from '../components/SessionView'
import StudentTutorView from '../components/StudentTutorView'
import PaymentView from '../components/PaymentView'
import ErrorPage from '../components/ErrorPage'
import BillingView from '../components/BillingView'
import ScheduleSession from '../components/ScheduleSession'
import { Switch, Route } from 'react-router-dom'
import UpcomingSessions from '../components/UpcomingSessions.js'


class StudentContainer extends Component{
    _isMounted=false
    constructor (props){
        super(props)
        this.state = {
            studentID: '',
            sessions: [],
            payments: [],
            billings: [],
            products: []
            
        }
    }
    
    async componentDidMount(){
        this._isMounted=true
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students?email=" + this.props.userInfo.Email
        await fetch(url)
        .then(response => response.json())
        .then(response => {
            this.setState({
                studentID: response[0].StudentID,
            })
        })
        .catch(err => console.log("Error fetching StudentID", err))
        
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    products: response,
                })
            }
        })
        .catch(err => console.log("Error fetching products", err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    sessions: response,
                })
            }
        })
        .catch(err => console.log("Error fetching sessions", err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
            }
        })
        .catch(err => console.log("Error fetching payments", err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?studentID=' + this.state.studentID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    billings: response
                })
            }
        })
        .catch(err => console.log("Error fetching billings", err))        
    }

    componentWillUnmount(){
        this._isMounted = false
    }    

    cancelSession(ID) {
        let {sessions, billings} = this.state
        console.log(sessions, payments, billings)
        let filteredSessions = sessions.filter(session => session.ID != ID)
        let filteredBillings = billings.filter(billing => billing.sessionID != ID)
        this.setState({
            sessions: filteredSessions,
            billings: filteredBillings
        })
    }
    
    render(){
        let { sessions, studentID, payments, billings, products } = this.state
        let { userInfo } = this.props

        const renderStudentHome = () => (
            <React.Fragment>
                <ScheduleSession products={products} userInfo={userInfo}/>
                <UpcomingSessions sessions={sessions} userInfo={userInfo}/>
            </React.Fragment>
        )


        return (
            <React.Fragment>
                <Nav user="student"/>
                <Switch>
                    <Route exact path="/dashboard" render={renderStudentHome}>
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
}

export default StudentContainer