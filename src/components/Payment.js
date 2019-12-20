import React,{Component} from 'react'

class Payment extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        let {Amount, StudentID, TutorID} = this.props.paymentInfo
        let {viewing, userType, students, tutors, userRole} = this.props
        let dateFormatted = new Date(Date.parse(this.props.paymentInfo.Date)).toDateString()
        let student = students.filter(student => student.StudentID == StudentID)[0]
        let tutor = tutors.filter(tutor => tutor.TutorID == TutorID)[0]
        return (
            <React.Fragment>
                <tr>
                    <th> {dateFormatted} </th>
                    {userType !== "tutor" && userRole === "Admin" ? <th>{student ? student.Name : "N/A"}</th> : null} 
                    {userType !== "student" && userRole === "Admin" ? <th>{tutor ? tutor.Name : "N/A"}</th> : null} 
                    <th>{Amount}</th>
                </tr>
            </React.Fragment>
        )
    }
}


export default Payment