import React, { useState } from 'react'
import { getUserInfo, getUninvoicedSessions, updateSessionInvoiced, addInvoice } from '../../helpers'
import ScheduleSession from '../ScheduleSession/ScheduleSession'
import './CreateInvoice.less'

const CreateInvoice = () => {

    const {currentUserInfo} = getUserInfo()
    const sessions = getUninvoicedSessions(currentUserInfo)
    let uninvoicedSessionList = []
    const [callUpdateSessionInvoiced, updateSessionStatus] = updateSessionInvoiced(currentUserInfo)
    const [createInvoice, createInvoiceStatus] = addInvoice(currentUserInfo)


    const [invoiceSession, setInvoiceSession] = useState('')
    const [sessionAlreadyExists, setSessionAlreadyExists] = useState(true)
    //get List of uninvoiced sessions
    //give user a form to invoice session
    //confirm or deny that session was invoiced... set session invoiced to true and add invoice to table
    //ask user if they would like to invoice another session or see their current invoices

    const handleSubmit = e => {
        e.preventDefault()
        callUpdateSessionInvoiced({variables: {sessionid: parseInt(invoiceSession)}})
        createInvoice({variables: {sessionid: parseInt(invoiceSession)}})
        setInvoiceSession('')
    }

    if (sessions.loading) return <div>loading...</div>
    if (sessions.data) {
        uninvoicedSessionList = sessions.data.sessionsByCompany.filter(session=> !session.invoiced)
    }
    // console.log("USL", uninvoicedSessionList)
    return (

        <React.Fragment>
            <div>
                <div className="subtitle">
                    Select the session you would like to invoice
                </div>
                <form className = "new-invoice-form" onSubmit={handleSubmit}>
                <select required id="session" value={invoiceSession} onChange={e=>setInvoiceSession(e.target.value)}>
                    <option disabled={true} value=''>---Select a Session---</option>
                    {uninvoicedSessionList.map(sesh => <option key={sesh.id} value={sesh.id}>{sesh.product.subject}</option>)}
                </select>
                <input type="submit" value="Create Invoice"></input>
                </form>
                <div className="no-session" onClick={()=>setSessionAlreadyExists(!sessionAlreadyExists)}>
                    Forgot to make a session?
                </div>
            </div>
            {!sessionAlreadyExists && <ScheduleSession fromInvoice={true}/>}

        </React.Fragment>
    )
}

export default CreateInvoice