import React from 'react'
import InvoiceSecondaryNav from './InvoiceSecondaryNav'
import './Invoice.less'
import { Switch, Route } from 'react-router-dom'
import ErrorPage from '../ErrorPage/ErrorPage'
import CreateInvoice from './CreateInvoice'
import PendingInvoices from './PendingInvoices'
import OverdueInvoices from './OverdueInvoices'
import InvoiceHistory from './InvoiceHistory'
import {getUserInfo} from '../../helpers'

const InvoicingContainer = () => {

    const { role } = getUserInfo().currentUserInfo

    return (
        <React.Fragment>
            <InvoiceSecondaryNav />
            <Switch>
                {role != 'Student' && <Route exact path='/dashboard/invoice/create' component={CreateInvoice} />}
                <Route exact path='/dashboard/invoice/pending' component={PendingInvoices}/>
                <Route exact path='/dashboard/invoice/overdue' component={OverdueInvoices}/>
                <Route exact path='/dashboard/invoice/history' component={InvoiceHistory}/>
                <Route component={ErrorPage} />
            </Switch>
        </React.Fragment>

    )
}

export default InvoicingContainer