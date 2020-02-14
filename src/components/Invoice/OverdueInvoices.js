import React from 'react'
import { getUserInfo, getInvoices } from '../../helpers'
import moment from 'moment'
import SingleInvoice from './SingleInvoice'

/* Unpaid Invoices over a week old */
const OverdueInvoices = () => {

    const { currentUserInfo } = getUserInfo()
    const invoices = getInvoices(currentUserInfo) //change to overdue invoices 
    // console.log("INV", invoices)
    let invoiceList = []

    if (invoices.loading || !invoices.data) return <div> Loading...</div>
    else {
        invoiceList = invoices.data.invoicesByCompany.filter(inv => !inv.studentpaid || !inv.tutorpaid) || invoices.data.invoicesByStudent.filter(inv => !inv.studentpaid) || invoices.data.invoicesByTutor.filter(inv => !inv.tutorpaid)
        invoiceList = invoiceList.filter(inv => moment(inv.date) <= moment().startOf('day').subtract(1, 'week'))
    }
    return (
        <React.Fragment>
            <div>Overdue invoices are unpaid invoices past 1 week</div>
            <div>Showing unpaid invoices from before {moment().startOf('day').subtract(1, 'week').format('MM-DD-YYYY')}</div>
            <div className='invoices-list-wrapper'>
                {invoiceList.map(inv =>
                    <SingleInvoice key={inv.id} invoice={inv} />
                )}
            </div>
        </React.Fragment>

    )
}

export default OverdueInvoices