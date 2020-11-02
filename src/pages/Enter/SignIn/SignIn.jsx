import React, { Component, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import './SignIn.scss';
import UserContext from '../../../services/userContext';
import {Col, Form} from "react-bootstrap";
import {signInGuest} from '../../../services/enteringService';

export const SignInContext = React.createContext({
    tokenValue: null,
});

class SignIn extends Component {
    // static contextType = UserContext;
    constructor(props) {
        super(props);
        const [tokenValue] = useState('');
        let loggedIn = true;
        this.state = {
            validated: false,
            email: "",
            password: "",
            loggedIn,
            token: ""
        }
        this.loginUser = this.loginUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async loginUser(e) {
        const guest = {
            email: this.state.email,
            password: this.state.password,
            token: this.state.token
        }
        signInGuest(guest).then((res) => {
            console.log(res);
            this.setState({token: res.token});
            console.log(this.state.token);
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
        }

        this.setState({validated: true});
    }

    render() { 
        // if(this.state.loggedIn===true){
        //     return <Redirect to="/"></Redirect>
        // }
        return ( 
            <SignInContext.Provider value={{tokenValue}}>
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
                                <h1 className="signin">Sign In</h1>
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
                                    <button className="signInBtn" type="submit" onClick={this.loginUser}>Sign in</button>
                                </Form>
                                <p>Don't have an account? <a href="/signUp">Sign up</a></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>       
            </SignInContext.Provider>
         );
    }
}
 
export default withRouter(SignIn);