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

export const createStudentAndUser = `mutation CreateStudent(
        $email: String!
        $name: String!
        $companyid: Int!
        $phone: String!
        ){
            createStudentAndUser(input: {email: $email, name: $name, companyid: $companyid, phone: $phone}) {
                id
                name
                phone
                user{
                    email
                    id
                    company {
                        id
                        name
                        address
                    }
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

export const createTutorAndUser = `mutation CreateTutorAndUser(
        $email: String!
        $name: String!
        $companyid: Int!
        $phone: String!
        ){
            createTutorAndUser(input: {email: $email, name: $name, companyid: $companyid, phone: $phone}) {
                id
                name
                phone
                user{
                    email
                    id
                    company {
                        id
                        name
                        address
                    }
                }
            }
        }`;

export const createProduct = `mutation CreateProduct(
        $tutorid: Int!
        $studentid: Int!
        $rate: Float!
        $subject: String!
        $tutorshare: Float!
        $companyid: Int!)
        {
            createProduct(input: {tutorid: $tutorid, studentid:$studentid, rate: $rate, subject: $subject, tutorshare: $tutorshare, companyid: $companyid}){
                id
                rate
                tutorshare
                subject
                active
                student {
                    id
                    name
                }
                tutor {
                    id
                    name
                }
            }
        }`;

export const createSession = `mutation CreateSession(
    $productid: Int!
    $date: String!
    $length: Float!
    $location: String!
    $invoiced: Boolean
    $noteid: Int
    $studentnoteid: Int
    $tutornoteid: Int
    $studentconfirmed: Boolean
    $tutorconfirmed: Boolean) {
        createSession(input: {
            productid: $productid,
            date: $date,
            length: $length,
            location: $location,
            invoiced: $invoiced,
            noteid: $noteid,
            studentnoteid: $studentnoteid,
            tutornoteid: $tutornoteid,
            studentconfirmed: $studentconfirmed,
            tutorconfirmed: $tutorconfirmed
        }){
            id
            date
            length
            location
            studentconfirmed
            tutorconfirmed
            invoiced
            product {
                subject
                student {
                    name
                }
                tutor {
                    name
                }
            }
        }
    }`;


export const setInvoicedTrue = `mutation setInvoicedTrue($sessionid: Int!) {
        setInvoicedTrue(input: {sessionid: $sessionid}){
            id
            date
            length
            location
            studentconfirmed
            tutorconfirmed
            invoiced
            product{
              subject
              student{
                name
              }
              tutor {
                name
              }
            }
          }
    }`;


export const createInvoice = `mutation CreateInvoice(
    $sessionid: Int!
    $date: String
    $studentpaid: Boolean
    $tutorpaid: Boolean) {
        createInvoice(input: {
            sessionid: $sessionid,
            date: $date,
            studentpaid: $studentpaid,
            tutorpaid: $tutorpaid
        }){
            id
            date
            studentpaid
            tutorpaid
            session{
              date
              length
              product {
                rate
                tutorshare
                subject
                student
                {
                  name
                  user {
                    email
                  }
                }
                tutor {
                  name
                  user {
                    email
                  }
                }
              }
            }
          }
    }`

    export const updateInvoicePaymentMutation = `mutation updateInvoicePayment(
        $invoiceid: Int!
        $studentpaid: Boolean
        $tutorpaid: Boolean) {
            updateInvoicePayment(input: {
                invoiceid: $invoiceid,
                studentpaid: $studentpaid,
                tutorpaid: $tutorpaid
            }){
                id
                studentpaid
                tutorpaid
              }
        }`