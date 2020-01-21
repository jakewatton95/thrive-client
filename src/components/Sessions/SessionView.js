import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Session from './Session'
import moment from 'moment'
import "./SessionView.less"
import { useSelector } from 'react-redux'

const SessionView = () => {

    const userInfo = useSelector(state => state.userInfo)
    const sessions = useSelector(state => state.sessions)

    const [viewDate, setViewDate] = useState(moment().startOf('day'))
    const [viewing, setViewing] = useState('week')

    useEffect(() => window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      }), [])

    const handleTodayClick = e => {
        e.preventDefault()
        setViewDate(moment().startOf('day'))
    }

    const generateDay = (date = moment(viewDate)) => (
        <div className="session-day-container" key={date.day()}>
            {sessions.filter(session =>
                moment(session.date) >= moment(date).startOf('day') && moment(session.date) <= moment(date).endOf('day'))
                .map(session => <Session view={viewing} userRole={userInfo.UserType} key={session.ID} sessionInfo={session} />)
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
                    <div className = 'day-number'>
                        {moment(viewDate).startOf('week').add(num, 'days').format('DD')}
                    </div>
                </span>))}
            </div>
        )
    }

    return ( 
        <div className="session-view-container">
            <div className="date-select-container">
                <div className="date-selection">
                    <label className="date-select-label"> Date: </label>
                    <DatePicker selected={viewDate.toDate()} onChange={viewDate => setViewDate(moment(viewDate))} required />
                    <button className="today-button" onClick={handleTodayClick}> Today </button>
                </div>
                <div className="date-range">
                    <label className="date-range-label">View: </label>
                    <select value={viewing} onChange={e => setViewing(e.target.value)}>
                        <option key='day' value='day'>Day</option>
                        <option key='week' value='week'>Week</option>
                        <option key='month' value='month'>Month</option>
                    </select>
                </div>
            </div>
            <div className={`sessions-list ${viewing}-view`}>
                {viewing == "day" && generateSingleDay()}
                {viewing == "week" && generateWeek()}
            </div>
        </div>
    )
}

export default SessionView