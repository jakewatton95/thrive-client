import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import ScheduleSession from '../components/ScheduleSession'
import UpcomingSessions from '../components/UpcomingSessions'
import AddProduct from '../components/AddProduct'
import BillingView from '../components/BillingView'
import ErrorPage from '../components/ErrorPage'
import StudentView from '../components/StudentView'
import TutorView from '../components/TutorView'
import SessionView from '../components/SessionView'
import PaymentView from '../components/PaymentView'
import StudentProfile from '../components/StudentProfile'
import TutorProfile from '../components/TutorProfile'

class AdminContainer extends Component{
    _isMounted=false
    constructor (props){
        super(props)
        
        this.state = {
            students: [],
            tutors: [],
            billings: [],
            sessions: [],
            payments: [],
            products: []
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    students: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    sessions: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    products: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    tutors: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    billings: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    render(){
        let {students, tutors, billings, payments, sessions, products} = this.state
        let { userInfo } = this.props

        const renderAdminHome = () => (
                <React.Fragment>
                    <AddProduct tutors = {tutors} students = {students}/>
                    <ScheduleSession products = {products} userInfo = {userInfo}/>
                    <UpcomingSessions sessions = {sessions} userInfo = {userInfo}/>
                </React.Fragment>
            )
        

        return (
            <React.Fragment>
                <Nav user="admin"/>
                <Switch>
                    <Route exact path="/dashboard/students" render={() => <StudentView students={students}/>}>
                    </Route>
                    <Route path = "/dashboard/students/:studentID" render={props => <StudentProfile {...props} students={students} payments={payments} sessions = {sessions} billings={billings}/>}>
                    </Route>
                    <Route exact path ="/dashboard/tutors" render={() => <TutorView tutors={tutors}/>}>
                    </Route>
                    <Route path = "/dashboard/tutors/:tutorID" render={props => <TutorProfile {...props} tutors={tutors} payments={payments} sessions = {sessions} billings={billings}/>}>
                    </Route>
                    <Route exact path ="/dashboard/sessions" render={()=> <SessionView sessions={sessions} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path ="/dashboard/billing" render={()=><BillingView billings={billings} userInfo={userInfo}/>}>
                    </Route>
                    <Route exact path="/dashboard" render={renderAdminHome}>
                    </Route>
                    <Route exact path="/dashboard/payment" render={()=><PaymentView userInfo={userInfo} students = {students} payments={payments} tutors = {tutors}/>}>
                    </Route>
                    <Route component = {ErrorPage}>
                    </Route>
                </Switch>
            </React.Fragment>

        )
    }
}

export default AdminContainer