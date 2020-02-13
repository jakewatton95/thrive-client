import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getUserInfo, getInvoices } from '../../helpers'
import ErrorPage from '../ErrorPage/ErrorPage'
import moment from 'moment'


const InvoiceLinks = () => {
    const {currentUserInfo} = getUserInfo()
    const {role} = currentUserInfo

    const invoices = getInvoices(currentUserInfo) //change to getpending invoices
    let invoiceList = []
    // console.log("INV", invoices)

    if (!role) return <ErrorPage/>
    if (invoices.loading || !invoices.data) return <div> Loading...</div>
    else {
        invoiceList = invoices.data.invoicesByCompany || invoices.data.invoicesByStudent || invoices.data.invoicesByTutor
        invoiceList = role == 'Admin' ? invoiceList.filter(inv => !inv.studentpaid || !inv.tutorpaid) :
                      role == 'Tutor' ? invoiceList.filter(inv => !inv.tutorpaid) : 
                      role == 'Student' ? invoiceList.filter(inv=> !inv.tutorpaid) : []
        }

    return (
        <React.Fragment>
            {role != 'Student' &&
                <NavLink to="/dashboard/invoice/create" activeClassName="active-tab" className="nav-link">
                    Create
                </NavLink> 
            }
            <NavLink to="/dashboard/invoice/pending" activeClassName="active-tab" className="nav-link">
                Pending ({invoiceList.filter(inv => moment(inv.date) > moment().startOf('day').subtract(1, 'week')).length})
            </NavLink>
            <NavLink to="/dashboard/invoice/overdue"  exact={true} activeClassName="active-tab" className="nav-link">
                Overdue ({invoiceList.filter(inv => moment(inv.date) < moment().startOf('day').subtract(1, 'week')).length})
            </NavLink>
            <NavLink to="/dashboard/invoice/history"  exact={true} activeClassName="active-tab" className="nav-link">
                History
            </NavLink>
        </React.Fragment>
    )
}

export default InvoiceLinks