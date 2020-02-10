import React from 'react'
import { NavLink } from 'react-router-dom'
import { getUserInfo } from '../../helpers'
import ErrorPage from '../ErrorPage/ErrorPage'


const InvoiceLinks = () => {
    const {role} = getUserInfo().currentUserInfo
    
    if (!role) return <ErrorPage/>
    return (
        <React.Fragment>
            {role != 'Student' &&
                <NavLink to="/dashboard/invoice/create" activeClassName="active-tab" className="nav-link">
                    Create
                </NavLink> 
            }
            <NavLink to="/dashboard/invoice/pending" activeClassName="active-tab" className="nav-link">
                Pending
            </NavLink>
            <NavLink to="/dashboard/invoice/overdue"  exact={true} activeClassName="active-tab" className="nav-link">
                Overdue
            </NavLink>
            <NavLink to="/dashboard/invoice/history"  exact={true} activeClassName="active-tab" className="nav-link">
                History
            </NavLink>
        </React.Fragment>
    )
}

export default InvoiceLinks