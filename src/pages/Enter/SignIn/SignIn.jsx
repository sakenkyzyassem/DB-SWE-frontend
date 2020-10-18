import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SignIn.scss';
import UserContext from '../../../services/userContext';
import {Col, Form} from "react-bootstrap";

class SignIn extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            userInformation: {},
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event, title) => {
        const user = {
            ...this.state.userInformation,
            [title]: event.target.value
        }
        this.setState({userInformation: user});
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
            const userContext = this.context;
            userContext.setUserLoggedIn();
            this.props.history.push("/");
        }

        this.setState({validated: true});
    }

    render() { 
        return ( 
            <UserContext.Consumer>
                {user => 
            <div className="signIn">
                <div className="container">
                <img src={require('../../../static/LogoWhite.svg')} alt=""></img>
                <div className="card-form">
                    <div className="row">
                        <div className="col-6">
                            <img className="imgSignUp" src={require('../../../static/signUpImg2.jpg')} alt="LobbyBoy"/>
                        </div>
                        <div className="col-6">
                            <div className="row">
                            <div className="col-3">
                                <img src={require("../../../static/waveSignIn.svg")} alt="wave"/>
                            </div>
                            <div className="col-9">
                                <h1>Sign In</h1>
                                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                                    <Form.Group as={Col} controlId="signUpEmailValidation">
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Enter email"
                                            className="inputForm"
                                            onChange={(value) => this.handleChange(value, "email")}
                                        />
                                        <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="signUpPasswordValidation">
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Enter password"
                                            className="inputForm"
                                            onChange={(value) => this.handleChange(value, "password")}
                                        />
                                        <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                                    </Form.Group>
                                    <button className="signUpBtn" type="submit">Sign In</button>
                                </Form>
                                <p>Don't have an account? <a href="/signUp">Sign up</a></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            }       
            </UserContext.Consumer>
         );
    }
}
 
export default withRouter(SignIn);