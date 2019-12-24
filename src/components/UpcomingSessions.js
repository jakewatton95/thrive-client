import React, {Component} from 'react'
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
        let weekSessions = this.state.secondaryRole ? 
            this.props.sessions.filter(session => new Date(Date.parse(session.date)) <= new Date(new Date().getTime()+7*24*60*60*1000) &&
                        new Date(Date.parse(session.date)) >= new Date() && (session.StudentID == this.props.studentID || session.TutorID == this.props.tutorID))
        
        : this.props.sessions.filter(session => new Date(Date.parse(session.date)) <= new Date(new Date().getTime()+7*24*60*60*1000) &&
                        new Date(Date.parse(session.date)) >= new Date())

        return (
            <React.Fragment>
            <div className="upcomingSessionsInfo">
                <h2> This Week's Sessions: </h2>
                {weekSessions == 0 ?
                    this.state.loading == true ? <div> Loading... </div> : <div> No sessions this week, schedule one on the home page! </div> :
                    weekSessions.map(session => <Session userRole={this.state.userRole} secondaryRole={this.state.secondaryRole} key = {session.ID} sessionInfo={session}/>)
                }
            </div>
            </React.Fragment>
        )
    }
}

export default UpcomingSessions


