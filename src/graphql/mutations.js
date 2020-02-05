export const createUser = `mutation CreateUser(
    $email: String!
    $role: Role!
    $companyid: Int!
  ) {
    createUser(input: {email: $email, role: $role, companyid: $companyid}) {
      id
      email
      role
      company{
          id
          name
          address
      }
    }
  }
  `;

  export const createStudent = `mutation CreateStudent(
      $email: String!
      $name: String!
      $companyid: Int!
      $phone: String!
      $userid: Int!
      ) {
          createStudent(input: {email: $email, name: $name, companyid: $companyid, phone: $phone, userid: $userid}) {
              id
              name
              email
              phone
              company {
                  id
                  name
                  address
              }
        }
    }`;

    export const createTutor = `mutation CreateTutor(
        $email: String!
        $name: String!
        $companyid: Int!
        $phone: String!
        $userid: Int!
        ) {
            createTutor(input: {email: $email, name: $name, companyid: $companyid, phone: $phone, userid: $userid}) {
                id
                name
                email
                phone
                company {
                    id
                    name
                    address
                }
          }
      }`;

