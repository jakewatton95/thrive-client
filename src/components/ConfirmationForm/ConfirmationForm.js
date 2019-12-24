import React, {Component} from 'react'
import './ConfirmationForm.css'
import {Form, Button} from 'react-bootstrap'
import {Auth} from 'aws-amplify'

class ConfirmationForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            confirmationCode : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(e) {
        let {id, value} = e.target
        if (id === 'confirmationCode') {
          this.setState({
              confirmationCode: value
          })
        }
    }

    handleSubmit(e){
        let {email} = this.props
        let {confirmationCode} = this.state
        e.preventDefault()
        Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            alert("Success! You're account is confirmed. You will now be redirected to the login page or the home page.")
            this.props.handleSignup()
        })
        .catch(err => {
            console.log(err)
            alert(err.message)
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
                        <Form.Group controlId="formConfirmationEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control disabled type="email" value={email} />
                            <Form.Text className="text-muted">
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
            </div>
        )
    }

}
export default ConfirmationForm