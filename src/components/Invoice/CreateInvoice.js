import React, { useState } from 'react'
import { getUserInfo, getUninvoicedSessions } from '../../helpers'
import ScheduleSession from '../ScheduleSession/ScheduleSession'

const CreateInvoice = () => {

    const {currentUserInfo} = getUserInfo()
    const sessions = getUninvoicedSessions(currentUserInfo)
    let uninvoicedSessionList = []

    const [invoiceSession, setInvoiceSession] = useState(-1)
    const [sessionAlreadyExists, setSessionAlreadyExists] = useState(true)
    //get List of uninvoiced sessions
    //give user a form to invoice session
    //confirm or deny that session was invoiced... set session invoiced to true and add invoice to table
    //ask user if they would like to invoice another session or see their current invoices

    if (sessions.loading) return <div>loading...</div>
    if (sessions.data) {
        uninvoicedSessionList = sessions.data.sessionsByCompany.filter(session=> !session.invoiced)
        console.log("USL", uninvoicedSessionList)
    }
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
            <form>
                <select required id="session" defaultValue=''>
                    <option disabled="disabled" value=''>---Select a Session---</option>
                    {uninvoicedSessionList.map(sesh => <option key={sesh.id}>{sesh.product.subject}</option>)}
                </select>
            </form>
        </React.Fragment>
    )
}

export default CreateInvoice