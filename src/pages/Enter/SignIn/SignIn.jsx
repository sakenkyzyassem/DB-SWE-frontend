import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './SignIn.scss';
import UserContext from '../../../services/userContext';
import {Col, Form} from "react-bootstrap";
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
        e.preventDefault();
        const guest = {
            email: this.state.email,
            password: this.state.password
        }
        if( this.props.role === 'employee' ) {
            signInEmployee(guest)
                .then(res => {
                    console.log(res);
                    const userContext = this.context;
                    userContext.setUserLoggedIn(res);

                    if( res.role === 'DESKCLERK' ){
                        this.props.history.push('/deskClerk/main')
                    }
                    else {
                        this.props.history.push("/manager/main");
                    }
                })
        }
        else {
            signInGuest(guest)
                .then(res => {
                    console.log(res);
                    const userContext = this.context;
                    userContext.setUserLoggedIn(res);
                    this.props.history.push("/");
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
                                <p>Don't have an account? <Link to="/auth/signUp">Sign up</Link></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{height: "100px"}}></div>
                </div>
            </div>
            </UserContext.Provider>
         );
    }
}
 
export default withRouter(SignIn);