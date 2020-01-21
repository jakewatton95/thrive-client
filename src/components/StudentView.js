import React,{Component, useState} from 'react'
import './ViewWithTable.css'
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'

const StudentView = () => {
    const [filterName, setFilterName] = useState('')
    const students = useSelector(state => state.students)

    return (
        <React.Fragment>
        <form>
            <label>Student Name: </label>
            <input id = 'name' value = {filterName} type ="text" onChange={e => setFilterName(e.target.value)}></input> 
        </form>
        <table>
            <tbody>
                <tr key="categories">
                    <th className="category" >Name</th>
                    <th className="category">Email</th>
                    <th className="category">Phone Number</th>
                </tr>
                {filterName === '' ? students.map(student=> <tr key={student.StudentID}><th><NavLink to={"/dashboard/students/"+student.StudentID} exact={true}> {student.Name}</NavLink></th><th>{student.Email}</th><th>{student.Phone}</th></tr>) :
                students.filter(student=>student.Name.toLowerCase().includes(filterName.toLowerCase())).map(student=><tr key={student.StudentID}><th><NavLink to={"/dashboard/students/"+student.StudentID} exact={true}> {student.Name}</NavLink></th><th>{student.Email}</th><th>{student.Phone}</th></tr>)}
            </tbody>
        </table>
        </React.Fragment>
    ) 
}

export default StudentView