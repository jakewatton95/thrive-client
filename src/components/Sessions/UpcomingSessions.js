import React from 'react'
import './UpcomingSessions.css'
import Session from './Session'
import { useSelector } from 'react-redux'
import moment from 'moment'

const UpcomingSessions = props => {
    const sessions = useSelector(state => state.sessions)
    const userInfo = useSelector(state => state.userInfo)
    const userRole = userInfo.UserType
    const secondaryRole = (props && props.secondaryRole ? props.secondaryRole : null)
    const studentID = (props && props.studentID ? props.studentID: null)
    const tutorID = (props && props.tutorID ? props.tutorID: null)
    let weekSessions = secondaryRole ?
        sessions.filter(session => moment(session.date) <= moment().add(1, 'week') &&
            moment(session.date) >= moment() && (session.StudentID == studentID || session.TutorID == tutorID))
        :
        sessions.filter(session => moment(session.date) <= moment().add(1, 'week') &&
            moment(session.date) >= moment())

    return (
        <div className="upcoming-sessions-info">
            <div className= "upcoming-sessions-title"> This Week's Sessions: </div>
            {weekSessions == 0 ?
                <div> No sessions this week, schedule one on the home page! </div> :
                weekSessions.map(session => <Session userRole={userRole} secondaryRole={secondaryRole} key = {session.ID} sessionInfo={session}/>)
            }
        </div>
    )
}
export default UpcomingSessions


