import gql from 'graphql-tag'

export const GET_USER_INFO = gql`
query CurrentUser {
    currentUserInfo {
        id
        email
        role
        company {
            id
            name
            address
        }
    }
}`;