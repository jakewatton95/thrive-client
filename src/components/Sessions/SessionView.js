import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Session from './Session'
import moment from 'moment'
import "./SessionView.less"
import { getUserInfo, getSessionList } from '../../helpers'

const SessionView = () => {

    const { currentUserInfo } = getUserInfo()
    let { role } = currentUserInfo

    const { data: sessionData, loading, errors: sessionErrors } = getSessionList(currentUserInfo)
    const sessions = role == "Admin" ? sessionData && sessionData.sessionsByCompany :
        role == "Student" ? sessionData && sessionData.sessionsByStudent :
            role == "Tutor" ? sessionData && sessionData.sessionsByTutor : []

    const [viewDate, setViewDate] = useState(moment().startOf('day'))
    const [viewing, setViewing] = useState('month')

    useEffect(() => window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    }), [viewing, viewDate])

    const handleTodayClick = e => {
        e.preventDefault()
        setViewDate(moment().startOf('day'))
    }

    const generateDay = (date = moment(viewDate)) => (
        <div className="session-day-container" key={date.day()}>
            {sessions.filter(session =>
                moment(session.date) >= moment(date).startOf('day') && moment(session.date) <= moment(date).endOf('day'))
                .sort((sessiona, sessionb) => moment(sessiona.date) - moment(sessionb.date))
                .map(session => <Session view={viewing} userRole={role} key={session.id} sessionInfo={session} />)
            }
        </div>
    )

    const generateSingleDay = () =>
        <React.Fragment>
            <div className="sticky-under-header">
                <div className="calendar-row day-names">
                    <span className="day">{viewDate.format('ddd')}</span>
                </div>
                <div className="calendar-row day-numbers">
                    <span className="day selected">
                        <div className="day-number">
                            {viewDate.format('DD')}
                        </div>
                    </span>
                </div>
            </div>
            <div className="calendar-row session-day-containers">
                {generateDay()}
            </div>
        </React.Fragment>

    const generateWeek = () => {
        let wholeWeek = [];
        for (let i = 0; i < 7; i++) {
            wholeWeek.push(generateDay(moment(viewDate).startOf('week').add(i, "day")))
        }
        return (
            <React.Fragment>
                <div className="sticky-under-header">
                    {dayNames()}
                    {dayNumbers()}
                </div>
                <div className="calendar-row session-day-containers">
                    {wholeWeek}
                </div>
            </React.Fragment>
        )
    }

    const generateMonth = () => {
        const offSetDays/*QUAVO*/ = moment(viewDate).startOf('month').day()
        const endOfMonth = moment(viewDate).endOf('month')
        const dayIterator = moment(viewDate).startOf('month').subtract(offSetDays, 'days')
        const days = []

        const hasConfirmed = () => {
            const sessionList = sessions.filter(session =>
                moment(session.date) >= moment(dayIterator).startOf('day') && moment(session.date) <= moment(dayIterator).endOf('day'))
            return !sessionList.length ? "" :
                sessionList.filter(session => !session.studentconfirmed || !session.tutorconfirmed).length ?
                    "unconfirmed" : "scheduled"
        }

        const dayClicked = e => {
            const parseDay = e.currentTarget.getAttribute('data-value')
            setViewDate(moment(parseDay))
            setViewing("day");
        }

        /*dayIterator.day() returns day of week (0 - 6)*/
        for (dayIterator; dayIterator < endOfMonth || dayIterator.day() > 0; dayIterator.add(1, 'day')) {
            days.push(
                <div key={moment(dayIterator).utc()} data-value={dayIterator.format()} onClick={dayClicked} className={`day month-view ${hasConfirmed()}`}>
                    <div className={`day-number ${dayIterator.dayOfYear() == viewDate.dayOfYear() ? "selected" : ""}`}>
                        {dayIterator.format('DD')}
                    </div>
                </div>
            )
        }
        return (
            <React.Fragment>
                <div className="month-title">
                    <div className="month-arrow" onClick={() => setViewDate(moment(viewDate).subtract(1, 'month'))}>
                        &lt;
                    </div>
                    <div>
                        {viewDate.format('MMMM YYYY')}
                    </div>
                    <div className="month-arrow" onClick={() => setViewDate(moment(viewDate).add(1, 'month'))}>
                        &gt;
                    </div>
                </div>
                <div className="sticky-under-header">
                    {dayNames()}
                </div>
                <div className="month-container">
                    {days}
                </div>
                <div className="legend">
                    <div className="legend-title">
                        KEY:
                    </div>
                    <div className="legend-item">
                        <div className="yellow box"> </div>
                        Scheduled Sessions
                    </div>
                    <div className="legend-item">
                        <div className="orange box"> </div>
                        Unconfirmed Sessions
                    </div>
                    <div className="legend-item">
                        <div className="blue box"> </div>
                        Unscheduled Days
                    </div>
                </div>
            </React.Fragment>
        )
    }

    const dayNames = () =>
        <div className="calendar-row day-names">
            <span className="day">Sun</span>
            <span className="day">Mon</span>
            <span className="day">Tue</span>
            <span className="day">Wed</span>
            <span className="day">Thu</span>
            <span className="day">Fri</span>
            <span className="day">Sat</span>
        </div>

    const dayNumbers = () => {
        const dayNums = [0, 1, 2, 3, 4, 5, 6]
        return (
            <div className="calendar-row day-numbers">
                {dayNums.map(num => (
                    <span className={`day ${moment(viewDate).startOf('week').add(num, 'days').date() == viewDate.date() ? "selected" : ''}`} key={num}>
                        <div className='day-number'>
                            {moment(viewDate).startOf('week').add(num, 'days').format('DD')}
                        </div>
                    </span>))}
            </div>
        )
    }
    if (loading) return <div> loading...</div>
    return (
        <React.Fragment>
            <nav className="secondary__nav_session-view">
                <div className="secondary__navigation_items_session-view">
                    <div className="date-select-container">
                        <div className="date-selection">
                            <label className="date-select-label"> Date: </label>
                            <DatePicker selected={viewDate.toDate()} onChange={viewDate => setViewDate(moment(viewDate))} required />
                            <button className="today-button" onClick={handleTodayClick}> Today </button>
                        </div>
                        <div className="date-range">
                            <div className={`range-view-type ${viewing=='day' && "selected"}`} onClick={()=>setViewing('day')}>
                                Day
                            </div>
                            <div className={`range-view-type ${viewing=='week' && "selected"}`} onClick={()=>setViewing('week')}>
                                Week
                            </div>
                            <div className={`range-view-type ${viewing=='month' && "selected"}`} onClick={()=>setViewing('month')}>
                                Month
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="secondary-nav-buffer"></div>
            <div className="session-view-container">
                <div className={`sessions-list ${viewing}-view`}>
                    {viewing == "day" && generateSingleDay()}
                    {viewing == "week" && generateWeek()}
                    {viewing == "month" && generateMonth()}
                </div>
            </div>
        </React.Fragment>
    )
}

export default SessionView