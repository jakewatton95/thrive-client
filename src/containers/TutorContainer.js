import React, { Component, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import BillingView from '../components/BillingView'
import ErrorPage from '../components/ErrorPage'
import SessionView from '../components/Sessions/SessionView'
import PaymentView from '../components/PaymentView'
import ScheduleSession from '../components/ScheduleSession'
import UpcomingSessions from '../components/Sessions/UpcomingSessions'
import { useSelector, useDispatch } from 'react-redux'
import { storeBillings, storeTutorID, storePayments, storeProducts, storeSessions } from '../store/actions/actions'
import Dashboard from '../components/Dashboard/Dashboard'
import StudentView from '../components/StudentView'


const TutorContainer = () => {
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        let isCancelled = false
        let tempTutorID = null

        const fetchData = async () => {
            let url = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors?email=" + userInfo.Email
            await fetch(url)
                .then(response => response.json())
                .then(response => {
                    tempTutorID = response.find(tutor => tutor.email == userInfo.email).TutorID
                    if (!isCancelled) {
                        dispatch(storeTutorID(tempTutorID))
                    }
                })
                .catch(err => console.log("ERR: " + err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions?tutorID=' + tempTutorID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeSessions(response))
                    }
                })
                .catch(err => console.log("ERR: " + err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products?tutorID=' + tempTutorID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeProducts(response))
                    }
                })
                .catch(err => console.log("ERR: " + err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=' + tempTutorID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storePayments(response))
                    }
                })
                .catch(err => console.log("Err: " + err))

            fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing?tutorID=' + tempTutorID)
                .then(response => response.json())
                .then(response => {
                    if (!isCancelled) {
                        dispatch(storeBillings(response))
                    }
                })
                .catch(err => console.log("Err" + err))
        }

        fetchData()

        return () => {
            isCancelled = true
        }
    }, [])

    const renderTutorHome = () => (
        <React.Fragment>
            <ScheduleSession />
            <UpcomingSessions />
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <Nav user="tutor" />
            <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/sessions" component={SessionView} />
                <Route path="/dashboard/students" component={StudentView} />
                <Route exact path="/dashboard/billing" component={BillingView} />
                <Route exact path="/dashboard/payment" component={PaymentView} />
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>
    )
}
export default TutorContainer