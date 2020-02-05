import React from 'react'
import './Profile.less'
import { useParams } from 'react-router-dom'
import NoPicLogo from '../media/user-profile-no-pic.png'
import NoPicLogoOrange from '../media/user-profile-no-pic-orange.png'
import { getSingleStudent, getSingleTutor } from '../helpers'

const Profile = ({profileType}) => {
    //TODO CHECK THAT USER or TUTOR is associated with STUDENT 
    //IF NOT, push them to error page?
    const { ID } = useParams()
    let profileData = {data: null, loading: null, errors: null}

    if (profileType == 'Student') {
        profileData = getSingleStudent(ID)()
    } else if (profileType == 'Tutor') {
        profileData = getSingleTutor(ID)()
    }
    const tutor = profileType == 'Tutor' && profileData.data && profileData.data.tutorByID
    const student = profileType == 'Student' && profileData.data && profileData.data.studentByID

    let name, email, phone, image
    if (tutor) {
        name = tutor.name
        email = tutor.user.email
        phone = tutor.phone
        image = NoPicLogo
    } else if (student) {
        name = student.name
        email = student.user.email
        phone = student.phone
        image = NoPicLogoOrange
    }
    
    if (profileData.loading) return <div> loading...</div>
    return (
        tutor || student ? 
        <React.Fragment>
            <div className = "profile-container">
                <img className="profile-pic" src={image} />
                <div className={`profile-name ${profileType.toLowerCase()}`}>{name}</div>
                <div className = "profile-email"> {email} </div>
                <div className = "profile-phone"> {`+1-${phone.slice(0,3)}-${phone.slice(3,6)}-${phone.slice(6,10)}`} </div>
            </div>
        </React.Fragment> : null //Should have a loading screen before we find the tutor
    )
}
export default Profile