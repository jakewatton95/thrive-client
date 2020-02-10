import {useApolloClient, useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { adminByUser, student, tutor, students, tutors, products, sessions, productsByStudent, productsByTutor,
        sessionsByStudent, sessionsByTutor, productsByTutor as studentsByTutor, productsByStudent as tutorsByStudent, 
        tutorByUser, studentByUser} from './graphql/queries'
import {createSession} from './graphql/mutations'

const GET_USER_INFO = gql`
{
    currentUserInfo @client{
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

export const getStudentInfo = userInfo => {
    return useQuery(gql(studentByUser), {
        variables: {
            userid: parseInt(userInfo.id)
        }
    })
}

export const getTutorInfo = userInfo => {
    return useQuery(gql(tutorByUser), {
        variables: {
            userid: parseInt(userInfo.id)
        }
    })
}

export const getAdminInfo = userInfo => {
    return useQuery(gql(adminByUser), {
        variables: {
            userid: parseInt(userInfo.id)
        }
    })
}


export const getStudentList = userInfo => {
    if (userInfo.role == 'Admin') {
        return () => useQuery(gql(students), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
    /* note that because of the way my DB is set up, tutors and students are related via products
       so the studentsByTutor query really just finds the products of the student and then 
       we modify it into a list of tutors*/
    } else if (userInfo.role == 'Tutor') {
        return () => useQuery(gql(studentsByTutor), {
            variables: {userid: parseInt(userInfo.id)}
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
    /* note that because of the way my DB is set up, tutors and students are related via products
       so the studentsByTutor query really just finds the products of the student and then 
       we modify it into a list of tutors*/
    } else if (userInfo.role == 'Student') {
        return () => useQuery(gql(tutorsByStudent), {
            variables: {userid: parseInt(userInfo.id)}
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
    } else if (userInfo.role == 'Student'){
        return () => useQuery(gql(productsByStudent), {
            variables: {
                userid: parseInt(userInfo.id)
            }
        })
    } else if (userInfo.role == 'Tutor'){
        return () => useQuery(gql(productsByTutor), {
            variables: {
                userid: parseInt(userInfo.id)
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
    } else if (userInfo.role == 'Student'){
        return () => useQuery(gql(sessionsByStudent), {
            variables: {
                userid: parseInt(userInfo.id)
            }
        })
    } else if (userInfo.role == 'Tutor'){
        return () => useQuery(gql(sessionsByTutor), {
            variables: {
                userid: parseInt(userInfo.id)
            }
        })
    }
}

export const getUninvoicedSessions = userInfo => {
    return useQuery(gql(sessions), {
        variables: {
            companyid: parseInt(userInfo.company.id)
        }
    })
}

export const addSession = userInfo => {
        return useMutation(gql(createSession), {
            onCompleted: () => alert("Successfully Added Session"),
            onError: err => {
                alert("There was an error adding your product. Please try again or tell your administrator.")
                console.log(err)
            },  
            update: (cache, {data: {createSession}}) => {
                try {
                    if (userInfo.role == "Admin") {
                        const { sessionsByCompany } = cache.readQuery({query: gql(sessions), variables: {companyid: parseInt(userInfo.company.id)}});
                        cache.writeQuery({
                            query: gql(sessions),
                            variables: {companyid: parseInt(userInfo.company.id)},
                            data: {sessionsByCompany: sessionsByCompany.concat([createSession])},
                        });
                    } else if (userInfo.role == "Student") {
                        const { sessionsByStudent: cacheResult } = cache.readQuery({query: gql(sessionsByStudent), variables: {userid: parseInt(userInfo.id)}});
                        cache.writeQuery({
                            query: gql(sessionsByStudent),
                            variables: {userid: parseInt(userInfo.id)},
                            data: {sessionsByStudent: cacheResult.concat([createSession])},
                        });
                    } else if (userInfo.role == "Tutor") {
                        const { sessionsByTutor:cacheResult } = cache.readQuery({query: gql(sessionsByTutor), variables: {userid: parseInt(userInfo.id)}});
                        cache.writeQuery({
                            query: gql(sessionsByTutor),
                            variables: {userid: parseInt(userInfo.id)},
                            data: {sessionsByTutor: cacheResult.concat([createSession])},
                        });
                    }
                } catch {

                }
            }
        })
}