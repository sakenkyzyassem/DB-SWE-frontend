import React, { Component } from 'react';
import './SignUp.scss';
import {withRouter} from 'react-router-dom';

const required = value => {
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">
                Empty field is not allowed!
            </div>
        );
    }
};


class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email: "",
            password: "",
        }
        this.signUpFunction = this.signUpFunction.bind(this);
        
    }

    signUpFunction() {
        this.props.history.push({
            pathname: "/createAccount", 
            state: this.state
        });
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
                                <input type="email" placeholder="Enter email" className="inputForm" onChange={e => this.setState({email: e.target.value})}></input>
                                <input type="password" placeholder="Enter password" className="inputForm" onChange={e => this.setState({password: e.target.value})}></input>
                                <br></br>
                                <button className="signUpBtn" type="button" onClick={this.signUpFunction}>Sign up</button>
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