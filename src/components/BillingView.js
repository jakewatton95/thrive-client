import React, {Component} from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import BillingEntry from "./BillingEntry"


class BillingView extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            startDate: new Date().setHours(0,0,0),
            endDate: new Date(new Date().getTime()+7*24*60*60*1000).setHours(23,59,59),            
            filteringDates: true
        }
        
        this.allDates = this.allDates.bind(this)
        this.handleCalendarChange=this.handleCalendarChange.bind(this)
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
            filteringDates: false,
            startDate: '',
            endDate: ''
        })
    }
    
    render(){
        let {userRole} = this.props.userInfo.UserType
        /*let totalCost = this.state.filteringDates ? 
                    this.state.billings.filter(session => 
                        new Date(Date.parse(session.date)) <= new Date(new Date(this.state.endDate).getTime()+24*60*60*1000) &&
                        new Date(Date.parse(session.date)) >= new Date(new Date(this.state.startDate))).reduce((total, billing)=> total+=billing.10, 0) : 1
        */
        return (
            <React.Fragment>
            <form className = "dateSelectors" onSubmit={this.updateSessionDates}>
                    <label> From: </label>
                    <DatePicker id='startDate' selected={this.state.startDate} onChange={date=>this.handleCalendarChange('startDate', date)} required/>
                    <label> To: </label>
                    <DatePicker id='endDate' selected={this.state.endDate} onChange={date=>this.handleCalendarChange('endDate', date)} required/>
                    <button onClick = {this.allDates}> All Sessions </button>
                </form>

            <div className = "main">
                {this.state.filteringDates ? 
                    this.props.billings.filter(session => 
                        new Date(Date.parse(session.date)) <= new Date(new Date(this.state.endDate).getTime()+24*60*60*1000) &&
                        new Date(Date.parse(session.date)) >= new Date(new Date(this.state.startDate))).map(billing => <BillingEntry userRole={this.state.userRole} key={billing.SessionID} billingInfo={billing}/>) 
                    :
                    this.props.billings.map(billing => <BillingEntry userRole = {this.state.userRole} key={billing.SessionID} billingInfo={billing}/>)} 
            </div>
            </React.Fragment>
        )
    }
}
    
export default BillingView