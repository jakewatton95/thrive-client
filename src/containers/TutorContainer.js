import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import SessionView from '../components/Sessions/SessionView'
import ScheduleSession from '../components/ScheduleSession/ScheduleSession'
import UpcomingSessions from '../components/Sessions/UpcomingSessions'
import Dashboard from '../components/Dashboard/Dashboard'
import StudentView from '../components/StudentView/StudentView'
import Profile from '../components/OtherProfile/Profile'
import Invoice from '../components/Invoice/Invoice'


const TutorContainer = () => {

    return (
        <React.Fragment>
            <Nav user="tutor" />
            <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/sessions" component={SessionView} />
                <Route path="/dashboard/scheduleSession" component={ScheduleSession}/>
                <Route exact path="/dashboard/students" component={StudentView} />
                <Route exact path="/dashboard/invoice" component={Invoice}/>
                <Route path="/dashboard/students/:ID" render={()=><Profile profileType="Student"/>} />
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>
    )
}
export default TutorContainer