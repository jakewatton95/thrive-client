import React, { useState } from 'react'
import './ViewWithTable.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TutorView = () => {
    const [filterName, setFilterName] = useState('')
    const tutors = useSelector(state => state.tutors)

    return (
        <React.Fragment>
            <form>
                <label>Tutor Name: </label>
                <input id='name' type="text" value={filterName} onChange={e => setFilterName(e.target.value)}></input>
            </form>
            <table>
                <tbody>
                    <tr>
                        <th className="category">Name</th>
                        <th className="category">Email</th>
                        <th className="category">Phone Number</th>
                    </tr>
                    {filterName === '' ? tutors.map(tutor => <tr key={tutor.TutorID}><th><NavLink to={"/dashboard/tutors/" + tutor.TutorID} exact={true}> {tutor.Name}</NavLink></th><th>{tutor.Email}</th><th>{tutor.Phone}</th></tr>) :
                        tutors.filter(tutor => tutor.Name.toLowerCase().includes(filterName.toLowerCase())).map(tutor => <tr key={tutor.TutorID}><th><NavLink to={"/dashboard/tutors/" + tutor.TutorID} exact={true}> {tutor.Name}</NavLink></th><th>{tutor.Email}</th><th>{tutor.Phone}</th></tr>)}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default TutorView