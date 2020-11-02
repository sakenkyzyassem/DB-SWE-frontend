import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SignIn.scss';
import UserContext from '../../../services/userContext';
import {Col, Form} from "react-bootstrap";
import {signInGuest} from "../../../services/enteringService";
import Logout from "../Logout/LogOut";

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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    async signIn(e){
        const guest = {
            email: this.state.email,
            password: this.state.password
        }
        signInGuest(guest)
            .then(res => {
                console.log(res);
                this.setState({token: res.token});
                const userContext = this.context;
                userContext.setUserLoggedIn(res);
                this.props.history.push("/");
            })
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
            this.props.history.push({
                pathname: "/", 
                state: this.state
            });
        }

        this.setState({validated: true});
    }

    componentDidMount(){
        this.context.setUserLoggedIn(this.state.token);
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
                                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
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
                                <p>Don't have an account? <a href="/signUp">Sign up</a></p>
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