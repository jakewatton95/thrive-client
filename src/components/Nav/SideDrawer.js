import React from 'react';
import './SideDrawer.css';
import StudentLinks from './StudentLinks'
import TutorLinks from './TutorLinks'
import AdminLinks from './AdminLinks'

const SideDrawer = props => {
	let drawerClasses = 'side-drawer';
	if (props.show) {
		drawerClasses = 'side-drawer open';
	}
	return (
		<nav className={drawerClasses}>
			    {props.user === "student" && <StudentLinks toggle={props.toggle}/>}
                {props.user === "tutor" && <TutorLinks toggle={props.toggle}/>}
                {props.user === "admin" && <AdminLinks toggle={props.toggle} />}
		</nav>
	);
};

export default SideDrawer;
