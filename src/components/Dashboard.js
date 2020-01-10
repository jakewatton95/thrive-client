import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import TutorContainer from '../containers/TutorContainer'
import StudentContainer from '../containers/StudentContainer'
import AdminContainer from '../containers/AdminContainer'

const Dashboard = () => {
    let history = useHistory()

    const [userInfo, setUserInfo] = useState({})

    const getUserRole = async (email) => {
        let userInfo = {};
        const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/users?email=" + email
        await fetch(endpoint)
            .then(response => userInfo = response.json())
            .catch(err => console.log("Error", err))
        return userInfo
    }

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(response => getUserRole(response.attributes.email))
            .then(response => setUserInfo(response))
            .catch(err => {
                console.log(err)
                history.push("/sign_in")
            })
    }, [])

    const signOut = () => {
        Auth.signOut()
            .then(history.push("/sign_in"))
    }

    return (
        <React.Fragment>
            {(userInfo && userInfo.UserType === 'Tutor') && <TutorContainer userInfo={userInfo} />}
            {(userInfo && userInfo.UserType === 'Student') && <StudentContainer userInfo={userInfo} />}
            {(userInfo && userInfo.UserType === 'Admin') && <AdminContainer userInfo={userInfo} />}
        </React.Fragment>
    )
}

export default Dashboard