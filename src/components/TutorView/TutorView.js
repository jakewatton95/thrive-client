import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import '../../styles/UserView.less'
import NoPicLogo from '../../media/user-profile-no-pic.png'
import { getUserInfo, getTutorList } from '../../helpers'

const TutorView = () => {

    const {currentUserInfo} = getUserInfo()
    const {role} = currentUserInfo
    const {data: tutorData, loading, errors: tutorErrors} = getTutorList(currentUserInfo)

    const [filterName, setFilterName] = useState('')
    const tutors = role == "Admin" ? (tutorData && tutorData.tutorsByCompany) : 
                        role == "Student" ? (tutorData && tutorData.productsByStudent.map(product => product.tutor)) : []
    const history = useHistory()
    
    if (loading) return <div> loading...</div>
    return (
        <React.Fragment>
            <form className = "search-name-form">
                <label>Search By Name: </label>
                <input id='name' type="text" value={filterName} onChange={e => setFilterName(e.target.value)}></input>
            </form>
            <div className= "profile-list-title">
                Click on a Tutor For More Information
            </div>
            <div className = "profile-list-container">
                {filterName === '' ? tutors.map(tutor => 
                    <div className="single-profile-container" key={tutor.id}>
                        <img className="profile-pic" src={NoPicLogo} onClick = {() => history.push(`/dashboard/tutors/${tutor.id}`)} />
                        <div><NavLink to={"/dashboard/tutors/" + tutor.id} exact={true}> {tutor.name}</NavLink></div>
                    </div>
                    ) :
                    tutors.filter(tutor => tutor.name.toLowerCase().includes(filterName.toLowerCase())).map(tutor => 
                     <div className="single-profile-container" key={tutor.id}>
                        <img className="profile-pic" src={NoPicLogo} onClick = {() => history.push(`/dashboard/tutors/${tutor.id}`)} />
                        <div><NavLink to={"/dashboard/tutors/" + tutor.id} exact={true}> {tutor.name}</NavLink></div>
                    </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}

export default TutorView