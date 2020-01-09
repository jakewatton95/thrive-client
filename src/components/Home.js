import React, {useState} from 'react'
import {Auth} from 'aws-amplify'
import {NavLink, useHistory} from 'react-router-dom'
import AddProduct from './AddProduct'
import UpcomingSessions from './UpcomingSessions'
import ScheduleSession from './ScheduleSession'
import './Home.css'

const Home = (props) => {
    let history = useHistory()
    let [userInfo, setUserInfo] = useState({})
    Auth.currentAuthenticatedUser()
    .then(() => setUserInfo(props.location.state.userInfo))
    .catch(err => {
        history.push("/sign_in")
    })

    const signOut = () =>
    {
        Auth.signOut()
        .then(history.push("/sign_in"))
    }

    return (
        //If user is Admin, render AdminContainer with its new Router
        //If user is Student ... StudentContainer
        //If user is Tutor ... TutorContainer (Tutor Home)
        <div>
            <button onClick ={signOut}>Sign Out</button>
            {userInfo && <div> You are a {userInfo.UserType}</div>}
        </div>
    )
}

/*
class Home extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            
        }
    }
    
    render(){
        console.log(this.props)
        return (
            <div>
                Hi
                <div>{this.props.location.state.proppy}</div>
            </div>
        )
        let {students, tutors, products} = this.props
        let {UserType} = this.props.userInfo
        let modules;
        if (UserType === "Student"){
            modules=
            <React.Fragment>
                <ScheduleSession studentID = {this.props.studentID} products={this.props.products} userInfo={this.props.userInfo}/>
                <UpcomingSessions studentID = {this.props.studentID} sessions = {this.props.sessions} userInfo={this.props.userInfo}/>
            </React.Fragment>
        } else if (UserType === "Tutor") {
            modules=
            <React.Fragment>
                <ScheduleSession tutorID = {this.props.tutorID} products={this.props.products} userInfo={this.props.userInfo}/>
                <UpcomingSessions tutorID = {this.props.tutorID} sessions = {this.props.sessions} userInfo={this.props.userInfo}/>
            </React.Fragment>
        } else {
            modules=
            <React.Fragment>
                <ScheduleSession userInfo={this.props.userInfo} products={this.props.products}/>
                <UpcomingSessions userInfo={this.props.userInfo} sessions = {this.props.sessions}/>
            </React.Fragment>
        }
        return (
            <div className = "main">
                <h2>Welcome back, {this.props.userInfo.Name}!</h2>
                <div className="modules-container">
                    {UserType === "Admin" ? <AddProduct tutors={tutors} students={students} /> : null}
                    {modules}
                </div>
            </div>
        )
    }
}*/
    
export default Home