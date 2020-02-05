import {useApolloClient, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { student, tutor, students, tutors, products, sessions } from './graphql/queries'

const GET_USER_INFO = gql`
{
    currentUserInfo{
        id
        email
        role
        company{
            id
            name
            address
        }
    }
}`

export const getUserInfo = () => {
    const client = useApolloClient()
    const retData = client.readQuery({query: GET_USER_INFO})
    return retData;
}

export const getStudentList = userInfo => {
    if (userInfo.role == 'Admin') {
        return () => useQuery(gql(students), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
    }
}

export const getTutorList = userInfo => {
    if (userInfo.role == 'Admin') {
        return () => useQuery(gql(tutors), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
    }
}

export const getProductList = userInfo => {
    if (userInfo.role == 'Admin') {
        return () => useQuery(gql(products), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
    }
}

export const getSingleTutor = ID => {
    return () => useQuery(gql(tutor), {
        variables: {
            id: parseInt(ID)
        }
    })
}

export const getSingleStudent = ID => {
    return () => useQuery(gql(student), {
        variables: {
            id: parseInt(ID)
        }
    })
}

export const getSessionList = userInfo => {
    if (userInfo.role == 'Admin') {
        return () => useQuery(gql(sessions), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
    }
}