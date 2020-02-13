import React from 'react'
import { getUserInfo, getAdminInfo, getStudentInfo, getTutorInfo } from '../../helpers'

const UserProfile = () => {

    const {currentUserInfo} = getUserInfo()
    const {role} = currentUserInfo
    const roleInfo = role == 'Admin'? getAdminInfo(currentUserInfo) : 
                        role == 'Student' ? getStudentInfo(currentUserInfo) :
                            role == 'Tutor' ? getTutorInfo(currentUserInfo) : null

    if (roleInfo && roleInfo.loading) return <div>loading...</div>
    return (
        <div className = "user-profile-container">
            <div>{`You are a${role == 'Admin' ? 'n ' + role : ' ' + role}.`}</div>
        </div>

    )
}

export default UserProfile