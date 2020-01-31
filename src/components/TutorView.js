import React, { useState } from 'react'
//import './ViewWithTable.css'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './UserView.less'
import NoPicLogo from '../media/user-profile-no-pic.png'

const TutorView = () => {

    const generateTutorList = () => {
        //tutor - {TutorID: ID, Name: String, Email: String, Phone: Int, Subjects: [String]}
        let tutorList = []
        useSelector(state => state.products).map(product => {
                const arrObj = tutorList.find(tutor => tutor.TutorID == product.TutorID)
                let newObj = {TutorID: product.TutorID, Name: product.Tutor, Email: product.TutorEmail, Phone: product.TutorPhone, Subject: [product.Subject]}
                if (arrObj) {
                    tutorList = tutorList.map(tutor => tutor.TutorID == product.TutorID ? {...tutor, Subject: [...tutor.Subject, product.Subject]} : student)
                } else {
                    tutorList.push(newObj)
                }
            }
        )
        console.log(tutorList)
        return tutorList
    }

    const [filterName, setFilterName] = useState('')
    const userRole = useSelector(state=> state.userInfo.UserType)
    const tutors = userRole == 'Admin' ? useSelector(state => state.tutors) : 
        generateTutorList()
    const history = useHistory()

    return (
        <React.Fragment>
            <form>
                <label>Search By Name: </label>
                <input id='name' type="text" value={filterName} onChange={e => setFilterName(e.target.value)}></input>
            </form>
            <div className= "profile-list-title">
                Click on a Tutor For More Information
            </div>
            <div className = "profile-list-container">
                {filterName === '' ? tutors.map(tutor => 
                    <div className="single-profile-container" key={tutor.TutorID}>
                        <img className="profile-pic" src={NoPicLogo} onClick = {() => history.push(`/dashboard/tutors/${tutor.TutorID}`)} />
                        <div><NavLink to={"/dashboard/tutors/" + tutor.TutorID} exact={true}> {tutor.Name}</NavLink></div>
                    </div>
                    ) :
                    tutors.filter(tutor => tutor.Name.toLowerCase().includes(filterName.toLowerCase())).map(tutor => 
                     <div className="single-profile-container" key={tutor.TutorID}>
                        <img className="profile-pic" src={NoPicLogo} onClick = {() => history.push(`/dashboard/tutors/${tutor.TutorID}`)} />
                        <div><NavLink to={"/dashboard/tutors/" + tutor.TutorID} exact={true}> {tutor.Name}</NavLink></div>
                    </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}

export default TutorView