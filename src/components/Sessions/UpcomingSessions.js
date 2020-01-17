import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import './UpcomingSessions.css'
import Session from './Session'

class UpcomingSessions extends Component {
    _isMounted=false
    constructor(props){
        super(props)
        if (this.props.userInfo) {
            this.state = {
                userRole: props.userInfo.UserType,
                loading: true,
                secondaryRole: null
            }
        } else {  
            this.state = {
                userRole: props.userRole,
                loading: true,
                secondaryRole: props.secondaryRole
            }
        }
    }
    
    componentDidMount(){
        this._isMounted=true;
        if (this._isMounted)
            setTimeout(()=>this.setState({loading: false}), 500)
    }
    
    componentWillUnmount(){
        this._isMounted=false;
    }

    render(){
        let {loading, secondaryRole, userRole} = this.state
        let {sessions, studentID, tutorID} = this.props
        let weekSessions = secondaryRole ?
            sessions.filter(session => new Date(Date.parse(session.date)) <= new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) &&
                new Date(Date.parse(session.date)) >= new Date() && (session.StudentID == studentID || session.TutorID == tutorID))
            :
            sessions.filter(session => new Date(Date.parse(session.date)) <= new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) &&
                new Date(Date.parse(session.date)) >= new Date())

        return (
            <div className="upcoming-sessions-info">
                <div className= "upcoming-sessions-title"> This Week's Sessions: </div>
                {weekSessions == 0 ?
                    loading ? <div> Loading... </div> : <div> No sessions this week, schedule one on the home page! </div> :
                    weekSessions.map(session => <Session userRole={userRole} secondaryRole={secondaryRole} key = {session.ID} sessionInfo={session}/>)
                }
            </div>
        )
    }
}

export default UpcomingSessions


