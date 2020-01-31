import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import ScheduleSession from '../components/ScheduleSession'
import UpcomingSessions from '../components/Sessions/UpcomingSessions'
import AddProduct from '../components/AddProduct'
import BillingView from '../components/BillingView'
import ErrorPage from '../components/ErrorPage'
import StudentView from '../components/StudentView'
import TutorView from '../components/TutorView'
import SessionView from '../components/Sessions/SessionView'
import PaymentView from '../components/PaymentView'
import StudentProfile from '../components/StudentProfile'
import TutorProfile from '../components/TutorProfile'
import { useDispatch } from 'react-redux'
import { storeStudents, storeTutors, storeBillings, storePayments, storeProducts, storeSessions } from '../store/actions/actions'
import Dashboard from '../components/Dashboard/Dashboard'

const AdminContainer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        let isCancelled = false
        const baseUrl = 'https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/'

        fetch(baseUrl + 'students')
            .then(response => response.json())
            .then(response => {
                if (!isCancelled) {
                    dispatch(storeStudents(response))
                }
            })
            .catch(err => console.log("Err" + err))

        fetch(baseUrl + 'sessions')
            .then(response => response.json())
            .then(response => {
                if (!isCancelled) {
                    dispatch(storeSessions(response))
                }
            })
            .catch(err => console.log("Err" + err))

        fetch(baseUrl + 'payments')
            .then(response => response.json())
            .then(response => {
                if (!isCancelled) {
                    dispatch(storePayments(response))
                }
            })
            .catch(err => console.log("Err" + err))

        fetch(baseUrl + 'products')
            .then(response => response.json())
            .then(response => {
                if (!isCancelled) {
                    dispatch(storeProducts(response))
                }
            })
            .catch(err => console.log("Err" + err))

        fetch(baseUrl + 'tutors')
            .then(response => response.json())
            .then(response => {
                if (!isCancelled) {
                    dispatch(storeTutors(response))
                }
            })
            .catch(err => console.log("Err" + err))

        fetch(baseUrl + 'billing')
            .then(response => response.json())
            .then(response => {
                if (!isCancelled) {
                    dispatch(storeBillings(response))
                }
            })
            .catch(err => console.log("Err" + err))

        return () => {
            isCancelled = true;
        }
    }, [])

    return (
        <React.Fragment>
            <Nav user="admin" />
            <Switch>
                <Route exact path="/dashboard/students" component={StudentView} />
                <Route exact path="/dashboard/addProduct" component = {AddProduct} />
                <Route exact path="/dashboard/scheduleSession" component = {ScheduleSession}/>
                <Route path="/dashboard/students/:studentID" component={StudentProfile} />
                <Route exact path="/dashboard/tutors" component={TutorView} />
                <Route path="/dashboard/tutors/:tutorID" component={TutorProfile} />
                <Route exact path="/dashboard/sessions" component={SessionView} />
                <Route exact path="/dashboard/billing" component={BillingView} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/payment" component={PaymentView} />
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>
    )
}
export default AdminContainer