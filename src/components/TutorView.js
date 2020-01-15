import React,{Component} from 'react'
import './ViewWithTable.css'
import {NavLink} from 'react-router-dom'

class TutorView extends Component{

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
                <label>Tutor Name: </label>
                <input id = 'name' type ="text" onChange={this.handleChange}></input> 
            </form>
            <table>
                <tbody>
                    <tr>
                        <th className="category">Name</th>
                        <th className="category">Email</th>
                        <th className="category">Phone Number</th>
                    </tr>
                    {this.state.filterName === '' ? this.props.tutors.map(tutor=> <tr key = {tutor.TutorID}><th><NavLink to={"/dashboard/tutors/"+tutor.TutorID} exact={true}> {tutor.Name}</NavLink></th><th>{tutor.Email}</th><th>{tutor.Phone}</th></tr>) :
                    this.props.tutors.filter(tutor=>tutor.Name.includes(this.state.filterName)).map(tutor=><tr key = {tutor.TutorID}><th><NavLink to={"/dashboard/tutors/"+tutor.TutorID} exact={true}> {tutor.Name}</NavLink></th><th>{tutor.Email}</th><th>{tutor.Phone}</th></tr>)}
                </tbody>
            </table>
            </React.Fragment>
        )
    }
}

export default TutorView