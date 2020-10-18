import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UserContext from "../../../services/userContext";
import './SignUp.scss';

class SignUp extends React.Component{
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            userInformation: {
                email: null,
                password: null
            },
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
            this.props.history.push("/createAccount", this.state.userInformation);
        }

        this.setState({validated: true});
    }

    render() {
        return (
            <div className="signUp">
                <div className="container">
                    <img src={require('../../../static/LogoWhite.svg')} alt=""></img>
                    <div className="card">
                        <div className="row">
                            <div className="col-6">
                                <img className="imgSignUp" src={require('../../../static/signUpImg2.jpg')}
                                     alt="LobbyBoy"/>
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
                                            <button className="signUpBtn" type="submit">Sign up</button>
                                        </Form>
                                        <p>Already have an account? <a href="/signIn">Sign in</a></p>
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