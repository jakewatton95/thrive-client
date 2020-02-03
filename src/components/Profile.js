import React, { useState } from 'react'
import UpcomingSessions from './Sessions/UpcomingSessions'
import './Profile.less'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NoPicLogo from '../media/user-profile-no-pic.png'
import NoPicLogoOrange from '../media/user-profile-no-pic-orange.png'
import moment from 'moment'
import {addPayment} from '../store/actions/actions'

const Profile = ({profileType}) => {
    let tutorID, studentID 
    const { ID } = useParams()
    const userRole = useSelector(state=> state.userInfo.UserType)

    if (profileType == "Tutor")
        tutorID = ID

    if (profileType == "Student")
        studentID = ID

        const generateTutorList = () => {
            //tutor - {TutorID: ID, Name: String, Email: String, Phone: Int, Subjects: [String]}
            let tutorList = []
            useSelector(state => state.products).map(product => {
                    const arrObj = tutorList.find(tutor => tutor.TutorID == product.TutorID)
                    let newObj = {TutorID: product.TutorID, Name: product.Tutor, Email: product.TutorEmail, Phone: product.TutorPhone, Subject: [product.Subject]}
                    if (arrObj) {
                        tutorList = tutorList.map(tutor => tutor.TutorID == product.TutorID ? {...tutor, Subject: [...tutor.Subject, product.Subject]} : student)
                    } else {
                        tutorList.push(newObj)
                    }
                }
            )
            console.log(tutorList)
            return tutorList
        }   

    const getTutors = () => {
        if (profileType == 'Tutor') {
            if (userRole == 'Admin') 
                return useSelector(state => state.tutors) 
            else 
                return generateTutorList()
        }
        return null
    }

    const generateStudentList = () => {
        //student - {StudentID: ID, Name: String, Email: String, Phone: Int, Subjects: [String]}
        let studentList = []
        useSelector(state => state.products).map(product => {
                const arrObj = studentList.find(student => student.StudentID == product.StudentID)
                let newObj = {StudentID: product.StudentID, Name: product.Student, Email: product.StudentEmail, Phone: product.StudentPhone, Subject: [product.Subject]}
                if (arrObj) {
                    studentList = studentList.map(student => student.StudentID == product.StudentID ? {...student, Subject: [...student.Subject, product.Subject]} : student)
                } else {
                    studentList.push(newObj)
                }
            }
        )
        console.log(studentList)
        return studentList
    }
    

    const getStudents = () => {
        if (profileType == 'Student') {
            if (userRole == 'Admin') 
                return useSelector(state => state.students) 
            else 
                return generateStudentList()
        }
        return null
    }

    const dispatch = useDispatch()
    const tutors = getTutors()
    const students = getStudents()
    const sessions = useSelector(state => state.sessions)
    const [paymentAmount, setPaymentAmount] = useState(100)
    const tutor = tutors && tutors.find(tutor => tutor.TutorID == tutorID)
    const student = students && students.find(student => student.StudentID == studentID)
    /*const recordPayment = e => {
        e.preventDefault()
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=" + tutorID + "&amount=" +  paymentAmount
        fetch(endpoint, {method: "POST"})
        .then(response => response.json())
        .then(response => {
            const paymentObject = {
                PaymentID: response.insertId,
                StudentID: null,
                Amount: parseFloat(paymentAmount),
                TutorID: tutorID,
                Date: moment().toISOString()
            }
            dispatch(addPayment(paymentObject))
            alert("Payment Logged")
        })
        .catch(err => console.log("Error Recording Payment:" + err))
    }*/
    let name, email, phone, image
    if (tutor) {
        name = tutor.Name
        email = tutor.Email
        phone = tutor.Phone
        image = NoPicLogo
    } else if (student) {
        name = student.Name
        email = student.Email
        phone = student.Phone
        image = NoPicLogoOrange
    }
    
    return (
        tutor || student ? 
        <React.Fragment>
            <div className = "profile-container">
                <img className="profile-pic" src={image} />
                <div className={`profile-name ${profileType.toLowerCase()}`}>{name}</div>
                <div className = "profile-email"> {email} </div>
                <div className = "profile-phone"> {`+1-${phone.slice(0,3)}-${phone.slice(3,6)}-${phone.slice(6,10)}`} </div>
            </div>
        </React.Fragment> : null //Should have a loading screen before we find the tutor
    )
}
/*
class TutorProfile extends Component {
    constructor() {
        super()
    
        this.state = {
            tutorID:props.match.params.tutorID,
            paymentAmount : 100,
            addedPayment: 0,
        }
        this.getTutor = this.getTutor.bind(this)
        this.getAmountOwed=this.getAmountOwed.bind(this)
        this.getAmountPaid=this.getAmountPaid.bind(this)
        this.recordPayment = this.recordPayment.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    recordPayment(e){
        e.preventDefault()
        let endpoint = "https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments?tutorID=" + this.state.tutorID + "&amount=" +  this.state.paymentAmount
        fetch(endpoint, {method: "POST"})
        .then(() => {
            alert("Payment Logged")
            this.setState({
                addedPayment: parseFloat(this.state.addedPayment) + parseFloat(this.state.paymentAmount),
                paymentAmount: 100
            })
        })
        .catch(err => console.log("Error Recording Payment:" + err))
    }
    
    handleChange(e){
        let {id, value} = e.target
        if (id === 'payment'){
            this.setState({
                paymentAmount: value
            })
        }
    }
    getTutor(){
        return this.props.tutors.find(tutor => tutor.TutorID == this.state.tutorID)
    }
    getAmountPaid(){
        let totalAmount = this.props.payments.filter(payment => payment.TutorID == this.state.tutorID).reduce((total, payment) => total += payment.Amount, 0)
        return totalAmount + this.state.addedPayment        
    }
    getAmountOwed(){
        let amountOwed = this.props.billings.filter(billing => billing.TutorID == this.state.tutorID && Date.now() > Date.parse(billing.date)).reduce((total, billing) => total+= billing.Rate * (billing.TutorShare/100) * billing.SessionLength, 0)
        return amountOwed        
    }
    render() {
        let tutor = this.getTutor()
        let amountOwed = this.getAmountOwed()
        let amountPaid = this.getAmountPaid()
        let {sessions} = this.props
        return (
            <React.Fragment>
                <h2> Viewing info for {tutor ? tutor.Name : null}</h2>
                <div> Email: {tutor ? tutor.Email : null} </div>
                <div> Phone: {tutor ? tutor.Phone : null} </div>
                <div className="amountOwed"> Total Amount Owed:  ${amountOwed.toFixed(2)}</div> 
                <div className="amountPaid"> Total Amount Paid:  ${amountPaid.toFixed(2)}</div> 
                {amountOwed > amountPaid ? <div> You owe {tutor.Name} ${(amountOwed - amountPaid).toFixed(2)}  </div> : null}
                <div> Record a payment: <form onSubmit = {this.recordPayment} ><input type="number" min="0.01" step = ".01" value = {this.state.paymentAmount} onChange = {this.handleChange} id="payment"/> $ <button> Submit </button></form></div>
                <UpcomingSessions userRole = "Tutor" sessions={sessions} secondaryRole="Admin" tutorID={this.state.tutorID}/>
            </React.Fragment>
        )
    }
}*/
export default Profile