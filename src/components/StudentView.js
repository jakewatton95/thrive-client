import React,{useState, useEffect} from 'react'
//import './ViewWithTable.css'
import {NavLink, useHistory} from 'react-router-dom'
import './UserView.less'
import NoPicLogo from '../media/user-profile-no-pic-orange.png'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {getUserInfo, getStudentList} from '../helpers'
import {students as studentQuery} from '../graphql/queries'

const StudentView = () => {

    const {currentUserInfo} = getUserInfo()
    const {data: studentData, loading, errors: studentErrors} = getStudentList(currentUserInfo)()


    // const generateStudentList = () => {
    //     //student - {StudentID: ID, Name: String, Email: String, Phone: Int, Subjects: [String]}
    //     let studentList = []
    //     // useSelector(state => state.products).map(product => {
    //     //         const arrObj = studentList.find(student => student.StudentID == product.StudentID)
    //     //         let newObj = {StudentID: product.StudentID, Name: product.Student, Email: product.StudentEmail, Phone: product.StudentPhone, Subject: [product.Subject]}
    //     //         if (arrObj) {
    //     //             studentList = studentList.map(student => student.StudentID == product.StudentID ? {...student, Subject: [...student.Subject, product.Subject]} : student)
    //     //         } else {
    //     //             studentList.push(newObj)
    //     //         }
    //     //     }
    //     // )
    //     return studentList
    // }

    const [filterName, setFilterName] = useState('')
    const students = (studentData && studentData.studentsByCompany)
    const history = useHistory();
    if (loading) return <div> loading...</div>
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
                        <div className="single-profile-container" key={student.id}>
                            <img onClick = {() => history.push(`/dashboard/students/${student.id}`)} className="profile-pic student" src={NoPicLogo}/>
                            <div><NavLink to={"/dashboard/students/" + student.id} exact={true}> {student.name}</NavLink></div>
                        </div>
                    ) :
                    students.filter(student  => student.name.toLowerCase().includes(filterName.toLowerCase())).map(student => 
                        <div className="single-profile-container" key={student.id}>
                            <img className="profile-pic student" src={NoPicLogo} onClick={() => history.push(`/dashboard/students/${student.id}`)} />
                            <div><NavLink to={"/dashboard/students/" + student.id} exact={true}> {student.name}</NavLink></div>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    ) 
}

export default StudentView