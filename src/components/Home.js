import React, {Component} from 'react'
import AddProduct from './AddProduct'
import UpcomingSessions from './UpcomingSessions'
import ScheduleSession from './ScheduleSession'

class Home extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            
        }
    }
    
    render(){
        let {students, tutors, products} = this.props
        let {UserType} = this.props.userInfo
        let modules;
        if (UserType === "Student"){
            modules=
            <div>
                <ScheduleSession studentID = {this.props.studentID} products={this.props.products} userInfo={this.props.userInfo}/>
                <UpcomingSessions studentID = {this.props.studentID} sessions = {this.props.sessions} userInfo={this.props.userInfo}/>
            </div>
        } else if (UserType === "Tutor") {
            modules=
            <div>
                <ScheduleSession tutorID = {this.props.tutorID} products={this.props.products} userInfo={this.props.userInfo}/>
                <UpcomingSessions tutorID = {this.props.tutorID} sessions = {this.props.sessions} userInfo={this.props.userInfo}/>
            </div>
        } else {
            modules=
            <div>
                <ScheduleSession userInfo={this.props.userInfo} products={this.props.products}/>
                <UpcomingSessions userInfo={this.props.userInfo} sessions = {this.props.sessions}/>
            </div>
        }
        return (
            <div className = "main">
                <h2>Welcome back, {this.props.userInfo.Name}!</h2>
                {UserType === "Admin" ? <AddProduct tutors={tutors} students={students}/> : null}
                {modules}
            </div>
        )
    }
}
    
export default Home