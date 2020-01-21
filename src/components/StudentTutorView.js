import React, { Component, useState } from 'react'
import './ViewWithTable.css'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const StudentTutorView = () => {
    const products = useSelector(state => state.products)
    const userInfo = useSelector(state => state.userInfo)
    const userRole = userInfo.UserType
    const [filterName, setFilterName] = useState('')

    return (
        <React.Fragment>
            <label> Name: </label>
            <input id='name' type="text" value={filterName} onChange={e => setFilterName(e.target.value)}></input>
            <table>
                <tbody>
                    <tr>
                        <th className="category" >Name</th>
                        <th className="category">Email</th>
                        <th className="category">Phone Number</th>
                        <th className="category">Subject</th>
                    </tr>
                    {userRole === 'Student' ?
                        products.filter(product => product.Tutor.toLowerCase().includes(filterName.toLowerCase())).map(product => <tr key={product.TutorID + '-' + product.Subject}><th><NavLink to={`/dashboard/tutors/${product.TutorID}`}>{product.Tutor}</NavLink></th><th>{product.TutorEmail}</th><th>{product.TutorPhone}</th><th>{product.Subject}</th></tr>)
                        :
                        products.filter(product => product.Student.toLowerCase().includes(filterName.toLowerCase())).map(product => <tr key={product.TutorID + '-' + product.Subject}><th><NavLink to={`/dashboard/students/${product.StudentID}`}>{product.Student}</NavLink></th><th>{product.StudentEmail}</th><th>{product.StudentPhone}</th><th>{product.Subject}</th></tr>)
                    }
                </tbody>
            </table>
        </React.Fragment>
    )
}
export default StudentTutorView