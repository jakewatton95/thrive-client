import React,{Component} from 'react'
import './ViewWithTable.css'
import {NavLink} from 'react-router-dom'

class StudentView extends Component{
    constructor(props){
        super(props)
        this.state = {
            filterName: ''
        }
        this.handleChange=this.handleChange.bind(this)
    }
    
    handleChange(e){
        let {id, value} = e.target
        if (id === "name"){
            this.setState({
                filterName: value
            })
        }
    }

    
    render(){
        return(
            <React.Fragment>
            <form>
                <label>Student Name: </label>
                <input id = 'name' type ="text" onChange={this.handleChange}></input> 
            </form>
            <table>
                <tbody>
                    <tr key="categories">
                        <th className="category" >Name</th>
                        <th className="category">Email</th>
                        <th className="category">Phone Number</th>
                    </tr>
                    {this.state.filterName === '' ? this.props.students.map(student=> <tr key={student.StudentID}><th><NavLink to={"/dashboard/students/"+student.StudentID} exact={true}> {student.Name}</NavLink></th><th>{student.Email}</th><th>{student.Phone}</th></tr>) :
                    this.props.students.filter(student=>student.Name.includes(this.state.filterName)).map(student=><tr key={student.StudentID}><th><NavLink to={"/dashboard/students/"+student.StudentID} exact={true}> {student.Name}</NavLink></th><th>{student.Email}</th><th>{student.Phone}</th></tr>)}
                </tbody>
            </table>
            </React.Fragment>
        )
    }
}

export default StudentView