import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import BillingView from '../components/BillingView'
import ErrorPage from '../components/ErrorPage'
import SessionView from '../components/Sessions/SessionView'
import PaymentView from '../components/PaymentView'
import ScheduleSession from '../components/ScheduleSession/ScheduleSession'
import UpcomingSessions from '../components/Sessions/UpcomingSessions'
import Dashboard from '../components/Dashboard/Dashboard'
import StudentView from '../components/StudentView'
import Profile from '../components/Profile'


const TutorContainer = () => {

    return (
        <React.Fragment>
            <Nav user="tutor" />
            <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/sessions" component={SessionView} />
                <Route path="/dashboard/scheduleSession" component={ScheduleSession}/>
                <Route exact path="/dashboard/students" component={StudentView} />
                <Route path="/dashboard/students/:ID" render={()=><Profile profileType="Student"/>} />
                <Route exact path="/dashboard/billing" component={BillingView} />
                <Route exact path="/dashboard/payment" component={PaymentView} />
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>
    )
}
export default TutorContainer