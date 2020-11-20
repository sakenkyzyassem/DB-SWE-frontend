import React, { Component } from 'react';
import './SignUp.scss';
import {withRouter} from 'react-router-dom';
import {Col, Form} from "react-bootstrap";


class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email: "",
            password: "",
            success: false,
        }
        this.signUpFunction = this.signUpFunction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    signUpFunction() {
        this.props.history.push({
            pathname: "/createAccount", 
            state: this.state
        });
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
            // this.props.history.push("/");
            this.signUpFunction();
        }

        this.setState({validated: true});
    }

    render() { 
        return ( 
            <div className="signUp">
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
                                <img src={require("../../../static/waveSignUp.svg")} alt="wave"/>
                            </div>
                            <div className="col-9">
                                <h1>Sign Up</h1>
                                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                                    <Form.Group as={Col} controlId="signUpEmailValidation">
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Enter email"
                                            className="inputForm"
                                            onChange={e => this.setState({email: e.target.value})}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="signUpPasswordValidation">
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Enter password"
                                            className="inputForm"
                                            onChange={e => this.setState({password: e.target.value})}
                                        />
                                    </Form.Group>
                                </Form>
                                <button className="signUpBtn" type="button" onClick={this.signUpFunction}>Sign up</button>
                                <p>Already have an account? <a href="/auth/signIn">Sign in</a></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
         );
    }
}
 
export default withRouter(SignUp);