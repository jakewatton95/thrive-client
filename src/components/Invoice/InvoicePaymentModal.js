import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { updateInvoicePayment } from '../../helpers'

const InvoicePaymentModal = ({ showModal, invoice, hideModal }) => {

    const [studentPaid, setStudentPaid] = useState(invoice.studentpaid)
    const [tutorPaid, setTutorPaid] = useState(invoice.tutorpaid)
    const [callUpdateInvoicePayment, updateInvoicePaymentStatus] = updateInvoicePayment()

    const saveclicked =() => {
        if (studentPaid != invoice.studentpaid || tutorPaid != invoice.tutorpaid) {
            callUpdateInvoicePayment({variables: {invoiceid: parseInt(invoice.id), studentpaid: studentPaid, tutorpaid: tutorPaid}})
        }
    }

    const cancelClicked = () => {
        hideModal()
    }

    const toggleStudentPaid = () => {
        setStudentPaid(!studentPaid)
    }

    const toggleTutorPaid = () => {
        setTutorPaid(!tutorPaid)
    }

    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
                Record Payment
        </Modal.Header>
            <Modal.Body>
                <div>
                    <input type="checkbox" checked={studentPaid} onChange={toggleStudentPaid}></input>
                     {`Check if ${invoice.session.product.student.name} has paid`}
                </div>
                <div>
                    <input type="checkbox" checked={tutorPaid} onChange={toggleTutorPaid}></input>
                    {`Check if ${invoice.session.product.tutor.name} has been paid`}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={saveclicked}>Save</button>
                <button onClick={cancelClicked}>Cancel </button>
            </Modal.Footer>
        </Modal>
    )
}

export default InvoicePaymentModal