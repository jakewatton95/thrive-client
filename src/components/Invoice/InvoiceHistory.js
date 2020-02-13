import React, { useState } from 'react'
import { getUserInfo, getInvoices } from '../../helpers'
import moment from 'moment'
import SingleInvoice from './SingleInvoice'

const InvoiceHistory = () => {

    const {currentUserInfo} = getUserInfo()
    const invoices = getInvoices(currentUserInfo) //change to getpending invoices
    // console.log("INV", invoices)
    let invoiceList = []


    const [startDate, setStartDate] = useState(moment().startOf('month').subtract(1, 'month'))
    const [endDate, setEndDate] = useState(moment().endOf('day'))

    if (invoices.loading || !invoices.data) return <div> Loading...</div>
    else {
        invoiceList = invoices.data.invoicesByCompany || invoices.data.invoicesByStudent || invoices.data.invoicesByTutor
    }
    return (
        <React.Fragment>
            <div>Select a date range and see weekly invoices</div>
            <div>Showing invoices from {moment().startOf('day').subtract(1, 'week').format('MM-DD-YYYY')} - {moment().format('MM-DD-YYYY')}</div>
            <div>
            # Of invoices = {invoiceList.length}
            </div>
            <div className='invoices-list-wrapper'>
            {invoiceList.map(inv => 
                <SingleInvoice key={inv.id} invoice ={inv}/>
            )}
            </div>

        </React.Fragment>
    )
}

export default InvoiceHistory