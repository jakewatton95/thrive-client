export const storeUserInfo = userInfo => {
    return {
        type: "SET_USER_INFO",
        payload: userInfo
    }
}

export const storeSessions = sessions => {
    return {
        type: "SET_SESSIONS",
        payload: sessions
    }
}

export const storeBillings = billings => {
    return {
        type: "SET_BILLINGS",
        payload: billings
    }
}

export const storeProducts = products => {
    return {
        type: "SET_PRODUCTS",
        payload: products
    }
}

export const storePayments = payments => {
    return {
        type: "SET_PAYMENTS",
        payload: payments
    }
}

export const storeStudentID = ID => {
    return {
        type: "SET_STUDENT_ID",
        payload: ID
    }
}

export const storeStudents = students => {
    return {
        type: "SET_STUDENTS",
        payload: students
    }
}

export const storeTutors = tutors => {
    return {
        type: "SET_TUTORS",
        payload: tutors
    }
}

export const storeTutorID = ID => {
    return {
        type: "SET_TUTOR_ID",
        payload: ID
    }
}

export const addProduct = product => {
    return {
        type : "ADD_PRODUCT",
        payload: product
    }
}

export const addSession = session => {
    return {
        type: "ADD_SESSION",
        payload: session
    }
}

export const addPayment = payment => {
    return {
        type: "ADD_PAYMENT",
        payload: payment
    }
}