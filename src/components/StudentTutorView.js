import React,{Component} from 'react'
import './ViewWithTable.css'


class StudentTutorView extends Component{
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
        let {products} = this.props
        let {filterName} = this.state
        return(
            <React.Fragment>
            <form>
                <label>Tutor Name: </label>
                <input id = 'name' type ="text" onChange={this.handleChange}></input> 
            </form>
            <table>
                <tbody>
                    <tr>
                        <th className="category" >Name</th>
                        <th className="category">Email</th>
                        <th className="category">Phone Number</th>
                        <th className="category">Subject</th>
                    </tr>
                    { this.props.studentID ?
                            filterName === '' ?
                                products.map(product=> <tr key = {product.TutorID + '-' + product.Subject}><th><a href={'/tutors/' + product.TutorID}>{product.Tutor}</a></th><th>{product.TutorEmail}</th><th>{product.TutorPhone}</th><th>{product.Subject}</th></tr>) :
                                products.filter(product=>product.Tutor.includes(filterName)).map(product=><tr key = {product.TutorID + '-' + product.Subject}><th><a href={'/tutors/' + product.TutorID}>{product.Tutor}</a></th><th>{product.TutorEmail}</th><th>{product.TutorPhone}</th><th>{product.Subject}</th></tr>)
                            :
                            filterName === '' ?
                                products.map(product=> <tr key = {product.StudentID + '-' + product.Subject}><th><a href={'/students/' + product.StudentID}>{product.Student}</a></th><th>{product.StudentEmail}</th><th>{product.StudentPhone}</th><th>{product.Subject}</th></tr>) :
                                products.filter(product=>product.Student.includes(filterName)).map(product=><tr key = {product.TutorID + '-' + product.Subject}><th><a href={'/students/' + product.StudentID}>{product.Student}</a></th><th>{product.StudentEmail}</th><th>{product.StudentPhone}</th><th>{product.Subject}</th></tr>)
                    }
                </tbody>
            </table>
            </React.Fragment>
        )
    }
}

export default StudentTutorView