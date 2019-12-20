import React, {Component} from 'react'
import AdminNav from '../components/Nav/AdminNav.js'

class AdminContainer extends Component{
    _isMounted=false
    constructor (props){
        super(props)
        
        this.state = {
            students: [],
            tutors: [],
            billings: [],
            sessions: [],
            payments: [],
            products: []
        }
    }
    
    componentDidMount(){
        this._isMounted=true
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/students')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    students: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/sessions')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    sessions: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/payments')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    payments: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/products')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    products: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/tutors')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    tutors: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
        
        fetch('https://y9ynb3h6ik.execute-api.us-east-1.amazonaws.com/prodAPI/billing')
        .then(response => response.json())
        .then(response => {
            if (this._isMounted) {
                this.setState({
                    billings: response
                })
            }
        })
        .catch(err => console.log("Err" + err))
    }
    
    componentWillUnmount(){
        this._isMounted=false
    }
    
    render(){
        return <AdminNav signOut={this.props.signOut} 
                         userInfo = {this.props.userInfo} 
                         billings={this.state.billings} 
                         sessions = {this.state.sessions} 
                         payments = {this.state.payments} 
                         tutors={this.state.tutors} 
                         students={this.state.students}
                         products = {this.state.products}/>
    }
}

export default AdminContainer