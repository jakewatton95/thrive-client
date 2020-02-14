import React from 'react'
import { getUserInfo, getInvoices } from '../../helpers'
import moment from 'moment'
import SingleInvoice from './SingleInvoice'

/* Unpaid Invoices less than a week old */
const PendingInvoices = () => {

    const {currentUserInfo} = getUserInfo()
    const invoices = getInvoices(currentUserInfo) //change to getpending invoices
    let invoiceList = []
    // console.log("INV", invoices)

    if (invoices.loading || !invoices.data) return <div> Loading...</div>
    else {
        invoiceList = invoices.data.invoicesByCompany.filter(inv => !inv.studentpaid || !inv.tutorpaid) || invoices.data.invoicesByStudent.filter(inv => !inv.studentpaid) || invoices.data.invoicesByTutor.filter(inv => !inv.tutorpaid)
        invoiceList = invoiceList.filter(inv => moment(inv.date) > moment().startOf('day').subtract(1, 'week'))
    }
    return (
        <React.Fragment>
            <div>Pending invoices are unpaid invoices from the past week</div>
            <div>Showing invoices from {moment().startOf('day').subtract(1, 'week').format('MM-DD-YYYY')} - {moment().format('MM-DD-YYYY')}</div>
            <div className='invoices-list-wrapper'>
            {invoiceList.map(inv => 
                <SingleInvoice key={inv.id} invoice ={inv}/>
            )}
            </div>

        </React.Fragment>
    )
}

export default PendingInvoices