import React,{Component, useState} from 'react'
//import './ViewWithTable.css'
import {NavLink, useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './UserView.less'
import NoPicLogo from '../media/user-profile-no-pic-orange.png'

const StudentView = () => {

    const generateStudentArray = () => {
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

    const [filterName, setFilterName] = useState('')
    const userRole = useSelector(state=> state.userInfo.UserType)
    const students = userRole == 'Admin' ? useSelector(state => state.students) : 
        generateStudentArray()
    const history = useHistory();
    
    return (
        <React.Fragment>
        <form>
                <label>Search By Name: </label>
                <input id='name' type="text" value={filterName} onChange={e => setFilterName(e.target.value)}></input>
            </form>
            <div className= "profile-list-title">
                Click on a Student For More Information
            </div>
            <div className = "profile-list-container">
                {filterName === '' ? 
                    students.map(student => 
                        <div className="single-profile-container" key={student.StudentID}>
                            <img onClick = {() => history.push(`/dashboard/students/${student.StudentID}`)} className="profile-pic student" src={NoPicLogo}/>
                            <div><NavLink to={"/dashboard/students/" + student.StudentID} exact={true}> {student.Name}</NavLink></div>
                        </div>
                    ) :
                    students.filter(student  => student.Name.toLowerCase().includes(filterName.toLowerCase())).map(student => 
                        <div className="single-profile-container" key={student.StudentID}>
                            <img className="profile-pic student" src={NoPicLogo} onClick={() => history.push(`/dashboard/students/${student.StudentID}`)} />
                            <div><NavLink to={"/dashboard/students/" + student.StudentID} exact={true}> {student.Name}</NavLink></div>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    ) 
}

export default StudentView