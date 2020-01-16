import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideDrawer.css'
import StudentLinks from './StudentLinks'
import TutorLinks from './TutorLinks'
import AdminLinks from './AdminLinks'

const SideDrawer = props => {
	let drawerClasses = 'side-drawer'
	if (props.show) {
		drawerClasses = 'side-drawer open'
	}
	return (
		<React.Fragment>
			<nav className={drawerClasses}>
				<div className="side-drawer-logo">
					<NavLink onClick={props.toggle} to="/dashboard" className="nav-link">
						THRIVE LOGO
                	</NavLink>
				</div>
				{props.user === "student" && <StudentLinks toggle={props.toggle} />}
				{props.user === "tutor" && <TutorLinks toggle={props.toggle} />}
				{props.user === "admin" && <AdminLinks toggle={props.toggle} />}
			</nav>
		</React.Fragment>
	)
}

export default SideDrawer
