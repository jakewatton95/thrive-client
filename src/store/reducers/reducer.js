const initialState = {
    userInfo: {},
    sessions: [],
    payments: [],
    billings: [],
    products: [],
    students: [],
    tutors: [],
    studentID: null,
    tutorID: null
}

const reducer = (state = initialState, action) => {
    const {type, payload} = action
    const newState = {...state}
    switch (type) {
        case "SET_USER_INFO":
            newState.userInfo = payload
            newState.num = 100
            break
        case "SET_BILLINGS":
            newState.billings = payload
            break
        case "SET_PRODUCTS":
            newState.products = payload
            break
        case "SET_SESSIONS":
            newState.sessions = payload
            break
        case "SET_PAYMENTS":
            newState.payments = payload
            break
        case "SET_STUDENT_ID":
            newState.studentID = payload
            break
        case "SET_STUDENTS":
            newState.students = payload
            break
        case "SET_TUTORS":
            newState.tutors = payload
            break
        case "SET_TUTOR_ID": 
            newState.tutorID = payload
            break
        case "ADD_PRODUCT":
            newState.products = [...newState.products, payload]
            break
        case "ADD_SESSION":
            newState.sessions = [...newState.sessions, payload]
            break
    }

    return newState
}

export default reducer