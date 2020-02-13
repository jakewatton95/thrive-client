export const userByEmail = `query User($email: String!) {
    userByEmail(email: $email) {
      id
      email
      role
      company {
          name
          address
          id
      }
    }
  }
  `;

  export const adminByUser = `query AdminByUser($userid: Int!)
  {
      adminByUserID(userid: $userid){
          id
          name
          phone
      }
  }`;

  export const tutorByUser = `query TutorByUser($userid: Int!)
  {
      tutorByUserID(userid: $userid){
          id
          name
          phone
      }
  }`;

  export const studentByUser = `query StudentByUser($userid: Int!)
  {
      studentByUserID(userid: $userid){
          id
          name
          phone
      }
  }`;


export const student = `query Student($id: Int!)
{
    studentByID(id: $id){
        id
        name
        phone
        user {
          email
        }
    }
}`;

export const students = `query Students($companyid: Int!)
{
    studentsByCompany(companyid: $companyid){
        id
        name
        phone
        user{
          email
        }
    }
}`;

export const tutor = `query Tutor($id: Int!)
{
    tutorByID(id: $id){
        id
        name
        phone
        user{
          email
        }
    }
}`;
export const tutors = `query Tutors($companyid: Int!)
{
    tutorsByCompany(companyid: $companyid){
        id
        name
        phone
        user{
          email
        }
    }
}`;

export const productsByStudent = `query productsByStudent($userid: Int!)
{
    productsByStudent(userid: $userid){
      id
      rate
      tutorshare
      subject
      active
      student{
        id
        name
      }
      tutor {
        id
        name
      }
  }
}`;

export const productsByTutor = `query productsByTutor($userid: Int!)
{
    productsByTutor(userid: $userid){
      id
      rate
      tutorshare
      subject
      active
      student{
        id
        name
      }
      tutor {
        id
        name
      }
  }
}`;

export const products = `query Products($companyid: Int!)
{
    productsByCompany(companyid: $companyid){
        id
        rate
        tutorshare
        subject
        active
        student{
          id
          name
        }
        tutor {
          id
          name
        }
    }
}`;

export const sessions = `query Sessions($companyid: Int!)
{
    sessionsByCompany(companyid: $companyid){
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


export const sessionsByTutor = `query SessionsByTutor($userid: Int!)
{
    sessionsByTutor(userid: $userid){
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

export const sessionsByStudent = `query SessionsByStudent($userid: Int!)
{
    sessionsByStudent(userid: $userid){
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

export const invoicesForAdmin = `query InvoicesForAdmin($companyid: Int!)
{
  invoicesByCompany(companyid: $companyid){
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

export const invoicesForStudent = `query InvoicesForStudent($userid: Int!)
{
  invoicesByStudent(userid: $userid){
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

export const invoicesForTutor = `query InvoicesForTutor($userid: Int!)
{
  invoicesByTutor(userid: $userid){
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

