import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import './Dashboard.less'
import tutorBackground1 from '../../media/tutor_pic_1.png'
import tutorBackground2 from '../../media/tutor_pic_2.png'
import invoiceBackground1 from '../../media/invoice_pic_1.png'
import schedulePic from '../../media/schedule_pic_1.png'
import schedulePicSkinny from '../../media/calendar_skinny.png'
import tutorBackgroundSkinny from'../../media/tutoring_pic_skinny.png'
import {isMobile} from 'react-device-detect';
import { useSelector } from 'react-redux'

const Dashboard = () => {
    let history = useHistory()
    let [loading, setLoading] = useState(true)
    const userRole = useSelector(state => state.userInfo.UserType)
    let link1
    const link2 = '/dashboard/scheduleSession'
    const link3 = '/dashboard/sessions'
    const link4 = '/dashboard/invoices'
    if (userRole == 'Admin') {
        link1 = '/dashboard/addProduct'
    } else if (userRole == 'Student') {
        link1= '/dashboard/tutors'
    } else if (userRole =='Tutor') {
        link1 = '/dashboard/students'
    }

    useEffect(() => {
        let isCancelled = false
        setTimeout(() => !isCancelled && setLoading(false),300)

        return () => {
            isCancelled = true;
        }
    }, [])
    
return loading ? null : //note, added the timing event because of the sidebar slide effect
 ( 
    <div className="home-container">
        <div className="home-row">
            <div className="cell" onClick = {()=>history.push(link1)} style={{backgroundImage: `url(${isMobile? tutorBackgroundSkinny:tutorBackground2})`, backgroundSize: 'cover'}}>
                <div className="layer">
                    <div className = "cell-text">
                        {userRole == "Admin" ? 'Create Student-Tutor Match' :
                            userRole == "Student" ? 'View Tutors' : 'View Students'}
                    </div>                
                </div>
            </div>
            <div className="cell right" onClick = {()=>history.push(link2)} style={{backgroundImage: `url(${tutorBackground1})`, backgroundSize: 'cover'}}>
                <div className="layer">
                    <div className = "cell-text">
                        Schedule Session
                    </div>
                </div>
            </div>
        </div>
        <div className="home-row bottom">
            <div className="cell" onClick = {()=>history.push(link3)} style={{backgroundImage: `url(${isMobile? schedulePicSkinny:schedulePic})`, backgroundSize: 'cover'}}>
                <div className="layer">
                    <div className = "cell-text">
                        View Calendar
                    </div>
                </div>
            </div>
            <div className="cell right" onClick={()=>history.push(link4)} style={{backgroundImage: `url(${invoiceBackground1})`, backgroundSize: 'cover'}}>
                <div className = "layer">
                    <div className = "cell-text">
                            Check Invoices
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

    
export default Dashboard