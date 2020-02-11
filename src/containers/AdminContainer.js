import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import ScheduleSession from '../components/ScheduleSession/ScheduleSession'
import AddProduct from '../components/AddProduct/AddProduct'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import StudentView from '../components/StudentView/StudentView'
import TutorView from '../components/TutorView/TutorView'
import SessionView from '../components/Sessions/SessionView'
import Profile from '../components/OtherProfile/Profile'
import Dashboard from '../components/Dashboard/Dashboard'
import Invoice from '../components/Invoice/InvoiceContainer'
import UserProfile from '../components/UserProfile/UserProfile'

const AdminContainer = () => {

   return (
        <React.Fragment>
            <Nav user="admin" />
            <Switch>
                <Route exact path="/dashboard/students" component={StudentView} />
                <Route exact path="/dashboard/addProduct" component = {AddProduct} />
                <Route exact path="/dashboard/scheduleSession" component = {ScheduleSession}/>
                <Route path="/dashboard/students/:ID" render={()=><Profile profileType="Student"/>} />
                <Route exact path="/dashboard/tutors" component={TutorView} />
                <Route path="/dashboard/tutors/:ID" render={()=><Profile profileType="Tutor"/>} />
                <Route exact path="/dashboard/sessions" component={SessionView} />
                <Route path="/dashboard/invoice" component = {Invoice} />
                <Route path="/dashboard/profile" component = {UserProfile} />
                <Route exact path="/dashboard" component={Dashboard} />                
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>
    )
}
export default AdminContainer