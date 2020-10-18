import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import './CreateAccForm.scss';
import UserContext from "../../../services/userContext";

const form1 = [
    {
        controlId: "firstName",
        label: "First Name",
        control: {
            required: true,
            name: "firstName",
            placeholder: "Enter your first name",
            class: "inputForm2"
        },
        feedback: "This field is required"
    },
    {
        controlId: "lastName",
        label: "Last Name",
        control: {
            required: true,
            name: "lastName",
            placeholder: "Enter your last name",
            class: "inputForm2"
        },
        feedback: "This field is required"
    },
    {
        controlId: "mobileNumber",
        label: "Mobile Phone",
        control: {
            name: "mobile",
            type: "tel",
            maxLength: "11",
            placeholder: "Enter mobile phone number",
            class: "inputForm2",
            required: true,
        },
        feedback: "This field is required"
    },
    {
        controlId: "address",
        label: "Address",
        control: {
            required: true,
            name: "address",
            placeholder: "Enter your address",
            class: "inputForm2"
        },
        feedback: "This field is required"
    },
];

const form2 = [
    {
        controlId: "idNumber",
        label: "ID Number",
        control: {
            name: "documentId",
            placeholder: "Enter identification number",
            class: "inputForm2",
            required: true,
        },
        feedback: "This field is required"
    },
    {
        controlId: "lastName",
        label: "Home Phone",
        control: {
            name: "home",
            type: "tel",
            placeholder: "Enter home phone number",
            required: true,
            class: "inputForm2"
        },
        feedback: "This field is required"
    },
]

class CreateAccForm extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            userInformation: {}
        }

        this.createUser = this.createUser.bind(this);
    }

    handleChange = (event) => {
        const info = {
            ...this.state.userInformation,
            [event.target.name]: event.target.value,
        };
        this.setState({userInformation: info});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({validated: false});
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            //const userContext = this.context;
            //userContext.setUserInfo(this.state.userInformation);
            if( this.props.history.location.state ) {
                let userPrev = this.props.history.location.state;
                const user = {
                    email: userPrev.email,
                    password: userPrev.password,
                    ...this.state.userInformation
                }

                this.createUser(user);
            }
        }

        this.setState({validated: true});

    }

    async createUser(user) {
        console.log(user);
        await fetch(`/api/guests`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then((res) => {
            console.log(res);
            if( res.ok ) {
                this.props.history.push('/createAccountSuccess');
            }
        })
            .catch(err => console.log(err));
    }

    render() { 
        return ( 
            <div className="createAccForm">
                <div className="container">
                    <img src={require('../../../static/LogoWhite.svg')} alt=""></img>
                    <div className="card2">
                        <h1>Create an account</h1>
                        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <div className="col-6">
                                    {
                                        form1.map((input, index) => {
                                            return (
                                                <Form.Row key={index}>
                                                    <Form.Label>{input.label}</Form.Label>
                                                    <Form.Group controlId={input.controlId}>
                                                        <Form.Control
                                                            required={input.control.required}
                                                            name={input.control.name}
                                                            type={input.control.type | "text"}
                                                            placeholder={input.control.placeholder}
                                                            className={input.control.class}
                                                            onChange={this.handleChange}
                                                        ></Form.Control>
                                                        <Form.Control.Feedback type="invalid">{input.feedback}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Row>
                                            );
                                        })
                                    }
                                </div>
                                <div className="col-6">
                                    <Form.Row>
                                        <Form.Label>ID Type</Form.Label>
                                        <Form.Group controlId="documentType">
                                            <Form.Control as="select">
                                                <option value="passport">Passport</option>
                                                <option value="driving_licence">DrivingLicence</option>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    {
                                        form2.map((input, index) => {
                                            return (
                                                <Form.Row key={index}>
                                                    <Form.Label>{input.label}</Form.Label>
                                                    <Form.Group controlId={input.controlId}>
                                                        <Form.Control
                                                            required={input.control.required}
                                                            name={input.control.name}
                                                            type={input.control.type | "text"}
                                                            placeholder={input.control.placeholder}
                                                            className={input.control.class}
                                                            onChange={this.handleChange}
                                                        ></Form.Control>
                                                        <Form.Control.Feedback type="invalid">{input.feedback}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form.Row>
                                            );
                                        })
                                    }
                                </div>
                            </Form.Row>
                            <Form.Row className="container2">
                                <button type="submit" className="signUpBtn">Continue</button>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default withRouter(CreateAccForm);