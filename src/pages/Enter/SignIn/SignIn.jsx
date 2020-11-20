import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './SignIn.scss';
import UserContext from '../../../services/userContext';
import {Alert, Col, Form} from "react-bootstrap";
import {signInEmployee, signInGuest} from "../../../services/enteringService";

class SignIn extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            email: "",
            password: "",
            token: ""
        }
        this.signIn = this.signIn.bind(this);
    }

    async signIn(e){
        this.setState({validated: false});
        e.preventDefault();
        const guest = {
            email: this.state.email,
            password: this.state.password
        }
        if( this.props.role && this.props.role === 'employee' ) {
            signInEmployee(guest)
                .then(res => {
                    console.log(res);
                    if( (res.role !== "MANAGER" && res.role !== "DESKCLERK") && res.status !== 200 ) {
                        this.setState({validated: true});
                    }
                    else {
                        const userContext = this.context;
                        userContext.setUserLoggedIn(res);
                        this.props.history.push("/");
                    }
                })

        }
        else {
            signInGuest(guest)
                .then(res => {
                    console.log("Res: ");
                    console.log(res);
                    if( res.role !== "GUEST" && res.status !== 200 ) {
                        this.setState({validated: true});
                    }
                    else {
                        const userContext = this.context;
                        userContext.setUserLoggedIn(res);
                        this.props.history.push("/");
                    }
                });
        }
    }

    render() { 
        return ( 
            <UserContext.Provider value={this.state}>
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
                                <h1 className="signinh1">Sign In</h1>
                                <Alert
                                    className="signIn-alert"
                                    show={this.state.validated}
                                    variant="danger"
                                >
                                    Please, check if your email or password is correct.
                                </Alert>
                                <Form noValidate validated={this.state.validated} onSubmit={this.signIn}>
                                    <Form.Group as={Col} controlId="signUpEmailValidation">
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Enter email"
                                            className="inputFormsignin"
                                            onChange={e => this.setState({email: e.target.value})}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="signUpPasswordValidation">
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Enter password"
                                            className="inputFormsignin"
                                            onChange={e => this.setState({password: e.target.value})}
                                        />
                                    </Form.Group>
                                    <button className="signUpBtn" type="submit" onClick={this.signIn}>Sign In</button>
                                </Form>
                                {
                                    this.props.role === "employee"
                                        ? <p>Please, sign in using your work account</p>
                                        : <p>Don't have an account?<Link to="/auth/signUp">Sign up</Link></p>
                                }
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </UserContext.Provider>
         );
    }
}
 
export default withRouter(SignIn);