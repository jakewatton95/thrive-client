import React, { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import TutorContainer from './TutorContainer'
import StudentContainer from './StudentContainer'
import AdminContainer from './AdminContainer'
import { useSelector, useDispatch} from 'react-redux'
import { storeUserInfo } from '../store/actions/actions'

const UserPortalContainer = () => {
    let history = useHistory()
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch();

    useEffect(() => {

        const getUserRole = async (email) => {
            const endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/users?email=" + email
            await fetch(endpoint)
                .then(response => response.json())
                .then(response => dispatch(storeUserInfo(response)))
                .catch(err => console.log("Error", err))
        }

        Auth.currentAuthenticatedUser()
            .then(response => getUserRole(response.attributes.email))
            .catch(err => {
                console.log(err)
                history.push("/sign_in")
            })
    }, [])

    return (
        <React.Fragment>
            {(userInfo && userInfo.UserType === 'Tutor') && <TutorContainer userInfo={userInfo} />}
            {(userInfo && userInfo.UserType === 'Student') && <StudentContainer />}
            {(userInfo && userInfo.UserType === 'Admin') && <AdminContainer />}
        </React.Fragment>
    )
}

export default UserPortalContainer