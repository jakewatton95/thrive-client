import React, { useState } from 'react'
//import './ViewWithTable.css'
import { NavLink, useHistory } from 'react-router-dom'
import './UserView.less'
import NoPicLogo from '../media/user-profile-no-pic.png'
import {useQuery} from '@apollo/react-hooks'
import { getUserInfo } from '../helpers'
import gql from 'graphql-tag'
import {tutors as tutorQuery} from '../graphql/queries'

const TutorView = () => {

    const {currentUserInfo} = getUserInfo()
    let {role} = currentUserInfo
    let tutorData = {data: null, loading: null, errors: null} 
    
    if (role == "Admin") {
        tutorData = useQuery(gql(tutorQuery), {
            variables: {companyid: parseInt(currentUserInfo.company.id)}
        })
    }

    const generateTutorList = () => {
        //tutor - {TutorID: ID, Name: String, Email: String, Phone: Int, Subjects: [String]}
        let tutorList = []
        // useSelector(state => state.products).map(product => {
        //         const arrObj = tutorList.find(tutor => tutor.TutorID == product.TutorID)
        //         let newObj = {TutorID: product.TutorID, Name: product.Tutor, Email: product.TutorEmail, Phone: product.TutorPhone, Subject: [product.Subject]}
        //         if (arrObj) {
        //             tutorList = tutorList.map(tutor => tutor.TutorID == product.TutorID ? {...tutor, Subject: [...tutor.Subject, product.Subject]} : student)
        //         } else {
        //             tutorList.push(newObj)
        //         }
        //     }
        // )
        // console.log(tutorList)
        return tutorList
    }

    const [filterName, setFilterName] = useState('')
    const tutors = (tutorData.data && tutorData.data.tutorsByCompany)
    const history = useHistory()
    if (tutorData.loading) return <div> loading...</div>
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