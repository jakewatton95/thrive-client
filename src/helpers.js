import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
    adminByUser, student, tutor, students, tutors, products, sessions, productsByStudent, productsByTutor,
    sessionsByStudent, sessionsByTutor, productsByTutor as studentsByTutor, productsByStudent as tutorsByStudent,
    tutorByUser, studentByUser, invoicesForAdmin, invoicesForStudent, invoicesForTutor
} from './graphql/queries'
import { createSession, createInvoice, setInvoicedTrue } from './graphql/mutations'

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
    const retData = client.readQuery({ query: GET_USER_INFO })
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
        return useQuery(gql(students), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
        /* note that because of the way my DB is set up, tutors and students are related via products
           so the studentsByTutor query really just finds the products of the student and then 
           we modify it into a list of tutors*/
    } else if (userInfo.role == 'Tutor') {
        return useQuery(gql(studentsByTutor), {
            variables: { userid: parseInt(userInfo.id) }
        })
    }
}

export const getTutorList = userInfo => {
    if (userInfo.role == 'Admin') {
        return useQuery(gql(tutors), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
        /* note that because of the way my DB is set up, tutors and students are related via products
           so the studentsByTutor query really just finds the products of the student and then 
           we modify it into a list of tutors*/
    } else if (userInfo.role == 'Student') {
        return useQuery(gql(tutorsByStudent), {
            variables: { userid: parseInt(userInfo.id) }
        })
    }
}

export const getProductList = userInfo => {
    if (userInfo.role == 'Admin') {
        return useQuery(gql(products), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
    } else if (userInfo.role == 'Student') {
        return useQuery(gql(productsByStudent), {
            variables: {
                userid: parseInt(userInfo.id)
            }
        })
    } else if (userInfo.role == 'Tutor') {
        return useQuery(gql(productsByTutor), {
            variables: {
                userid: parseInt(userInfo.id)
            }
        })
    }
}

export const getSingleTutor = ID => {
    return useQuery(gql(tutor), {
        variables: {
            id: parseInt(ID)
        }
    })
}

export const getSingleStudent = ID => {
    return useQuery(gql(student), {
        variables: {
            id: parseInt(ID)
        }
    })
}

export const getSessionList = userInfo => {
    if (userInfo.role == 'Admin') {
        return useQuery(gql(sessions), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
    } else if (userInfo.role == 'Student') {
        return useQuery(gql(sessionsByStudent), {
            variables: {
                userid: parseInt(userInfo.id)
            }
        })
    } else if (userInfo.role == 'Tutor') {
        return useQuery(gql(sessionsByTutor), {
            variables: {
                userid: parseInt(userInfo.id)
            }
        })
    }
}

export const getUninvoicedSessions = userInfo => { //TODO fix in apollo server so we can make a query spec for uninvoiced
    if (userInfo.role =='Admin') {
        return useQuery(gql(sessions), {
            variables: {
                companyid: parseInt(userInfo.company.id)
            }
        })
    } else if (userInfo.role == 'Tutor') {
        return useQuery(gql(sessionsByTutor), {
            variables: {
                userid: parseInt(userInfo.id)
            }
        })
    }

}

export const getInvoices = userInfo => {
    if (userInfo.role == 'Admin'){
        return useQuery(gql(invoicesForAdmin), {
            variables: {companyid: parseInt(userInfo.company.id)}
        })
    } else if (userInfo.role == 'Student'){
        return useQuery(gql(invoicesForStudent), {
            variables: {userid: parseInt(userInfo.id)}
        })
    } else if (userInfo.role == 'Tutor'){
        return useQuery(gql(invoicesForTutor), {
            variables: {userid: parseInt(userInfo.id)}
        })
    }
}

export const updateSessionInvoiced = (userInfo) => {
    return useMutation(gql(setInvoicedTrue), {
        onCompleted: data => console.log(data),
        onError: err => console.log("err", err)
    })
}

export const addInvoice = userInfo => {
    return useMutation(gql(createInvoice), {
        onCompleted: () => alert("Successfully Added Invoice"),
        onError: err => console.log("Error", err),
        update: (cache, {data: {createInvoice}}) => {
            try {
                if (userInfo.role == "Admin") {
                    const { invoicesByCompany } = cache.readQuery({ query: gql(invoicesForAdmin), variables: { companyid: parseInt(userInfo.company.id) } });
                    cache.writeQuery({
                        query: gql(invoicesForAdmin),
                        variables: { companyid: parseInt(userInfo.company.id) },
                        data: { invoicesByCompany: invoicesByCompany.concat([createInvoice]) }
                    });
                } else if (userInfo.role == "Tutor") {
                    const { invoicesByTutor } = cache.readQuery({ query: gql(invoicesForTutor), variables: { userid: parseInt(userInfo.id) } });
                    cache.writeQuery({
                        query: gql(invoicesForTutor),
                        variables: { userid: parseInt(userInfo.id) },
                        data: { invoicesByTutor: invoicesByTutor.concat([createInvoice]) }
                    });
                }
            } catch {
                console.log("Error or empty cache")
            }
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
        update: (cache, { data: { createSession } }) => {
            try {
                if (userInfo.role == "Admin") {
                    const { sessionsByCompany } = cache.readQuery({ query: gql(sessions), variables: { companyid: parseInt(userInfo.company.id) } });
                    cache.writeQuery({
                        query: gql(sessions),
                        variables: { companyid: parseInt(userInfo.company.id) },
                        data: { sessionsByCompany: sessionsByCompany.concat([createSession]) },
                    });
                } else if (userInfo.role == "Student") {
                    const { sessionsByStudent: cacheResult } = cache.readQuery({ query: gql(sessionsByStudent), variables: { userid: parseInt(userInfo.id) } });
                    cache.writeQuery({
                        query: gql(sessionsByStudent),
                        variables: { userid: parseInt(userInfo.id) },
                        data: { sessionsByStudent: cacheResult.concat([createSession]) },
                    });
                } else if (userInfo.role == "Tutor") {
                    const { sessionsByTutor: cacheResult } = cache.readQuery({ query: gql(sessionsByTutor), variables: { userid: parseInt(userInfo.id) } });
                    cache.writeQuery({
                        query: gql(sessionsByTutor),
                        variables: { userid: parseInt(userInfo.id) },
                        data: { sessionsByTutor: cacheResult.concat([createSession]) },
                    });
                }
            } catch {

            }
        }
    })
}