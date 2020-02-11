import React, { useState } from 'react'
import { getUserInfo, getUninvoicedSessions, createNewInvoice } from '../../helpers'
import ScheduleSession from '../ScheduleSession/ScheduleSession'
import './CreateInvoice.less'

const CreateInvoice = () => {

    const {currentUserInfo} = getUserInfo()
    const sessions = getUninvoicedSessions(currentUserInfo)
    let uninvoicedSessionList = []
    const [callCreateInvoice, createInvoiceStatus] = createNewInvoice(currentUserInfo)


    const [invoiceSession, setInvoiceSession] = useState('')
    const [sessionAlreadyExists, setSessionAlreadyExists] = useState(true)
    //get List of uninvoiced sessions
    //give user a form to invoice session
    //confirm or deny that session was invoiced... set session invoiced to true and add invoice to table
    //ask user if they would like to invoice another session or see their current invoices

    const handleSubmit = e => {
        e.preventDefault()
        console.log(invoiceSession)
        callCreateInvoice({variables: {sessionid: parseInt(invoiceSession)}})
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
                <div className="title"> 
                    Create Invoice
                </div>
                <div className="subtitle">
                    Select your session and add a note
                </div>
                <div className="no-session" onClick={()=>setSessionAlreadyExists(!sessionAlreadyExists)}>
                    Forgot to make a session?
                </div>
            </div>
            {!sessionAlreadyExists && <ScheduleSession fromInvoice={true}/>}
            <form className = "new-invoice-form" onSubmit={handleSubmit}>
                <select required id="session" value={invoiceSession} onChange={e=>setInvoiceSession(e.target.value)}>
                    <option disabled={true} value=''>---Select a Session---</option>
                    {uninvoicedSessionList.map(sesh => <option key={sesh.id} value={sesh.id}>{sesh.product.subject}</option>)}
                </select>
                <input type="submit"></input>
            </form>
        </React.Fragment>
    )
}

export default CreateInvoice