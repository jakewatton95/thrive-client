import React from 'react'
import Nav from '../components/Nav/Nav'
import SessionView from '../components/Sessions/SessionView'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import ScheduleSession from '../components/ScheduleSession/ScheduleSession'
import { Switch, Route } from 'react-router-dom'
import UpcomingSessions from '../components/Sessions/UpcomingSessions.js'
import Dashboard from '../components/Dashboard/Dashboard'
import TutorView from '../components/TutorView/TutorView'
import Profile from '../components/OtherProfile/Profile'
import Invoice from '../components/Invoice/InvoiceContainer'
import UserProfile from '../components/UserProfile/UserProfile'

const StudentContainer = () => {
    
    return (
        <React.Fragment>
            <Nav user="student" />
            <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route path="/dashboard/sessions" component={SessionView} />
                <Route path="/dashboard/scheduleSession" component={ScheduleSession}/>
                <Route exact path="/dashboard/tutors" component={TutorView} />
                <Route path="/dashboard/tutors/:ID" render={()=><Profile profileType="Tutor"/>} />
                <Route path="/dashboard/invoice" component={Invoice}/>
                <Route path="/dashboard/profile" component = {UserProfile} />
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>
    )
}

export default StudentContainer