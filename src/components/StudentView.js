import React, {useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import './UserView.less'
import NoPicLogo from '../media/user-profile-no-pic-orange.png'
import {getUserInfo, getStudentList} from '../helpers'

const StudentView = () => {

    const {currentUserInfo} = getUserInfo()
    const {role} = currentUserInfo
    const {data: studentData, loading, errors: studentErrors} = getStudentList(currentUserInfo)()

    const [filterName, setFilterName] = useState('')
    const students = role == "Admin" ? (studentData && studentData.studentsByCompany) :
                            role == "Tutor" ? (studentData && studentData.productsByTutor.map(product => product.student)) : []
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