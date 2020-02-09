import React from 'react'
import { getUserInfo, getUninvoicedSessions } from '../../helpers'

const CreateInvoice = () => {

    const {currentUserInfo} = getUserInfo()
    const sessions = getUninvoicedSessions(currentUserInfo)
    let uninvoicedSessionList = []

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
                Create Invoice
            </div>
        </React.Fragment>
    )
}

export default CreateInvoice