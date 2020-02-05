import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import TutorContainer from './TutorContainer'
import StudentContainer from './StudentContainer'
import AdminContainer from './AdminContainer'
import { storeUserInfo } from '../store/actions/actions'
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { userByEmail } from "../graphql/queries"
import {GET_USER_INFO} from "../graphql/cacheQueries"
import gql from 'graphql-tag'

const UserPortalContainer = () => {
    let history = useHistory()
    let [data, setData] = useState(null)

    const  [getUserInfoByEmail, {client}] = useLazyQuery(gql(userByEmail), {
        onCompleted: data => {
            client.writeData({data: {currentUserInfo: data.userByEmail}})
            setData(data)
        }, 
        onError: err => console.log(err)
    })

    useEffect(() => {

        Auth.currentAuthenticatedUser()
            .then(response => getUserInfoByEmail({variables: {email: response.attributes.email}}))
            .catch(err => {
                console.log(err)
                history.push("/sign_in")
            })
    }, [])

    return (
        <React.Fragment>
            {(data && data.userByEmail.role === 'Tutor') && <TutorContainer userinfo = {data.userByEmail}/>}
            {(data && data.userByEmail.role === 'Student') && <StudentContainer userinfo = {data.userByEmail}/>}
            {(data && data.userByEmail.role === 'Admin') && <AdminContainer userinfo = {data.userByEmail}/>}
        </React.Fragment>
    )
}

export default UserPortalContainer