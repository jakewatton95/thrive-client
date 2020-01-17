import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import BillingView from '../components/BillingView'
import ErrorPage from '../components/ErrorPage'
import SessionView from '../components/Sessions/SessionView'
import StudentTutorView from '../components/StudentTutorView'
import PaymentView from '../components/PaymentView'
import ScheduleSession from '../components/ScheduleSession'
import UpcomingSessions from '../components/Sessions/UpcomingSessions'

class TutorContainer extends Component{
    _isMounted=false
    constructor (props){
        super(props)
        this.state = {
            tutorID : '',
            sessions: [],
            payments: [],
            billings: [],
            products: []
        }
    }
    async componentDidMount(){
        this._isMounted = true
        let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors?email=" + this.props.userInfo.Email
        await fetch(url)
        .then(response =>  response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    tutorID: response[0].TutorID,
                })
            }
        })
        .catch(err => console.log("ERR: " + err))
        
        await fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?tutorID=' + this.state.tutorID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    sessions: response,
                })
            }
        })
        .catch(err => console.log("ERR: " + err))
        
        await fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products?tutorID=' + this.state.tutorID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    products: response,
                })
            }
        })
        .catch(err => console.log("ERR: " + err))
        
        await fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=' + this.state.tutorID)
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
            }
        })
        .catch(err => console.log("Err: " + err))
        
        await fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?tutorID=' + this.state.tutorID)
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
        this._isMounted = false
    }
    
    render(){
        let { sessions, payments, billings, tutorID, products } = this.state
        let { userInfo } = this.props

        const renderTutorHome = () => (
            <React.Fragment>
                <ScheduleSession products={products} userInfo={userInfo}/>
                <UpcomingSessions sessions={sessions} userInfo={userInfo}/>
            </React.Fragment>
        )

        return (
            <React.Fragment>
                <Nav user="tutor"/>
                <Switch>
                    <Route exact path="/dashboard" render={renderTutorHome}>
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
}

export default TutorContainer