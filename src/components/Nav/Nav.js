import React, { useState } from 'react';
import StudentLinks from './StudentLinks'
import TutorLinks from './TutorLinks'
import AdminLinks from './AdminLinks'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import menu_icon from '../../media/menu_icon.png'
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';

const Nav = (props) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <React.Fragment>
        <header className="toolbar">
            <nav className="toolbar__nav">
                <div className="toolbar__toggle-button">
                    <img src={menu_icon} onClick={() => setIsDrawerOpen(true)} className="toolbar__menu-icon" />
                </div>
                <NavLink to="/dashboard" className="toolbar__logo">
                    THRIVE LOGO
                </NavLink>
                <div className="toolbar__navigation-items">
                    {props.user === "student" && <StudentLinks />}
                    {props.user === "tutor" && <TutorLinks />}
                    {props.user === "admin" && <AdminLinks />}
                </div>
            </nav>
        </header>
        <SideDrawer user = {props.user} show={isDrawerOpen} toggle={() => setIsDrawerOpen(false)}/>
        {isDrawerOpen && <Backdrop click={() => setIsDrawerOpen(false)}/>}
        </React.Fragment>
    )
}

export default Nav