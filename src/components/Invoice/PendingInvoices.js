import React from 'react'
import { getUserInfo, getInvoices } from '../../helpers'
import moment from 'moment'
import './PendingInvoices.less'

const PendingInvoices = () => {

    const {currentUserInfo} = getUserInfo()
    const invoices = getInvoices(currentUserInfo)
    console.log("INV", invoices)


    if (invoices.loading || !invoices.data) return <div> Loading...</div>
    return (
        <React.Fragment>
            <div>
            # Of invoices = {invoices.data && invoices.data.invoicesByCompany.length}
            </div>
            <div className='invoices-list-wrapper'>
            {invoices.data.invoicesByCompany.map(inv => 
                <div key= {inv.id} className = "invoice-wrapper">
                    <div>
                        Session Date: {moment(inv.session.date).format('MM-DD-YYYY')}
                    </div>
                    <div>
                        Invoiced On: {moment(inv.date).format('MM-DD-YYYY')}
                    </div>
                    <div>
                        Session Cost: ${(parseFloat(inv.session.length) * parseFloat(inv.session.product.rate)).toFixed(2)}
                    </div>
                    <div>
                        Tutor's Share: ${(parseFloat(inv.session.length) * parseFloat(inv.session.product.rate) * parseFloat(inv.session.product.tutorshare)/100).toFixed(2)}
                    </div>
                    <div>
                        Tutor Paid: {inv.tutorpaid ? "yes" : "no"}
                    </div>
                    <div>
                        Student Paid: {inv.studentpaid ? "yes" : "no"}
                    </div>
                </div>
            )}
            </div>

        </React.Fragment>
    )
}

export default PendingInvoices