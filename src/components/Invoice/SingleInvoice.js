import React, { useState } from 'react'
import { getUserInfo } from '../../helpers'
import moment from 'moment'
import InvoicePaymentModal from './InvoicePaymentModal'

const SingleInvoice = ({ invoice: inv }) => {
    const { currentUserInfo } = getUserInfo()
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    return (
        <React.Fragment>
            <InvoicePaymentModal showModal={showPaymentModal} hideModal={() => setShowPaymentModal(false)} invoice={inv} />
            <div key={inv.id} className="invoice-wrapper">
                <div>
                    Session Date: {moment(inv.session.date).format('MM-DD-YYYY')}
                </div>
                <div>
                    Invoiced On: {moment(inv.date).format('MM-DD-YYYY')}
                </div>
                {currentUserInfo.role != 'Tutor' &&
                    <div>
                        Session Cost: ${(parseFloat(inv.session.length) * parseFloat(inv.session.product.rate)).toFixed(2)}
                    </div>
                }
                {currentUserInfo.role != 'Student' &&
                    <div>
                        {currentUserInfo.role == 'Admin' ? "Tutor's Share:" : "Payment:"} ${(parseFloat(inv.session.length) * parseFloat(inv.session.product.rate) * parseFloat(inv.session.product.tutorshare) / 100).toFixed(2)}
                    </div>
                }
                {currentUserInfo.role != 'Student' &&
                    <div>
                        {currentUserInfo.role == 'Admin' && 'Tutor'} Payment Status: {inv.tutorpaid ? "Paid" : "Waiting For Payment"}
                    </div>
                }
                {currentUserInfo.role != 'Tutor' &&
                    <div>
                        {currentUserInfo.role == 'Admin' && 'Student'} Payment Status: {inv.studentpaid ? "Paid" : "Waiting For Payment"}
                    </div>
                }
                {currentUserInfo.role == 'Admin' &&
                    <button onClick={() => setShowPaymentModal(true)}>
                        Record Payment
                </button>
                }
            </div>
        </React.Fragment>
    )



}

export default SingleInvoice