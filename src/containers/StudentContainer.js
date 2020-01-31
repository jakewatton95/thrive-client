import React, { useEffect } from 'react'
import Nav from '../components/Nav/Nav'
import SessionView from '../components/Sessions/SessionView'
import PaymentView from '../components/PaymentView'
import ErrorPage from '../components/ErrorPage'
import BillingView from '../components/BillingView'
import ScheduleSession from '../components/ScheduleSession'
import { Switch, Route } from 'react-router-dom'
import UpcomingSessions from '../components/Sessions/UpcomingSessions.js'
import { useSelector, useDispatch } from 'react-redux'
import { storeBillings, storeStudentID, storePayments, storeProducts, storeSessions } from '../store/actions/actions'
import Dashboard from '../components/Dashboard/Dashboard'
import TutorView from '../components/TutorView'

const StudentContainer = () => {
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        let isCancelled = false
        let tempStudentID = null

        const fetchData = async () => {

            let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students?email=" + userInfo.Email
            await fetch(url)
                .then(response => response.json())
                .then(response => {
                    tempStudentID = response.find(student => student.email == userInfo.email).StudentID
                    if (!isCancelled)
                        dispatch(storeStudentID(tempStudentID))
                })
                .catch(err => console.log("Error fetching StudentID", err))


            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products?studentID=' + tempStudentID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeProducts(response))
                    }
                })
                .catch(err => console.log("Error fetching products", err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?studentID=' + tempStudentID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeSessions(response))
                    }
                })
                .catch(err => console.log("Error fetching sessions", err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?studentID=' + tempStudentID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storePayments(response))
                    }
                })
                .catch(err => console.log("Error fetching payments", err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?studentID=' + tempStudentID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeBillings(response))
                    }
                })
                .catch(err => console.log("Error fetching billings", err))
        }

        fetchData()

        return () => {
            isCancelled = true;
        }
    }, [])

    return (
        <React.Fragment>
            <Nav user="student" />
            <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route path="/dashboard/sessions" component={SessionView} />
                <Route path="/dashboard/scheduleSession" component={ScheduleSession}/>
                <Route path="/dashboard/tutors" component={TutorView} />
                <Route path="/dashboard/billing" component={BillingView} />
                <Route path="/dashboard/payment" component={PaymentView} />
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>
    )
}

export default StudentContainer