import React, {Component, useState} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import BillingEntry from "./BillingEntry"
import { useSelector } from 'react-redux'
import moment from 'moment'

const BillingView = () => {
    const billings = useSelector(state => state.billings)
    const userInfo = useSelector(state => state.userInfo)

    const [startDate, setStartDate] = useState(moment().startOf('day'))
    const [endDate, setEndDate] = useState(moment().endOf('day'))

    return (
        <React.Fragment>
        <div className = "dateSelectors">
                <label> From: </label>
                <DatePicker id='startDate' selected={startDate.toDate()} onChange={date=> setStartDate(moment(date))} required/>
                <label> To: </label>
                <DatePicker id='endDate' selected={endDate.toDate()} onChange={date=>setEndDate(moment(date))} required/>
            </div>

        <div className = "main">
                {billings.filter(session => 
                    moment(session.date) <= endDate && moment(session.date) >= startDate)
                    .map(billing => <BillingEntry userRole={userInfo.UserType} key={billing.SessionID} billingInfo={billing}/>)} 
        </div>
        </React.Fragment>
    )
}

export default BillingView