import React from 'react'
import InvoiceLinks from './InvoiceLinks'

const InvoiceSecondaryNav = () => {

    return (
        <React.Fragment>
            <nav className="secondary__nav">
                <div className="secondary__navigation_items">
                    <InvoiceLinks />
                </div>
            </nav>
        </React.Fragment>
        
    )
}

export default InvoiceSecondaryNav