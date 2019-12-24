import React,{Component} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./SessionView.css"
import Session from './Session'


class SessionView extends Component{
    constructor(props){
        super(props)
        this.state = {
            sessions: [],
            startDate: new Date().setHours(0,0,0),
            endDate: new Date(new Date().getTime()+7*24*60*60*1000).setHours(23,59,59),
            filteringDates : true
        }
        
        this.handleCalendarChange = this.handleCalendarChange.bind(this)
        this.allDates = this.allDates.bind(this)
    }
    
    handleCalendarChange(option, date){
        if (option == "startDate") {
            this.setState({
                startDate: date
            })
            if (date > this.state.endDate) {
                this.setState({
                    endDate: date
                })           
            }
        }
        else if (option == "endDate") {
            this.setState({
                endDate: date
            })            
            if (date < this.state.startDate) {
                this.setState({
                    startDate: date,
                })
            }
        }
        this.setState({
            filteringDates : true
        })
    }
    
    allDates(e){
        e.preventDefault()
        this.setState({
            startDate: '',
            endDate: '',
            filteringDates: false
        })
    }
    
    render(){
        let userRole = this.props.userInfo.UserType
        return(
            <div className = "sessionViewContainer">
                <form className = "dateSelectors">
                    <label className="formLabel"> From: </label>
                    <DatePicker id='startDate' selected={this.state.startDate} onChange={date=>this.handleCalendarChange('startDate', date)} required/>
                    <label className="formLabel"> To: </label>
                    <DatePicker id='endDate' selected={this.state.endDate} onChange={date=>this.handleCalendarChange('endDate', date)} required/>
                    <button onClick = {this.allDates}> All Sessions </button>
                </form>
                <div className="sessionView">
                    <div> Sessions: </div>
                    {this.state.filteringDates ? 
                    this.props.sessions.filter(session => 
                        new Date(Date.parse(session.date)) <= new Date(new Date(this.state.endDate).getTime()+24*60*60*1000) &&
                        new Date(Date.parse(session.date)) >= new Date(new Date(this.state.startDate))).map(session => <Session userRole={this.state.userRole} key={session.ID} sessionInfo={session}/>) 
                    :
                    this.props.sessions.map(session => <Session userRole={this.state.userRole} key={session.ID} sessionInfo={session}/>)} 
                </div>
            </div>
            
        )
    }
}

export default SessionView