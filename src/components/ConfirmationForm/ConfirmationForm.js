import React, {Component} from 'react'
import './ConfirmationForm.css'
import {Form, Button} from 'react-bootstrap'
import {Auth} from 'aws-amplify'

class ConfirmationForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            confirmationCode : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(e) {
        let {id, value} = e.target
        this.setState({
            [id]: value
        })
    }

    handleSubmit(e){
        let {email, confirmationCode} = this.state
        console.log(email)
        e.preventDefault()
        Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            window.location.href = "/sign_in"
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        let {confirmationCode} = this.state
        let {email} = this.props
        return (
            <div className = "confirmationFormContainer">
                <div className = "confirmationFormSection">
                    <div className = "confirmFormTitle">Confirm Sign Up</div>
                    <Form.Text className="text-muted">
                        Please check your email for a confirmation code.
                    </Form.Text>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" value={email} onChange={this.handleChange}/>
                            <Form.Text className="text-muted confirm-info">
                            If this is not your email address, please sign up again or contact an administrator.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="confirmationCode">
                            <Form.Label>Confirmation Code</Form.Label>
                            <Form.Control required type="number" placeholder="Code" value = {confirmationCode} onChange = {this.handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div> Don't have a confirmation code? <a href="/" onClick={this.props.exit}>Click here</a></div>
            </div>
        )
    }

}
export default ConfirmationForm